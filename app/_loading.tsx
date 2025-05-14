"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 text-white backdrop-blur-sm backdrop-saturate-150 transition-colors duration-300 dark:bg-black/30">
      <Image
        src="/infos/effects/loading_effect.gif"
        alt="로딩 중"
        width={96}
        height={96}
        unoptimized
        className="mb-4"
      />
      <p className="animate-pulse text-sm text-gray-300">로딩중..</p>
    </div>
  );
}
