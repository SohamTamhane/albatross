import { useState } from "react";
import { db } from "../../firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";

const AddBrandingProject = () => {
  const [projects, setProjects] = useState([
    {
      title: "",
      tags: "",
      desc: "",
      image: null,
      sections: [],
    },
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

  const handleSectionChange = (projIndex, secIndex, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[projIndex].sections[secIndex][field] = value;
    setProjects(updatedProjects);
  };

  const handleSectionImageChange = (projIndex, secIndex, file) => {
    const updatedProjects = [...projects];
    updatedProjects[projIndex].sections[secIndex].image = file;
    setProjects(updatedProjects);
  };

  const addSection = (projIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projIndex].sections.push({ image: null, description: "" });
    setProjects(updatedProjects);
  };

  const removeSection = (projIndex, secIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projIndex].sections.splice(secIndex, 1);
    setProjects(updatedProjects);
  };

  const addProjectField = () => {
    setProjects([
      ...projects,
      { title: "", tags: "", desc: "", image: null, sections: [] },
    ]);
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
        const { title, tags, desc, image, sections } = project;
        if (!title || !tags || !desc || !image) {
          toast.error("All fields are required in every project.");
          setLoading(false);
          return;
        }

        // Upload main image
        const mainFormData = new FormData();
        mainFormData.append("file", image);
        mainFormData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`);
        mainFormData.append("folder", `${import.meta.env.VITE_CLOUDINARY_FOLDER}_branding`);

        const mainRes = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: mainFormData,
          }
        );

        const mainData = await mainRes.json();
        const imageUrl = mainData.secure_url;

        // Upload section images (optional)
        const uploadedSections = [];

        for (const sec of sections) {
          // Skip empty section
          if (!sec.image && !sec.description) continue;

          // Show error if only one of image/description is present
          if (!sec.image || !sec.description) {
            toast.error("Each section must have both image and description, or leave it empty.");
            setLoading(false);
            return;
          }

          const sectionFormData = new FormData();
          sectionFormData.append("file", sec.image);
          sectionFormData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`);
          sectionFormData.append("folder", `${import.meta.env.VITE_CLOUDINARY_FOLDER}_branding`);

          const secRes = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: sectionFormData,
            }
          );

          const secData = await secRes.json();
          uploadedSections.push({
            imageUrl: secData.secure_url,
            description: sec.description,
          });
        }

        // Save project to Firestore
        await addDoc(collection(db, "projects"), {
          title,
          category: "Branding",
          tags,
          description: desc,
          imageUrl,
          sections: uploadedSections,
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Projects submitted successfully!");
      setProjects([
        {
          title: "",
          tags: "",
          desc: "",
          image: null,
          sections: [],
        },
      ]);
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
        <h2 className="text-3xl font-bold mb-4 ml-4 font-aktiv">Add Branding Projects</h2>

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

              <label className="block mb-2">Main Project Image</label>
              <input
                type="file"
                accept="image/*"
                className="mb-4 w-[60%] p-1 rounded border border-white"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />

              {/* Additional Sections */}
              <h4 className="text-lg mt-6 mb-2 font-semibold">Additional Sections (Optional)</h4>
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

                  <label className="block mb-1">Section Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mb-2 w-[60%] p-1 rounded border border-white"
                    onChange={(e) =>
                      handleSectionImageChange(index, secIndex, e.target.files[0])
                    }
                  />
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

export default AddBrandingProject;
