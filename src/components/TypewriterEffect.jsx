"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

export const TypewriterEffect = ({ words = [], speed = 100, pause = 1000, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && charIndex < words[wordIndex].length) {
      // Typing characters
      timer = setTimeout(() => {
        setDisplayedText(words[wordIndex].substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, speed);
    } else if (isDeleting && charIndex > 0) {
      // Deleting characters
      timer = setTimeout(() => {
        setDisplayedText(words[wordIndex].substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, speed / 2);
    } else {
      // Word complete
      timer = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting && charIndex === words[wordIndex].length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && charIndex === 0) {
          // Move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, pause);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, speed, pause]);

  return (
    <div className={clsx("flex items-center space-x-1", className)}>
      <span className="text-5xl font-bold text-white bg-clip-text">
        {displayedText}
      </span>
      <span className="w-[2px] h-10 bg-white animate-pulse"></span>
    </div>
  );
};
