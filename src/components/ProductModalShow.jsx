import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductModalShow({ project, onClose }) {
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-zinc-900 text-white w-[95%] max-w-[900px] max-h-[90vh] rounded-2xl overflow-y-auto no-scrollbar shadow-2xl p-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-white hover:text-gray-400 text-3xl font-bold z-50 cursor-pointer"
          >
            ×
          </button>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-3 font-aktiv tracking-wide">
            {project.title}
          </h2>

          {/* Tags & Category */}
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

          {/* Main Image */}
          {project.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6 bg-[#1c1c1c] p-4 rounded-xl"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full max-h-[400px] object-contain rounded-xl"
              />
            </motion.div>
          )}

          {/* Description */}
          {project.description && (
            <p className="text-gray-300 text-base mb-6 leading-relaxed font-aktiv">
              {project.description}
            </p>
          )}

          {/* Sections */}
          {project.sections?.length > 0 && (
            <div className="mt-4 space-y-6">
              {project.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-[#1c1c1c] border border-white/5"
                >
                  {section.imageUrl && (
                    <img
                      src={section.imageUrl}
                      alt={`section-${index}`}
                      className="w-full max-h-[300px] object-contain mb-3 rounded"
                    />
                  )}
                  {section.description && (
                    <p className="text-sm text-gray-300">{section.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
