import { useEffect, useRef, useState } from "react";
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
  const imgRef = useRef<HTMLImageElement>(null);
  const [shouldExpand, setShouldExpand] = useState(false);

  // 이미지 너비 확인
  useEffect(() => {
    if (imgRef.current) {
      const imgWidth = imgRef.current.naturalWidth;
      if (imgWidth < 500) {
        setShouldExpand(true);
      }
    }
  }, [image]);

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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-full max-w-4xl relative shadow-xl max-h-[90vh] overflow-y-auto"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-300 transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* 제목 */}
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

        {/* 이미지 */}
        <div className="w-full mb-6 flex justify-center">
          <Image
            ref={imgRef}
            src={image}
            alt={title}
            unoptimized
            className={`${shouldExpand ? "w-full" : "max-w-[80%]"}`}
            style={{
              height: "auto",
            }}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        {/* 설명 */}
        {description && (
          <p className="text-sm mb-6 whitespace-pre-wrap leading-relaxed px-1">{description}</p>
        )}

        {/* 출처 */}
        {source && (
          <p className="text-xs text-gray-400 dark:text-gray-300 text-right">
            출처:{" "}
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {source}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}