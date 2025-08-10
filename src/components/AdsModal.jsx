import { useRef, useEffect } from "react";

export default function AdsModal({ project, onClose }) {
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

  // Clean YouTube embed URL (minimal branding)
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-[#111] rounded max-w-6xl w-full max-h-[90vh] overflow-y-auto no-scrollbar p-6 relative text-white"
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

        {/* Project Title */}
        <h2 className="text-3xl font-bold mb-4 font-montserrat">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white/10 border border-gray-500 text-white px-3 py-1 text-sm rounded font-montserrat">
            {project.category}
          </span>
          <span className="bg-black/15 border border-gray-500 text-white px-3 py-1 text-sm rounded font-montserrat">
            {project.tags}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Video or Image */}
          <div className="md:w-1/2 w-full">
            {project.videoFile ? (
              // Self-hosted video (no branding at all)
              <video
                src={project.videoFile}
                className="w-full h-auto rounded"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              />
            ) : embedUrl ? (
              // YouTube embed with minimal branding
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded"
                  src={embedUrl}
                  title="Advertisement Video"
                  frameBorder="0"
                  allow="autoplay; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              // Fallback image
              <img
                src={
                  project.imageUrls?.[0] ||
                  "https://via.placeholder.com/400x300"
                }
                alt={project.title}
                className="w-full h-auto rounded"
              />
            )}
          </div>

          {/* Right: Description */}
          <div className="md:w-1/2 w-full flex flex-col">
            {project.description && (
              <p className="text-gray-300 text-base leading-relaxed font-montserrat">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
