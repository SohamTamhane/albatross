import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ProjectImage from '../assets/project-image.png';

const ShowProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setProjects([
      {
        title: 'PetX Website',
        category: 'Branding',
        tags: ['React', 'MongoDB'],
        // image: 'https://www.google.com/imgres?q=project%20images&imgurl=https%3A%2F%2Fwww.simplilearn.com%2Fice9%2Ffree_resources_article_thumb%2Fproject_management_coursefees.jpg&imgrefurl=https%3A%2F%2Fwww.simplilearn.com%2Fproject-management-ideas-article&docid=5l-GsPm10bdJ7M&tbnid=_BYi1AhPaY6-AM&vet=12ahUKEwi7l7XajdiOAxUj9zgGHcGEJLUQM3oECCUQAA..i&w=848&h=477&hcb=2&ved=2ahUKEwi7l7XajdiOAxUj9zgGHcGEJLUQM3oECCUQAA'
      },
      {
        title: 'Agro App',
        category: 'Social Media',
        tags: ['Firebase', 'CNN'],
        // image: 'https://via.placeholder.com/150'
      }
    ]);
  }, []);

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-20">
        <h2 className="text-3xl font-bold mb-6">All Projects</h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-6 rounded shadow-md w-full max-w-2xl border-1 border-gray-500"
            >
              <img
                src={ProjectImage}
                alt={project.title}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-1"><strong>Category:</strong> {project.category}</p>
                <p>
                  <strong>Tags:</strong>{' '}
                  <span className="text-gray-400">{project.tags.join(', ')}</span>
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
