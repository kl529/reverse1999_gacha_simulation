"use client";

import Image from "next/image";
import { getHomeUrl } from "@/lib/cdn";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image src={getHomeUrl("loading.gif")} alt="로딩 중..." width={100} height={100} priority />
    </div>
  );
}
