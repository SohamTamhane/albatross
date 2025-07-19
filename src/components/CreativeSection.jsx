import React, { useState } from "react";
import TeamImage1 from "../assets/dummyImg1.jpeg";
import TeamImage2 from "../assets/dummyImg2.jpg";

export default function CreativeSection(){

    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        {
            img: TeamImage1,
            text: "Every masterpiece has a story! ✨ Our handcrafted mementos for ELEV8 by The Architect’s Diary are designed with soul and skill. Catch the behind-the-scenes magic in our latest.",
        },
        {
            img: TeamImage2,
            text: "Behind every piece lies a journey of passion. Explore how our creators bring life to ideas through detail and dedication.",
        },
        {
            img: TeamImage1,
            text: "Creativity meets craftsmanship. Discover the inspiration behind our latest designs and what makes them truly unique.",
        },
    ];

  return (
    <div className="text-white py-10 px-4">
      <div className="font-montserrat font-light text-2xl text-center mb-10">
        One of the creatives
      </div>

      <div className="flex flex-row items-center justify-center gap-x-6 mb-6">
        {data.map((item, index) => (
          <img
            key={index}
            src={item.img}
            alt="CreativeImg..."
            onClick={() => setActiveIndex(index)}
            className={`w-20 h-20 rounded-full object-cover shadow-lg cursor-pointer transition-all duration-300 border-2 ${
              activeIndex === index ? "border-cyan-400 scale-110" : "border-gray-700"
            }`}
          />
        ))}
      </div>

      <hr className="w-[60%] mx-auto border-gray-600 my-6" />

      <p className="font-montserrat font-light text-center max-w-xl mx-auto text-sm sm:text-base px-4">
        {data[activeIndex].text}
      </p>
    </div>
  );
}