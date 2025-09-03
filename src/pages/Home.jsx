import { motion } from "framer-motion";
import HeroSectionImg1 from "../assets/Hero-Section-Img-1.png";
import Banner from "../assets/banner3.mp4";
import BgShapeImg from "../assets/bg-shape.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import CreativeSection from "../components/CreativeSection";
import GetInTouchSection from "../components/GetInTouchSection";
import CategoryFilter from "../components/CategoryFilter";
import AnimatedHeroText from "../components/AnimatedHeroText";
import ContactForm from "../components/ContactForm";
import { useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="w-full">
      {/* Hero section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="flex flex-col items-center mt-8"
      >
        {/* <div className="flex flex-col items-center mt-8"> */}
        <div className="font-aktiv text-5xl sm:text-5xl md:text-6xl mb-2 text-center tracking-normal">
          Your extended
        </div>

        <div className="font-aktiv text-5xl sm:text-5xl md:text-6xl text-center tracking-normal">
          <AnimatedHeroText />
        </div>

        <div className="font-aktiv text-5xl sm:text-5xl md:text-6xl text-center relative z-10 mt-2">wing</div>

        <div className="font-aktiv text-sm sm:text-base text-center mt-8 max-w-2xl text-gray-300">
          Looking to grow your business, increase sales, and boost profits{" "}
          <br />
          with paid ads? You're in the right place!
        </div>

        <button
          className="bg-[#0047E2] px-4 py-1 text-white font-medium font-aktiv text-lg mt-10 cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          Talk to us
        </button>

        {/* Video */}
        <div className="w-full mt-10 px-2 md:px-16">
          <video className="w-full h-auto rounded-lg" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* </div> */}
      </motion.div>

      {/* Second section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-screen text-white flex items-center justify-center px-4 py-12 sm:py-20">
        <img
          src={BgShapeImg}
          alt="Bg-shape-img..."
          className="absolute inset-0 object-cover w-full h-full"
        />

        <div className="relative max-w-4xl text-center font-aktiv text-sm sm:text-base md:text-lg font-light px-2">
          <p>
            We can have some text here saying or explaining a story or the
            values we provide at Albatross. How a brand is important to stand
            out in the current market.
          </p>
          <br />
          <p className="font-medium">
            That's how we work. With our sheer{" "}
            <span className="italic">f*cking</span> passion.
          </p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="my-10 px-0">
        <CategoryFilter />
      </motion.div>

      {/* Featured */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="px-4 sm:px-8 lg:px-20 py-10">
        <h1 className="mb-10 text-xl sm:text-2xl font-aktiv font-light text-[#B2B2B2] text-center">
          F E A T U R E D
        </h1>
        <div className="grid md:grid-cols-2">
          <div className="relative group overflow-hidden cursor-pointer">
            <img
              src={image1}
              alt="image1"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-lg font-aktiv font-medium">
                Kadam Realty
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/10 px-3 py-1 text-xs font-aktiv">
                  Campaign
                </span>
                <span className="bg-black/15 px-3 py-1 text-xs font-aktiv border border-white">
                  Food
                </span>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden cursor-pointer">
            <img
              src={image2}
              alt="image2"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-lg font-aktiv font-medium">
                AAKAR Alumini DYP
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/10 px-3 py-1 text-xs font-aktiv">
                  Campaign
                </span>
                <span className="bg-black/15 px-3 py-1 text-xs font-aktiv border border-white">
                  Jewellery
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Get in Touch Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="px-4">
        <GetInTouchSection />
      </motion.div>

      {/* One of the creatives */}
      {/* <div className="mt-10 px-4">
        <CreativeSection />
      </div> */}

      {showPopup && <ContactForm onClose={() => setShowPopup(false)} />}
    </div>
  );
}
