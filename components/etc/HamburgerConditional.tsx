"use client";

import { usePathname } from "next/navigation";
import HamburgerMenu from "@/components/etc/HamburgerMenu";

export default function HamburgerConditional() {
  const pathname = usePathname();

  // 예: 루트("/")일 때는 숨긴다
  const shouldShow = pathname !== "/";

  if (!shouldShow) return null; // or return <></>

  return <HamburgerMenu />;
}