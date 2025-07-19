import { useState } from "react";
import ImageGIF from "../assets/imageGIF.gif";
import ContactForm from "./ContactForm";

export default function GetInTouchSection() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex flex-row md:flex-row items-start justify-around py-40 sm:py-30 lg:py-35 relative">
      <div className="text-center md:text-left">
        <div className="font-montserrat text-3xl tracking-wide sm:text-2xl lg:text-3xl">
          Go years without touching land, just <br className="hidden md:block"/> like an <span className="font-montserrat font-bold">Albatross</span>
        </div>
        <div className="flex flex-row items-center mt-35 gap-x-3.5 sm:flex-row sm:items-start ">
          <div
            className="bg-[#0047E2] px-4 py-2 text-lg font-montserrat font-medium cursor-pointer text-white"
            onClick={() => setShowPopup(true)}
          >
            Get in touch
          </div>
          <div className="bg-white/10 px-4 py-2 text-lg font-montserrat font-medium cursor-pointer">
            Work at ALB
          </div>
        </div>
      </div>
      <div>
        <img src={ImageGIF} alt="ImageGIF" className="w-150 h-70" />
      </div>

      {showPopup && <ContactForm onClose={() => setShowPopup(false)} />}
    </div>
  );
}
