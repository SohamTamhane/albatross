import { useState } from "react";
import { db } from "../../firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";

const AddSocialMediaProject = () => {
  const [projects, setProjects] = useState([
    { title: "", tags: "", desc: "", images: [], sections: [] },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleImageChange = (index, files) => {
    const updatedProjects = [...projects];
    updatedProjects[index].images = Array.from(files);
    setProjects(updatedProjects);
  };

  const handleSectionChange = (projIndex, secIndex, field, value) => {
    const updated = [...projects];
    updated[projIndex].sections[secIndex][field] = value;
    setProjects(updated);
  };

  const handleSectionImagesChange = (projIndex, secIndex, files) => {
    const updated = [...projects];
    updated[projIndex].sections[secIndex].images = Array.from(files);
    setProjects(updated);
  };

  const addSection = (projIndex) => {
    const updated = [...projects];
    updated[projIndex].sections.push({ description: "", images: [] });
    setProjects(updated);
  };

  const removeSection = (projIndex, secIndex) => {
    const updated = [...projects];
    updated[projIndex].sections.splice(secIndex, 1);
    setProjects(updated);
  };

  const addProjectField = () => {
    setProjects([...projects, { title: "", tags: "", desc: "", images: [], sections: [] }]);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (const project of projects) {
        const { title, tags, desc, images, sections } = project;
        if (!title || !tags || !desc || images.length === 0) {
          toast.error("All fields are required in every project.");
          setLoading(false);
          return;
        }

        // Upload main project images
        const imageUrls = [];
        for (const file of images) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
          formData.append("folder", `${import.meta.env.VITE_CLOUDINARY_FOLDER}_socialmedia`);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await res.json();
          imageUrls.push(data.secure_url);
        }

        // Upload section images
        const uploadedSections = [];

        for (const sec of sections) {
          if (!sec.description && (!sec.images || sec.images.length === 0)) continue;

          if (!sec.description || !sec.images || sec.images.length === 0) {
            toast.error("Each section must have both images and description.");
            setLoading(false);
            return;
          }

          const sectionImageUrls = [];

          for (const file of sec.images) {
            const secFormData = new FormData();
            secFormData.append("file", file);
            secFormData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            secFormData.append("folder", `${import.meta.env.VITE_CLOUDINARY_FOLDER}_socialmedia`);

            const secImageRes = await fetch(
              `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
              {
                method: "POST",
                body: secFormData,
              }
            );

            const secImageData = await secImageRes.json();
            sectionImageUrls.push(secImageData.secure_url);
          }

          uploadedSections.push({
            description: sec.description,
            imageUrls: sectionImageUrls,
          });
        }

        await addDoc(collection(db, "projects"), {
          title,
          category: "Social Media",
          tags,
          description: desc,
          imageUrls,
          sections: uploadedSections,
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Social Media projects submitted successfully!");
      setProjects([{ title: "", tags: "", desc: "", images: [], sections: [] }]);
    } catch (error) {
      console.error(error);
      toast.error("Error submitting projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h2 className="text-3xl font-bold mb-4 ml-4 font-montserrat">Add Social Media Projects</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#222] p-6 rounded w-full max-w-xl relative">
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
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
                value="Social Media"
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

              <label className="block mb-2">Project Images (Multiple)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="mb-4 w-[60%] p-1 rounded border border-white"
                onChange={(e) => handleImageChange(index, e.target.files)}
              />

              <div className="flex gap-3 flex-wrap mt-2">
                {project.images?.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${i}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>

              <h4 className="text-lg mt-4 mb-2 font-semibold">Additional Sections (Optional)</h4>
              {project.sections.map((sec, secIndex) => (
                <div key={secIndex} className="mb-4 border border-gray-700 p-3 rounded relative">
                  <button
                    type="button"
                    onClick={() => removeSection(index, secIndex)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                  >
                    ✕
                  </button>

                  <label className="block mb-1">Section Description</label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border rounded mb-2"
                    value={sec.description}
                    onChange={(e) =>
                      handleSectionChange(index, secIndex, "description", e.target.value)
                    }
                  />

                  <label className="block mb-1">Section Images (Multiple)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="mb-2 w-full p-1 rounded border border-white"
                    onChange={(e) =>
                      handleSectionImagesChange(index, secIndex, e.target.files)
                    }
                  />

                  <div className="flex gap-2 flex-wrap mt-2">
                    {sec.images?.map((img, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(img)}
                        alt={`section-img-${i}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addSection(index)}
                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 text-sm rounded text-white"
              >
                + Add Section
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addProjectField}
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

export default AddSocialMediaProject;
