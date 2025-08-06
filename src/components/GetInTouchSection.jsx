import { useState } from "react";
import ImageGIF from "../assets/imageGIF.gif";
import ContactForm from "./ContactForm";

export default function GetInTouchSection() {
  const [showPopup, setShowPopup] = useState(false);

  return (
  
    <div className="flex flex-col md:flex-row items-center md:items-start justify-around px-4 md:px-16 py-20 gap-10">
      <div className="text-center md:text-left flex flex-col items-center md:items-start">
        <h2 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl tracking-wide mb-6">
          Go years without touching land, just <br className="hidden md:block" />
          like an <span className="font-bold">Albatross</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-[#0047E2] px-6 py-2 text-white font-medium font-montserrat text-lg rounded"
            onClick={() => setShowPopup(true)}
          >
            Get in touch
          </button>
          <button className="bg-white/10 px-6 py-2 text-white font-medium font-montserrat text-lg rounded">
            Work at ALB
          </button>
        </div>
      </div>

      <div className="w-full sm:w-auto max-w-[350px] md:max-w-[450px] lg:max-w-[500px]">
        <img
          src={ImageGIF}
          alt="ImageGIF"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Contact Form Modal */}
      {showPopup && <ContactForm onClose={() => setShowPopup(false)} />}
    </div>
  );
}
