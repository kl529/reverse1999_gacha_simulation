"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

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
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

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
            className="cursor-pointer rounded-lg object-contain transition-transform hover:scale-105"
            style={{
              width: "100%",
              height: "auto",
            }}
            onClick={() => setIsImageEnlarged(true)}
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

      {/* 이미지 확대 모달 */}
      {isImageEnlarged && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsImageEnlarged(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            onClick={() => setIsImageEnlarged(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={image}
              alt={`확대된 ${title}`}
              width={1200}
              height={1600}
              className="h-auto max-h-[90vh] w-auto max-w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
