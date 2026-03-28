"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/etc/ModalProvider";
import { HAMBURGER_MENU_CATEGORIES } from "@/lib/constants/menuItems";
import { analytics } from "@/lib/posthog";

type HamburgerMenuProps = {
  onModalOpen?: (type: string) => void;
};

export default function HamburgerMenu({ onModalOpen }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]); // 펼쳐진 카테고리
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const pathname = usePathname();
  const t = useTranslations("nav");

  // 현재 경로가 속한 카테고리 찾기
  const findActiveCategoryTitle = () => {
    for (const category of HAMBURGER_MENU_CATEGORIES) {
      const hasActiveItem = category.items.some(
        (item) => item.href && item.href !== "#" && pathname.startsWith(item.href)
      );
      if (hasActiveItem) {
        return category.title;
      }
    }
    return null;
  };

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

  // 메뉴가 열릴 때 활성 카테고리만 펼치기 (다른 것은 닫기)
  useEffect(() => {
    if (isOpen) {
      const activeCategory = findActiveCategoryTitle();
      if (activeCategory) {
        setExpandedCategories([activeCategory]);
      } else {
        setExpandedCategories([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const getCategoryLabel = (category: (typeof HAMBURGER_MENU_CATEGORIES)[number]) => {
    if (category.titleKey) {
      return t(`categories.${category.titleKey}`);
    }
    return category.title;
  };

  const getItemLabel = (item: (typeof HAMBURGER_MENU_CATEGORIES)[number]["items"][number]) => {
    if (item.labelKey) {
      return t(`items.${item.labelKey}`);
    }
    return item.label;
  };

  return (
    <div ref={menuRef} className="fixed left-4 top-4 z-50 flex gap-2">
      <Link
        href="/"
        aria-label={t("home")}
        title={t("homeShort")}
        onClick={() => setIsOpen(false)}
        className="grid h-10 w-10 place-items-center rounded-md border bg-white text-black transition-transform active:scale-95 dark:bg-black dark:text-white"
      >
        🏠
      </Link>

      <button
        onClick={() => {
          const newState = !isOpen;
          setIsOpen(newState);
          if (newState) {
            // 메뉴 열림 추적
            analytics.userBehavior.menuOpened();
          }
        }}
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
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
          aria-label={t("mainMenu")}
          className="absolute left-0 top-full mt-2 w-48 rounded-md border bg-white text-black shadow-lg duration-200 animate-in fade-in zoom-in-95 slide-in-from-top-2 dark:bg-gray-900 dark:text-white sm:w-64"
        >
          <ul className="py-2">
            {HAMBURGER_MENU_CATEGORIES.map((category, categoryIndex) => {
              const isExpanded = expandedCategories.includes(category.title);
              const categoryLabel = getCategoryLabel(category);

              return (
                <li key={categoryIndex}>
                  {/* 카테고리 헤더 */}
                  <button
                    onClick={() => toggleCategory(category.title)}
                    aria-expanded={isExpanded}
                    aria-label={`${categoryLabel} ${isExpanded ? t("collapse") : t("expand")}`}
                    className="flex w-full items-center justify-between px-3 py-2 text-left font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="text-sm">{categoryLabel}</span>
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
                        const itemLabel = getItemLabel(item);
                        const handleClick = () => {
                          setIsOpen(false);
                          if (item.modalType) {
                            openModal(item.modalType);
                            onModalOpen?.(item.modalType);
                          }
                        };

                        if (item.href) {
                          const isExternal = item.href.startsWith("http");
                          const isDisabled = item.disabled || item.href === "#";

                          if (isDisabled) {
                            return (
                              <li key={itemIndex}>
                                <div className="flex cursor-not-allowed items-center gap-3 px-6 py-1.5 text-xs opacity-50 sm:text-sm">
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
                                  <span>{itemLabel}</span>
                                </div>
                              </li>
                            );
                          }

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
                                <span>{itemLabel}</span>
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
                              <span>{itemLabel}</span>
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
