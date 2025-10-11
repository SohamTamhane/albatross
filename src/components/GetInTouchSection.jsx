import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageGIF from "../assets/imageGIF.gif";
import ContactForm from "./ContactForm";

export default function GetInTouchSection() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-center md:items-start justify-around px-4 md:px-16 py-20 gap-10 relative overflow-hidden">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center md:text-left flex flex-col items-center md:items-start"
      >
        <h2 className="font-aktiv text-2xl sm:text-3xl lg:text-4xl tracking-wide mb-6 leading-snug">
          Go years without touching land, just{" "}
          <br className="hidden md:block" />
          like an <span className="font-bold text-[#0047E2]">Albatross</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowPopup(true)}
            className="bg-[#0047E2] px-6 py-2 text-white font-medium font-aktiv text-lg cursor-pointer rounded-[6px] shadow-lg hover:shadow-[#0047E2]/40 transition-shadow"
          >
            Talk to us
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 px-6 py-2 text-white font-medium font-aktiv text-lg rounded-[6px] border border-white/15 hover:bg-white/20 transition"
          >
            Work at ALB
          </motion.button>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full sm:w-auto max-w-[350px] md:max-w-[450px] lg:max-w-[500px]"
      >
        <img
          src={ImageGIF}
          alt="Albatross GIF"
          className="w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(0,71,226,0.3)]"
        />
      </motion.div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ContactForm onClose={() => setShowPopup(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
