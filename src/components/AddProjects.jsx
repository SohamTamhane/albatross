import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AddProjects() {
  const [projects, setProjects] = useState([
    { title: "", category: "", tags: "", image: null },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...projects];
    updated[index].image = file;
    setProjects(updated);
  };

  const addProjectField = () => {
    setProjects([...projects, { title: "", category: "", tags: "", image: null }]);
  };

  const deleteProjectField = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Projects:", projects);
    // You can handle image upload via FormData or API call here
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h1 className="text-3xl font-bold mb-4">Add Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-[#222] p-4 rounded w-[70%] h-auto mb-6"
            >
              <label className="block mb-2">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="w-full p-2 mb-4 text-white bg-[#333] rounded border border-white"
                required
              />

              <label className="block mb-2">Category</label>
              <input
                type="text"
                value={project.category}
                onChange={(e) => handleChange(index, "category", e.target.value)}
                className="w-full p-2 mb-4 text-white bg-[#333] rounded border border-white"
                required
              />

              <label className="block mb-2">Tags</label>
              <input
                type="text"
                value={project.tags}
                onChange={(e) => handleChange(index, "tags", e.target.value)}
                className="w-full p-2 mb-4 text-white bg-[#333] rounded border border-white"
              />

              <label className="block mb-2">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="w-[25%] p-1 mb-4 text-white bg-[#333] rounded border border-white"
              />

              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteProjectField(index)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm cursor-pointer"
                >
                  Delete
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addProjectField}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Another Project
          </button>

          <br />

          <button
            type="submit"
            className="bg-green-600 px-6 py-2 mt-4 rounded hover:bg-green-700"
          >
            Submit Projects
          </button>
        </form>
      </div>
    </div>
  );
}