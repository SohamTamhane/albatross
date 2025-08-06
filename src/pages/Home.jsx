import HeroSectionImg1 from "../assets/Hero-Section-Img-1.png";
import Banner from "../assets/banner3.mp4";
import BgShapeImg from "../assets/bg-shape.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import CreativeSection from "../components/CreativeSection";
import GetInTouchSection from "../components/GetInTouchSection";
import CategoryFilter from "../components/CategoryFilter";
import AnimatedHeroText from "../components/AnimatedHeroText";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero section */}
      <div className="flex flex-col items-center mt-12 px-4">
        <div className="font-inter text-5xl sm:text-5xl md:text-6xl font-bold mb-4 text-center">
          Your brand's
        </div>

        <AnimatedHeroText/>

        <div className="font-poppins text-sm sm:text-base text-center mt-6 max-w-2xl text-gray-300">
          Looking to grow your business, increase sales, and boost profits{" "}
          <br />
          with paid ads? You're in the right place!
        </div>

        {/* Video */}
        <div className="w-full mt-10 px-2 md:px-16">
          <video className="w-full h-auto rounded-lg" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Second section */}
      <div className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-screen text-white flex items-center justify-center px-4 py-12 sm:py-20">
        <img
          src={BgShapeImg}
          alt="Bg-shape-img..."
          className="absolute inset-0 object-cover w-full h-full"
        />

        <div className="relative max-w-3xl text-center font-montserrat text-sm sm:text-base md:text-lg font-light px-2">
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
      </div>

      {/* Category Filter */}
      <div className="my-10 px-4">
        <CategoryFilter />
      </div>

      {/* Featured */}
      <div className="px-4 sm:px-8 lg:px-20 py-10">
        <h1 className="mb-10 text-xl sm:text-2xl font-montserrat font-light text-[#B2B2B2] text-center">
          F E A T U R E D
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative group overflow-hidden cursor-pointer">
            <img
              src={image1}
              alt="image1"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-lg font-montserrat font-medium">
                Kadam Realty
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">
                  Campaign
                </span>
                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border border-white">
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
              <h2 className="text-lg font-montserrat font-medium">
                AAKAR Alumini DYP
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/10 px-3 py-1 text-xs font-montserrat">
                  Campaign
                </span>
                <span className="bg-black/15 px-3 py-1 text-xs font-montserrat border border-white">
                  Jewellery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="px-4">
        <GetInTouchSection />
      </div>

      {/* One of the creatives */}
      <div className="mt-10 px-4">
        <CreativeSection />
      </div>
    </div>
  );
}
