"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/etc/ModalProvider";
import { HAMBURGER_MENU_CATEGORIES } from "@/lib/constants/menuItems";

type HamburgerMenuProps = {
  onModalOpen?: (type: string) => void;
};

export default function HamburgerMenu({ onModalOpen }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]); // 펼쳐진 카테고리
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const pathname = usePathname();

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title) ? prev.filter((cat) => cat !== title) : [...prev, title]
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div ref={menuRef} className="fixed left-4 top-4 z-50 flex gap-2">
      <Link
        href="/"
        aria-label="홈으로 이동"
        title="홈으로"
        onClick={() => setIsOpen(false)}
        className="grid h-10 w-10 place-items-center rounded-md border bg-white text-black transition-transform active:scale-95 dark:bg-black dark:text-white"
      >
        🏠
      </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        aria-controls="hamburger-menu"
        className="grid h-10 w-10 place-items-center rounded-md border bg-white text-black transition-transform active:scale-95 dark:bg-black dark:text-white"
      >
        ☰
      </button>

      {isOpen && (
        <nav
          id="hamburger-menu"
          role="navigation"
          aria-label="메인 메뉴"
          className="absolute left-0 top-full mt-2 w-48 rounded-md border bg-white text-black shadow-lg duration-200 animate-in fade-in zoom-in-95 slide-in-from-top-2 dark:bg-gray-900 dark:text-white sm:w-64"
        >
          <ul className="py-2">
            {HAMBURGER_MENU_CATEGORIES.map((category, categoryIndex) => {
              const isExpanded = expandedCategories.includes(category.title);

              return (
                <li key={categoryIndex}>
                  {/* 카테고리 헤더 */}
                  <button
                    onClick={() => toggleCategory(category.title)}
                    aria-expanded={isExpanded}
                    aria-label={`${category.title} ${isExpanded ? "접기" : "펼치기"}`}
                    className="flex w-full items-center justify-between px-3 py-2 text-left font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="text-sm">{category.title}</span>
                    <svg
                      className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* 카테고리 아이템들 */}
                  {isExpanded && (
                    <ul className="bg-gray-50 dark:bg-gray-950">
                      {category.items.map((item, itemIndex) => {
                        const handleClick = () => {
                          setIsOpen(false);
                          if (item.modalType) {
                            openModal(item.modalType);
                            onModalOpen?.(item.modalType);
                          }
                        };

                        if (item.href) {
                          const isExternal = item.href.startsWith("http");
                          return (
                            <li key={itemIndex}>
                              <Link
                                href={item.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-6 py-1.5 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 sm:text-sm"
                              >
                                {item.iconImg ? (
                                  <Image
                                    src={item.iconImg}
                                    alt=""
                                    width={30}
                                    height={30}
                                    className="h-6 w-6 sm:h-7 sm:w-7"
                                  />
                                ) : (
                                  <span className="text-base sm:text-lg">{item.icon}</span>
                                )}
                                <span>{item.label}</span>
                              </Link>
                            </li>
                          );
                        }

                        return (
                          <li key={itemIndex}>
                            <button
                              onClick={handleClick}
                              className="flex w-full items-center gap-3 px-6 py-1.5 text-left text-xs hover:bg-gray-200 dark:hover:bg-gray-700 sm:text-sm"
                            >
                              {item.iconImg ? (
                                <Image
                                  src={item.iconImg}
                                  alt=""
                                  width={30}
                                  height={30}
                                  className="h-6 w-6 sm:h-7 sm:w-7"
                                />
                              ) : (
                                <span className="text-base sm:text-lg">{item.icon}</span>
                              )}
                              <span>{item.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* 카테고리 구분선 (마지막 카테고리 제외) */}
                  {categoryIndex < HAMBURGER_MENU_CATEGORIES.length - 1 && (
                    <hr className="mx-3 my-1 h-px border-0 bg-gray-300 dark:bg-gray-700" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
