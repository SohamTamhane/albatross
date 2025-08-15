import { useEffect, useState } from "react";
import underlineBrush from "../assets/bg-image.png";

const words = ["Design", "Advertising", "Marketing", "Everything"];

export default function AnimatedHeroText() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const speed = isDeleting ? 60 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
        }
      } else {
        // Deleting
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <div className="w-full px-2 py-4 relative">
  <div className="font-inter text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white relative">
    
    {/* Responsive underline */}
    <span
      className="absolute left-1/2 transform -translate-x-1/2 bottom-[-47px] w-[250px] h-[40px] sm:w-[350px] sm:h-[60px] md:w-[500px] md:h-[80px] bg-no-repeat bg-contain"
      style={{
        backgroundImage: `url(${underlineBrush})`,
        backgroundPosition: "center",
        zIndex: 0,
      }}
    ></span>

    {/* Text on top */}
    <span className="relative z-10">{displayText}</span>{" "}
    <span className="relative z-10">wing</span>
  </div>
</div>

  );
}
