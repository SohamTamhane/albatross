import { useState } from "react";
import { db, storage } from "../../firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Sidebar from "../../components/Sidebar"; 

const AddSocialMediaProject = () => {
    const [projects, setProjects] = useState([
    { title: "", tags: "", desc: "", image: null }
  ]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const addProjectField = () => {
    setProjects([...projects, { title: "", tags: "", desc: "", image: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess("");

    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `projects/socialMedia/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "projects"), {
        title,
        category: "Social Media",
        tags: tags.split(",").map(tag => tag.trim()),
        description,
        image: imageUrl,
        createdAt: Timestamp.now(),
      });

      setTitle("");
      setTags("");
      setDescription("");
      setImage(null);
      setSuccess("Project added successfully!");
    } catch (err) {
      console.error("Error adding project:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex bg-[#1a1a1a] h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h2 className="text-2xl font-semibold mb-6 font-montserrat">Add Social Media Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-[#222] p-6 rounded w-full max-w-xl ">
          <div>
            <label className="block mb-1 font-medium">Project Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              value="Social Media"
              readOnly
              className="w-full px-3 py-2 border rounded bg-[#2a2a2a] text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Tags</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded text-white"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded text-white"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="mb-4 w-[60%] p-1 rounded border border-white"
            />
          </div>

          {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
            type="button"
            onClick={addProjectField}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            + Add Another Project
          </button>


          <button
            type="submit"
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded block"
          >
            {uploading ? "Uploading..." : "Submit Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSocialMediaProject;
