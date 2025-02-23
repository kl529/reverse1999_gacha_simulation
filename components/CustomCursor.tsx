"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed w-8 h-8 pointer-events-none z-50"
      style={{
        top: position.y - 16,
        left: position.x - 16,
        background: "url('/infos/button/cursor.png') no-repeat center/contain",
      }}
    />
  );
}