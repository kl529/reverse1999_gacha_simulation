"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 기기 체크
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );
      setIsMobile(isMobileDevice);
    };

    checkMobile();

    const handleBeforeInstallPrompt = (e: Event) => {
      setPromptEvent(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setPromptEvent(null);
      setShowPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!promptEvent) return;

    try {
      await promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;

      if (choiceResult.outcome === "accepted") {
        setPromptEvent(null);
      }
    } catch (error) {
      console.error("Installation prompt error:", error);
    }
  };

  // 데스크톱이거나 프롬프트 이벤트가 없거나 프롬프트를 숨긴 경우 null 반환
  if (!isMobile || !promptEvent || !showPrompt) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white shadow-lg">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image src="/pwa_icon.webp" alt="pwa_icon" width={24} height={24} />
          <p className="text-sm font-medium">앱으로 설치하시겠습니까?</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstallClick}
            className="rounded-full bg-white px-4 py-1 text-sm font-medium text-blue-500 transition hover:bg-opacity-90"
          >
            설치
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="rounded-full border border-white px-4 py-1 text-sm font-medium text-white transition hover:bg-white hover:bg-opacity-10"
          >
            나중에
          </button>
        </div>
      </div>
    </div>
  );
}
