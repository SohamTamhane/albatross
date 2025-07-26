import { useState } from "react";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "../Sidebar";

const AddBrandingProject = () => {
  const [projects, setProjects] = useState([
    { title: "", tags: "", desc: "", image: null }
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleImageChange = (index, file) => {
    const updatedProjects = [...projects];
    updatedProjects[index].image = file;
    setProjects(updatedProjects);
  };

  const addProjectField = () => {
    setProjects([...projects, { title: "", tags: "", desc: "", image: null }]);
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
        const { title, tags, desc, image } = project;
        if (!title || !tags || !desc || !image) {
          alert("All fields are required in every project.");
          setLoading(false);
          return;
        }

        const imageRef = ref(storage, `branding/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);

        await addDoc(collection(db, "projects"), {
          title,
          category: "Branding",
          tags,
          description: desc,
          imageUrl,
          createdAt: serverTimestamp(),
        });
      }

      alert("Projects submitted successfully!");
      setProjects([{ title: "", tags: "", desc: "", image: null }]);
    } catch (error) {
      console.error(error);
      alert("Error submitting projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h2 className="text-3xl font-bold mb-4 ml-4 font-montserrat">Add Branding Projects</h2>

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
                value="Branding"
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

              <label className="block mb-2">Project Image</label>
              <input
                type="file"
                accept="image/*"
                className="mb-4 w-[60%] p-1 rounded border border-white"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
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

export default AddBrandingProject;
