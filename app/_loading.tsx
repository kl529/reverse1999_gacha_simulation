"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 dark:bg-black/30 backdrop-blur-sm backdrop-saturate-150 text-white transition-colors duration-300">
      <Image
        src="/infos/effects/loading_effect.gif"
        alt="로딩 중"
        width={96}
        height={96}
        unoptimized
        className="mb-4"
      />
      <p className="text-sm text-gray-300 animate-pulse">로딩중..</p>
    </div>
  );
}