"use client";

import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center z-[9999]">
      <Image
        src="/infos/home/loading.gif" 
        alt="로딩 중..."
        width={100}
        height={100}
      />
    </div>
  );
}