"use client";

import { useEffect, useState } from "react";

// 커스텀 커서 세팅
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
      className="pointer-events-none fixed z-50 h-8 w-8"
      style={{
        top: position.y - 16,
        left: position.x - 16,
        background: "url('/infos/button/cursor.png') no-repeat center/contain",
      }}
    />
  );
}
