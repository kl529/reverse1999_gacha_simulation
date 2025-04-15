"use client";

import "@/app/globals.css";
import CustomCursor from "@/components/etc/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import SecurityWrapper from "@/components/etc/SecurityWrapper";
import { DarkModeProvider } from "@/components/etc/DarkModeContext";
import HamburgerConditional from "@/components/etc/HamburgerConditional";
import Script from "next/script";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import CardInfoModal from "@/components/modals/CardInfoModal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const [isLoading, setIsLoading] = useState(true);
  // const pathname = usePathname();

  // useEffect(() => {
  //   setIsLoading(true);
  //   const timeout = setTimeout(() => setIsLoading(false), 400); // 최소 로딩 시간
  //   return () => clearTimeout(timeout);
  // }, [pathname]);

  const [hasMounted, setHasMounted] = useState(false);
  const [activeModal, setActiveModal] = useState<"material" | "psychube" | null>(null);
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // 🚫 hydration 전엔 아무것도 렌더링하지 않음

  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/pwa_icon.png" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Z474CQX2JT"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z474CQX2JT');
          `}
        </Script>
      </head>
      <body>
        <DarkModeProvider>
          <SecurityWrapper>
          <HamburgerConditional onModalOpen={(type) => setActiveModal(type as any)} />
            <CustomCursor />
            <SpeedInsights />
            <Analytics />
            {/* 로딩화면 나중에 괜찮은거 나오면 적용 */}
            {/* {isLoading ? <Loading /> : children} */}
            {children}
          </SecurityWrapper>

          {/* 모달 렌더링 예시 */}
          {activeModal === "material" && (
            <CardInfoModal
              isOpen={true}
              onClose={closeModal}
              title="재료 파밍표"
              image="/infos/modal_img/material_sheet.png"
              source="https://bbs.nga.cn/read.php?tid=41840172&rand=968"
            />
          )}

          {activeModal === "psychube" && (
            <CardInfoModal
              isOpen={true}
              onClose={closeModal}
              title="의지 추천"
              image="/infos/modal_img/psychube_sheet.webp"
              description="화질이 구려서 죄송합니다. 추후 바로 검색가능 하도록 사이트 개발중입니다."
              source="https://arca.live/b/arcalivebreverse/130426173"
            />
          )}
        </DarkModeProvider>
      </body>
    </html>
  );
}