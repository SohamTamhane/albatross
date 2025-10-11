import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <div className="fixed inset-0 z-[155] flex items-center justify-center bg-black/50 backdrop-blur-md">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-zinc-900 text-white w-[95%] max-w-[900px] max-h-[90vh] rounded-2xl overflow-y-auto no-scrollbar shadow-2xl p-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-white hover:text-gray-400 text-3xl font-bold z-50"
          >
            ×
          </button>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-3 font-aktiv tracking-wide">
            {project.title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.category && (
              <span className="bg-white/10 border border-gray-600 text-sm px-3 py-1 rounded-full font-aktiv">
                {project.category}
              </span>
            )}
            {project.tags && (
              <span className="bg-white/10 border border-gray-600 text-sm px-3 py-1 rounded-full font-aktiv">
                {project.tags}
              </span>
            )}
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
                className="w-full rounded-xl object-cover"
              />
            </div>
          )}

          {/* imageUrls Grid */}
          {normalizedImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {normalizedImages.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl overflow-hidden border border-white/10 hover:scale-[1.02] transition-transform duration-200"
                >
                  <img
                    src={url}
                    alt={`additional-image-${index}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Sections */}
          {project.sections?.length > 0 && (
            <div className="space-y-6">
              {project.sections.map((section, index) => (
                <div key={index}>
                  {section.description && (
                    <p className="text-gray-300 text-base mb-4 leading-relaxed font-aktiv">
                      {section.description}
                    </p>
                  )}
                  {section.imageUrl && (
                    <img
                      src={section.imageUrl}
                      alt={`section-image-${index}`}
                      className="w-full rounded-xl object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
