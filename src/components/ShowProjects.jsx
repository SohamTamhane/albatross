import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../src/firebase'; 
import Sidebar from './Sidebar';
import ProjectImage from '../assets/project-image.png'; 

const ShowProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h2 className="text-3xl font-bold mb-6">All Projects</h2>

        <div className="space-y-6">
          {projects.length === 0 && (
            <p className="text-gray-400">No projects found.</p>
          )}
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1a1a1a] p-6 rounded shadow-md w-full max-w-2xl border border-gray-600"
            >
              <img
                src={project.imageUrl || ProjectImage}
                alt={project.title}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-1"><strong>Category:</strong> {project.category}</p>
                <p>
                  <strong>Tags:</strong>{' '}
                  <span className="text-gray-400">
                    {Array.isArray(project.tags) ? project.tags.join(', ') : project.tags}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProjects;
