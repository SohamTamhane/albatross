import React, { useEffect, useRef } from "react";

export default function BrandingModal({ project, onClose }) {
  const modalRef = useRef(null);

  // 🔒 Disable body scroll when modal opens
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow; // restore on close/unmount
    };
  }, []);

  // 🖱️ Handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#0f0f0f] w-full max-w-[900px] h-[90vh] p-6 relative overflow-y-auto text-white rounded-lg shadow-lg no-scrollbar"
      >
        {/* Close Button */}
        <div className="sticky top-0 z-50 flex justify-end py-2">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-3xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Project Title */}
        <h2 className="text-3xl font-bold mb-2 font-aktiv">{project.title}</h2>

        {/* Tags & Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white/10 border border-gray-500 text-white px-3 py-1 text-sm font-aktiv">
            {project.category}
          </span>
          <span className="bg-black/15 border border-gray-500 text-white px-3 py-1 text-sm font-aktiv">
            {project.tags}
          </span>
        </div>

        {/* Main Image */}
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full max-h-[500px] object-contain mb-6 p-4 rounded"
          />
        )}

        {/* Description */}
        {project.description && (
          <p className="text-gray-300 text-base mb-6 leading-relaxed font-aktiv text-justify">
            {project.description}
          </p>
        )}

        {/* Sections */}
        {project.sections && project.sections.length > 0 && (
          <div className="mt-4 space-y-6">
            {project.sections.map((section, index) => (
              <div key={index}>
                <div className="p-4 rounded overflow-x-auto no-scrollbar">
                  {section.imageUrls?.length > 0 ? (
                    <div className="flex gap-4">
                      {section.imageUrls.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`section-${index}-${i}`}
                          className="w-full max-h-[500px] object-contain p-4 rounded"
                        />
                      ))}
                    </div>
                  ) : section.imageUrl ? (
                    <img
                      src={section.imageUrl}
                      alt={`section-${index}`}
                      className="w-full max-h-[500px] object-contain p-4 rounded"
                    />
                  ) : null}
                </div>

                <p className="text-gray-300 text-base mt-4 mb-6 leading-relaxed font-aktiv text-justify">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
