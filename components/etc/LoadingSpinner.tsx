"use client";

import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-black/80">
      <Image src="/infos/home/loading.gif" alt="로딩 중..." width={100} height={100} priority />
    </div>
  );
}
