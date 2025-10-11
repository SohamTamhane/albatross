import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdsModal({ project, onClose }) {
  const modalRef = useRef(null);

  // 🔒 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 🎥 Clean YouTube embed URL
  const getCleanYouTubeEmbedUrl = (url) => {
    const match = url?.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (match) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&loop=1&playlist=${videoId}`;
    }
    return null;
  };

  const embedUrl = getCleanYouTubeEmbedUrl(project.videoUrl);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[115] backdrop-blur-md flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          ref={modalRef}
          className="bg-black w-[900px] h-full overflow-y-auto no-scrollbar p-6 relative text-white rounded-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Close Button */}
          <div className="sticky top-0 z-50 flex justify-end">
            <motion.button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-3xl font-bold cursor-pointer"
              whileHover={{ rotate: 90 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ×
            </motion.button>
          </div>

          {/* Project Title */}
          <motion.h2
            className="text-3xl font-bold mb-4 font-aktiv"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-white/10 border border-gray-500 text-white px-3 py-1 text-sm font-aktiv">
              {project.category}
            </span>
            <span className="bg-black/15 border border-gray-500 text-white px-3 py-1 text-sm font-aktiv">
              {project.tags}
            </span>
          </div>

          {/* Main Content */}
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {/* Left: Video or Image */}
            <div className="md:w-1/2 w-full">
              {project.videoFile ? (
                <motion.video
                  src={project.videoFile}
                  className="w-full h-auto rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              ) : embedUrl ? (
                <motion.div
                  className="aspect-video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={embedUrl}
                    title="Advertisement Video"
                    frameBorder="0"
                    allow="autoplay; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              ) : (
                <motion.img
                  src={
                    project.imageUrls?.[0] || "https://via.placeholder.com/400x300"
                  }
                  alt={project.title}
                  className="w-full h-auto rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </div>

            {/* Right: Description */}
            <div className="md:w-1/2 w-full flex flex-col justify-center">
              {project.description && (
                <p className="text-gray-300 text-base leading-relaxed font-aktiv">
                  {project.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
