import React, { useEffect, useRef } from "react";

export default function ProductModalShow({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-[#111] rounded max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold"
        >
          ×
        </button>

        {/* Project Title */}
        <h2 className="text-3xl font-bold mb-2 font-montserrat">{project.title}</h2>

        {/* Tags & Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white/10 border border-gray-500 text-white px-3 py-1 text-sm rounded font-montserrat">
            {project.category}
          </span>
          <span className="bg-black/15 border border-gray-500 text-white px-3 py-1 text-sm rounded font-montserrat">
            {project.tags}
          </span>
        </div>

        {/* Main Image */}
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full max-h-[400px] object-contain mb-6 p-4 rounded bg-[#1c1c1c]"
          />
        )}

        {/* Project Description */}
        {project.description && (
          <p className="text-gray-300 text-base mb-6 leading-relaxed font-montserrat">
            {project.description}
          </p>
        )}

        {/* Sections (if any) */}
        {project.sections && project.sections.length > 0 && (
          <div className="mt-4">
            {/* <h3 className="text-2xl font-bold mb-4">Project Sections</h3> */}
            <div className="space-y-6">
              {project.sections.map((section, index) => (
                <div
                  key={index}
                  className="p-4 rounded bg-[#1c1c1c]"
                >
                  {section.imageUrl && (
                    <img
                      src={section.imageUrl}
                      alt={`section-${index}`}
                      className="w-full max-h-[300px] object-contain mb-3 rounded"
                    />
                  )}
                  <p className="text-sm text-gray-300">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
