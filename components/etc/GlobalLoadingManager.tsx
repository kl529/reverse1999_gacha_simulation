"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/etc/LoadingSpinner";

export default function GlobalLoadingManager() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsFadingOut(false);

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 100);
    }, 400); // 로딩 최소 시간 1초

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-sm transition-opacity duration-300 ${isFadingOut ? "opacity-0" : "opacity-100"} `}
    >
      <LoadingSpinner />
    </div>
  );
}
