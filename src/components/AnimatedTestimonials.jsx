import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// Sample data
const testimonials = [
  {
    name: "Soham Tamhane",
    quote:
      "Working with Soham was a game-changer — his vision helped bring our brand to life.",
  },
  {
    name: "Shashank Ghatage",
    quote:
      "I’ve never seen someone so dedicated. The final product exceeded expectations.",
  },
  {
    name: "Omkar Mangalekar",
    quote:
      "Smooth process, clear communication, and fantastic design outcomes.",
  },
];

export default function AnimatedTestimonials({
  autoplay = true,
  interval = 5000,
}) {
  const [current, setCurrent] = useState(0);

  // handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6"
        >
          <div className="text-4xl text-gray-300 mb-4">
            <FaQuoteLeft className="inline" />
          </div>
          <p className="text-lg italic text-gray-300 mb-4">"{testimonials[current].quote}"</p>
          <div className="text-sm font-semibold text-gray-300">
            — {testimonials[current].name}
          </div>
          <div className="text-4xl text-gray-300 mt-4">
            <FaQuoteRight className="inline" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual controls (optional) */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx !== current ? "bg-gray-800" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
