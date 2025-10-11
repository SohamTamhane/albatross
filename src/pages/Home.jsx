import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
import AnimatedTestimonials from "../components/AnimatedTestimonials";
import { BackgroundBeams } from "../components/background-beams";
import { PointerHighlight } from "../components/pointer-highlight";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// 🧩 Reusable BentoItem component with animation
function BentoItem({ title, tags, image, className }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={cn(
        "relative overflow-hidden rounded-2xl group cursor-pointer bg-black text-white shadow-lg shadow-black/30",
        className
      )}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      <div className="absolute bottom-4 left-4 z-10">
        <h2 className="text-lg font-aktiv font-medium">{title}</h2>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-aktiv rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  // Fade-in variants
  const fadeIn = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="flex flex-col items-center mt-8 relative"
      >
        <div className="font-aktiv text-5xl sm:text-5xl md:text-6xl mb-2 text-center tracking-tight">
          Your extended
        </div>

        <div className="font-aktiv text-5xl sm:text-5xl md:text-6xl text-center tracking-tight">
          <AnimatedHeroText />
        </div>

        <div className="font-aktiv text-5xl sm:text-5xl md:text-6xl text-center relative z-10 mt-2 tracking-tight">
          wing
        </div>

        <BackgroundBeams />

        <p className="font-montserrat text-sm sm:text-base text-center mt-8 max-w-2xl text-gray-300 leading-relaxed">
          Looking to grow your business, increase sales, and boost profits? <br />
          You’re in the right place!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {console.log("Clicked");
            setShowPopup(true)}}
          className="bg-[#0047E2] z-40 px-6 py-2 text-white font-medium font-aktiv text-lg mt-10 rounded-[6px] shadow-md hover:shadow-[#0047E2]/40 transition-shadow"
        >
          Talk to us
        </motion.button>

        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="px-2 md:px-16 mt-20 relative z-10"
        >
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-4 shadow-lg shadow-black/40">
            <div className="w-full overflow-hidden rounded-xl border border-gray-700">
              <video
                src={Banner}
                alt="Landing Preview"
                className="aspect-[16/9] w-full h-auto"
                muted
                loop
                autoPlay
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-screen text-white flex items-center justify-center px-4 py-20"
      >
        <img
          src={BgShapeImg}
          alt="Background shape"
          className="absolute inset-0 object-cover w-full h-full opacity-70"
        />
        <div className="relative max-w-4xl text-center font-aktiv text-base md:text-lg font-light px-4">
          <p>
            We can have some text here saying or explaining a story or the values we
            provide at Albatross. How a brand is important to stand out in the current
            market.
          </p>
          <div className="flex items-center justify-center mt-6">
            <PointerHighlight>
              <span className="p-4">
                That’s how we work. With our sheer{" "}
                <span className="italic">f*cking</span> passion.
              </span>
            </PointerHighlight>
          </div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="my-10 px-0"
      >
        <CategoryFilter />
      </motion.section>

      {/* Featured Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="px-4 sm:px-8 lg:px-20 py-16"
      >
        <h1 className="mb-10 text-xl sm:text-2xl font-aktiv font-light text-[#B2B2B2] text-center tracking-[0.3em]">
          F E A T U R E D
        </h1>

        <div
          className={cn(
            "grid gap-4 sm:gap-6 md:gap-8",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            "auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px]"
          )}
        >
          <BentoItem title="Kadam Realty" tags={["Campaign", "Food"]} image={image1} className="sm:col-span-2 lg:row-span-2" />
          <BentoItem title="AAKAR Alumni DYP" tags={["Campaign", "Jewellery"]} image={image2} />
          <BentoItem title="AAKAR Alumni DYP" tags={["Campaign", "Jewellery"]} image={image2} />
          <BentoItem title="AAKAR Alumni DYP" tags={["Campaign", "Jewellery"]} image={image2} />
          <BentoItem title="AAKAR Alumni DYP" tags={["Campaign", "Jewellery"]} image={image2} />
        </div>
      </motion.section>

      {/* Get in Touch */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="px-4"
      >
        <GetInTouchSection />
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        className="mt-10 px-4"
      >
        <AnimatedTestimonials />
      </motion.section>

      {/* Contact Modal (with AnimatePresence) */}
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
    </div>
  );
}
