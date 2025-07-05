"use client";
import React, { useEffect, useState, useMemo } from "react";

interface ColourfulTextProps {
  text: string;
  className?: string;
}

export default function ColourfulText({ text, className }: ColourfulTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const colors = useMemo(
    () => [
      "text-red-500",
      "text-orange-500",
      "text-yellow-500",
      "text-green-500",
      "text-blue-500",
      "text-indigo-500",
      "text-purple-500",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [colors.length]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span className={`${colors[currentIndex]} ${className || ""}`}>
      {displayText.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </span>
  );
}
