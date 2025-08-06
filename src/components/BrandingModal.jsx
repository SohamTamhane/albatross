import React, { useEffect, useRef } from "react";

export default function BrandingModal({ project, onClose }) {
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center px-6">
      <div
        ref={modalRef}
        className="bg-[#111] rounded max-w-5xl w-full max-h-[90vh] p-6 relative overflow-y-auto text-white no-scrollbar"
      >
        
        <div className="sticky top-0 z-50 flex justify-end">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-3xl font-bold"
          >
            ×
          </button>
        </div>

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

        {/* Description */}
        {project.description && (
          <p className="text-gray-300 text-base mb-6 leading-relaxed font-montserrat">
            {project.description}
          </p>
        )}

       <div>
         {/* Sections */}
        {project.sections && project.sections.length > 0 && (
          <div className="mt-4">
            <div className="space-y-6">
              {project.sections.map((section, index) => (
                <div key={index}>
                  <div className="p-4 rounded bg-[#1c1c1c] overflow-x-auto no-scrollbar">
                    {/* If multiple images */}
                    {section.imageUrls?.length > 0 ? (
                      <div className="flex gap-4">
                        {section.imageUrls.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`section-${index}-${i}`}
                            className="h-48 object-contain rounded"
                          />
                        ))}
                      </div>
                    ) : section.imageUrl ? (
                      <img
                        src={section.imageUrl}
                        alt={`section-${index}`}
                        className="w-full max-h-[300px] object-contain mb-3 rounded"
                      />
                    ) : null}
                  </div>
                  <p className="text-gray-300 text-base mt-4 mb-6 leading-relaxed font-montserrat">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
       </div>
      </div>
    </div>
  );
}
