import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../src/firebase';
import Sidebar from './Sidebar';
import ProjectImage from '../assets/project-image.png';
import toast from 'react-hot-toast';

const ShowProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const fetchedProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(fetchedProjects);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(fetchedProjects.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Delete project
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects(projects.filter((p) => p.id !== id));
      toast.success('Project deleted successfully.');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project.');
    }
  };

  // Start editing
  const handleEdit = (project) => {
    setEditingProjectId(project.id);
    setEditData({
      title: project.title || '',
      category: project.category || '',
      description: project.description || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags || '',
      sections:
        project.sections?.map((sec) => ({
          description: sec.description || '',
          imageUrl: sec.imageUrl || '',
        })) || [],
    });
  };

  // Handle text input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle section description change
  const handleSectionChange = (index, value) => {
    const updatedSections = [...editData.sections];
    updatedSections[index].description = value;
    setEditData({ ...editData, sections: updatedSections });
  };

  // Add section
  const handleAddSection = () => {
    setEditData({
      ...editData,
      sections: [...editData.sections, { description: '', imageUrl: '' }],
    });
  };

  // Remove section
  const handleRemoveSection = (index) => {
    const updated = editData.sections.filter((_, i) => i !== index);
    setEditData({ ...editData, sections: updated });
  };

  // Save project changes
  const handleSave = async (id) => {
    try {
      const updatedData = {
        title: editData.title,
        category: editData.category,
        description: editData.description,
        tags: editData.tags.split(',').map((tag) => tag.trim()),
        sections: editData.sections,
      };

      await updateDoc(doc(db, 'projects', id), updatedData);
      setProjects(
        projects.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
      setEditingProjectId(null);
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project.');
    }
  };

  // Cancel edit mode
  const handleCancel = () => setEditingProjectId(null);

  // Filter and search
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(p.tags) &&
        p.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h2 className="text-3xl font-bold mb-6">All Projects</h2>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6 space-y-3 md:space-y-0">
          <input
            type="text"
            placeholder="Search by title, tag, or description..."
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white w-full md:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white w-full md:w-1/4"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {filteredProjects.length === 0 && (
            <p className="text-gray-400">No projects found.</p>
          )}

          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1a1a1a] p-6 rounded shadow-md border border-gray-600 max-w-3xl"
            >
              <img
                src={project.imageUrl || ProjectImage}
                alt={project.title}
                className="w-full h-60 object-cover rounded mb-4"
              />

              {editingProjectId === project.id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    placeholder="Project Title"
                    className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-600 text-white"
                  />

                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-600 text-white"
                  />

                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    placeholder="Project Description"
                    rows={3}
                    className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-600 text-white"
                  />

                  <input
                    type="text"
                    name="tags"
                    value={editData.tags}
                    onChange={handleChange}
                    placeholder="Tags (comma separated)"
                    className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 text-white"
                  />

                  <h4 className="font-semibold mb-2">Sections</h4>
                  {editData.sections.map((sec, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 p-3 rounded mb-3"
                    >
                      {sec.imageUrl && (
                        <img
                          src={sec.imageUrl}
                          alt="Section"
                          className="w-32 h-24 object-cover rounded mb-2"
                        />
                      )}
                      <textarea
                        placeholder="Section Description"
                        value={sec.description}
                        onChange={(e) =>
                          handleSectionChange(index, e.target.value)
                        }
                        rows={3}
                        className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-600 text-white"
                      />
                      <button
                        onClick={() => handleRemoveSection(index)}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                      >
                        Remove Section
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleAddSection}
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-800 mb-4"
                  >
                    + Add Section
                  </button>

                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => handleSave(project.id)}
                      className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                  <p className="text-gray-300 mb-1">{project.description}</p>
                  <p className="mb-1">
                    <strong>Category:</strong> {project.category}
                  </p>
                  <p className="mb-3">
                    <strong>Tags:</strong>{' '}
                    {Array.isArray(project.tags)
                      ? project.tags.join(', ')
                      : project.tags}
                  </p>

                  {project.sections && project.sections.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {project.sections.map((sec, i) => (
                        <div key={i} className="border-t border-gray-700 pt-2">
                          {sec.imageUrl && (
                            <img
                              src={sec.imageUrl}
                              alt=""
                              className="w-40 h-28 object-cover rounded mb-2"
                            />
                          )}
                          <p className="text-gray-400">{sec.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProjects;
