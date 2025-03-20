// ✅ components/InstallPrompt.tsx
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt(); // 유저에게 설치 팝업 노출
    await promptEvent.userChoice; // outcome ('accepted' or 'dismissed')
    setPromptEvent(null); // ✅ 설치 후 prompt 제거
  };

  if (!promptEvent) return null; // ✅ prompt가 없으면 UI 숨김

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded shadow-lg flex items-center space-x-3">
      <p className="text-sm">앱을 설치하시겠습니까?</p>
      <button onClick={handleInstallClick} className="bg-green-500 px-3 py-1 rounded text-sm hover:bg-green-600">
        설치하기
      </button>
    </div>
  );
}