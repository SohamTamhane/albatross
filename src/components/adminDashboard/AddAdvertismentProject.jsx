import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";

const AddAdvertisementProject = () => {
  const [projects, setProjects] = useState([
    {
      title: "",
      tags: "",
      desc: "",
      youtubeUrl: "",
      thumbnail: null,
      thumbnailUrl: "",
      sections: [],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleThumbnailChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `${import.meta.env.VITE_CLOUDINARY_FOLDER}_advertisement`);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      const updated = [...projects];
      updated[index].thumbnail = file;
      updated[index].thumbnailUrl = data.secure_url;
      setProjects(updated);

      toast.success("Thumbnail uploaded successfully!");
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Failed to upload thumbnail.");
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (const project of projects) {
        const { title, tags, desc, youtubeUrl, thumbnailUrl } = project;

        if (!title || !tags || !desc || !youtubeUrl || !thumbnailUrl) {
          toast.error("All fields including thumbnail are required.");
          setLoading(false);
          return;
        }

        await addDoc(collection(db, "projects"), {
          title,
          category: "Advertisement",
          tags,
          description: desc,
          videoUrl: youtubeUrl,
          imageUrls: [thumbnailUrl],
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Projects submitted successfully!");
      setProjects([
        {
          title: "",
          tags: "",
          desc: "",
          youtubeUrl: "",
          thumbnail: null,
          thumbnailUrl: "",
          sections: [],
        },
      ]);
    } catch (err) {
      console.error(err);
      toast.error("Error submitting project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h2 className="text-3xl font-bold mb-4 ml-4 font-aktiv">Add Advertisement Projects</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#222] p-6 rounded w-full max-w-xl relative">
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setProjects(projects.filter((_, i) => i !== index))
                  }
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                >
                  ✕
                </button>
              )}

              <label className="block mb-2">Project Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#2a2a2a] border rounded mb-4"
                value={project.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />

              <label className="block mb-2">Category</label>
              <input
                type="text"
                value="Advertisement"
                disabled
                className="w-full px-3 py-2 bg-[#2a2a2a] border rounded mb-4 text-gray-400 cursor-not-allowed"
              />

              <label className="block mb-2">Tags</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#2a2a2a] border rounded mb-4"
                value={project.tags}
                onChange={(e) => handleChange(index, "tags", e.target.value)}
              />

              <label className="block mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 bg-[#2a2a2a] border rounded mb-4"
                value={project.desc}
                onChange={(e) => handleChange(index, "desc", e.target.value)}
              />

              <label className="block mb-2">Main YouTube Video URL</label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=video_id"
                className="mb-4 w-full px-3 py-2 bg-[#2a2a2a] border rounded"
                value={project.youtubeUrl}
                onChange={(e) => handleChange(index, "youtubeUrl", e.target.value)}
              />

              {project.youtubeUrl && getYouTubeEmbedUrl(project.youtubeUrl) && (
                <div className="mt-2 mb-6">
                  <label className="block mb-2">Preview</label>
                  <iframe
                    width="100%"
                    height="220"
                    src={getYouTubeEmbedUrl(project.youtubeUrl)}
                    title="YouTube video preview"
                    allowFullScreen
                    className="rounded"
                  ></iframe>
                </div>
              )}

              <label className="block mb-2">Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailChange(e, index)}
                className="mb-4 w-full px-3 py-2 bg-[#2a2a2a] border rounded"
              />

              {project.thumbnailUrl && (
                <img
                  src={project.thumbnailUrl}
                  alt="Thumbnail Preview"
                  className="w-full max-w-xs rounded mb-4"
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setProjects([
                ...projects,
                {
                  title: "",
                  tags: "",
                  desc: "",
                  youtubeUrl: "",
                  thumbnail: null,
                  thumbnailUrl: "",
                  sections: [],
                },
              ])
            }
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            + Add Another Project
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 my-4 rounded block text-white"
          >
            {loading ? "Submitting..." : "Submit Projects"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdvertisementProject;
