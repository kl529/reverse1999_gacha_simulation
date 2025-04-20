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
import CardInfoModal from "@/components/modals/CardInfoModal";

type ModalType = "material" | null;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/pwa_icon.png" />

        {isProd && (
          <>
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
          </>
        )}
      </head>
      <body>
        <DarkModeProvider>
          <SecurityWrapper>
            <HamburgerConditional onModalOpen={(type) => setActiveModal(type as ModalType)} />
            <CustomCursor />
            <SpeedInsights />
            <Analytics />
            {children}
          </SecurityWrapper>

          {activeModal === "material" && (
            <CardInfoModal
              isOpen={true}
              onClose={closeModal}
              title="재료 파밍표"
              image="/infos/modal_img/material_sheet.png"
              source="https://bbs.nga.cn/read.php?tid=41840172&rand=968"
            />
          )}
        </DarkModeProvider>
      </body>
    </html>
  );
}