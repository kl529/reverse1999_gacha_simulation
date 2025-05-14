"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CardInfoModal({
  isOpen,
  onClose,
  title,
  image,
  source,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  source?: string;
  description?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 text-black shadow-xl dark:bg-gray-900 dark:text-white"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-3xl text-black transition hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* 제목 */}
        <h2 className="mb-6 text-center text-2xl font-bold">{title}</h2>

        {/* 이미지 */}
        <div className="mb-6 flex w-full justify-center">
          <Image
            key={image}
            src={image}
            alt={title}
            unoptimized
            width={600}
            height={600}
            className="rounded-lg object-contain"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        {/* 설명 */}
        {description && (
          <p className="mb-6 whitespace-pre-wrap px-1 text-sm leading-relaxed">{description}</p>
        )}

        {/* 출처 */}
        {source && (
          <p className="text-right text-xs text-gray-400 dark:text-gray-300">
            출처:{" "}
            <a href={source} target="_blank" rel="noopener noreferrer" className="underline">
              {source}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
