import { useRef, useEffect } from "react";

export default function SocialMediaModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Normalize imageUrls (array or single)
  const normalizedImages = Array.isArray(project.imageUrls)
    ? project.imageUrls
    : project.imageUrls
    ? [project.imageUrls]
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#111] w-full h-full overflow-y-auto no-scrollbar p-6 relative text-white"
      >
        {/* Close Button */}
        <div className="sticky top-0 z-50 flex justify-end">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 font-aktiv">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white/10 border border-gray-500 text-white px-3 py-1 text-sm font-aktiv">
            {project.category}
          </span>
          <span className="bg-black/15 border border-gray-500 text-white px-3 py-1 text-sm font-aktiv">
            {project.tags}
          </span>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-gray-300 text-base mb-6 leading-relaxed font-aktiv">
            {project.description}
          </p>
        )}

        {/* Main Single Image */}
        {project.imageUrl && (
          <div className="mb-6">
            <img
              src={project.imageUrl}
              alt="Main project"
              className="w-full object-cover rounded"
            />
          </div>
        )}

        {/* imageUrls Grid */}
        {normalizedImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {normalizedImages.map((url, index) => (
              <div
                key={index}
                className="rounded overflow-hidden border border-white/10"
              >
                <img
                  src={url}
                  alt={`additional-image-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Sections */}
        {project.sections?.length > 0 && (
          <div>
            {project.sections.map((section, index) => (
              <div key={index}>
                {section.description && (
                  <p className="text-gray-300 text-base mb-6 leading-relaxed font-aktiv">
                    {section.description}
                  </p>
                )}
                {section.imageUrl && (
                  <img
                    src={section.imageUrl}
                    alt={`section-image-${index}`}
                    className="w-full h-full object-cover rounded mb-2"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
