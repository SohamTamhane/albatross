import { useEffect, useState } from "react";
import underlineBrush from "../assets/bg-image.png";

const words = ["Design", "Advertising", "Marketing", "Everything"];

export default function AnimatedHeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-2 py-2 relative">
      <div className="text-5xl sm:text-5xl md:text-6xl font-extrabold font-aktiv text-center text-white relative">
        
        {/* Responsive underline */}
        <span
          className="absolute left-1/2 transform -translate-x-1/2 bottom-[-47px] w-[250px] h-[40px] sm:w-[350px] sm:h-[60px] md:w-[500px] md:h-[80px] bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${underlineBrush})`,
            backgroundPosition: "center",
            zIndex: 0,
          }}
        ></span>

        {/* Flip word text */}
        <span
          key={index} 
          className="relative z-10 inline-block animate-flip"
        >
          {words[index]}
        </span>
      </div>
    </div>
  );
}
