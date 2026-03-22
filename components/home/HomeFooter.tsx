"use client";

import Link from "next/link";

export interface HomeFooterProps {
  onPolicyClick: () => void;
  onSourceClick: () => void;
  onContributorsClick: () => void;
  onUpdateClick: () => void;
}

export default function HomeFooter({
  onPolicyClick,
  onSourceClick,
  onContributorsClick,
  onUpdateClick,
}: HomeFooterProps) {

  return (
    <footer className="mt-5 flex flex-col items-center gap-2 bg-black/30 p-0 text-sm">
      <div className="flex min-h-[2rem] items-center gap-4 text-gray-200">
        <a href="mailto:jiwon803@gmail.com" className="hover:text-blue-400 hover:underline">
          문의
        </a>
        <button onClick={onPolicyClick} className="hover:text-blue-400 hover:underline">
          Policy
        </button>
        <button onClick={onSourceClick} className="hover:text-blue-400 hover:underline">
          출처
        </button>
        <button onClick={onContributorsClick} className="hover:text-blue-400 hover:underline">
          기여자
        </button>
        <Link
          href="https://buymeacoffee.com/vertin_suitcase"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 hover:underline"
        >
          커피 사주기 ☕️
        </Link>
        <button onClick={onUpdateClick} className="hover:text-blue-400 hover:underline">
          업데이트
        </button>
      </div>
    </footer>
  );
}
