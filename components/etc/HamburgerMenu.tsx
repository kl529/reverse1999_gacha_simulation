"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/etc/ModalProvider";

type MenuItem = {
  icon?: string;
  iconImg?: string;
  label?: string;
  href?: string;
  divider?: boolean;
  modalType?: "material";
};

type HamburgerMenuProps = {
  onModalOpen?: (type: string) => void;
};

export default function HamburgerMenu({ onModalOpen }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      iconImg: "/infos/menu/gacha_simulator_menu.webp",
      label: "가챠 시뮬레이터",
      href: "/gacha_simulator",
    },
    {
      iconImg: "/infos/menu/character_quiz_menu.webp",
      label: "캐릭터 퀴즈",
      href: "/character_quiz",
    },
    { iconImg: "/infos/menu/bingo_menu.webp", label: "빙고", href: "/bingo" },
    { divider: true },
    { iconImg: "/infos/menu/material_menu.webp", label: "재료 파밍", modalType: "material" },
    {
      iconImg: "/infos/menu/resonance_menu.webp",
      label: "공명 & 의지",
      href: "/character_setting",
    },
    { iconImg: "/infos/menu/skin_menu.webp", label: "스킨 갤러리", href: "/skin" },
    {
      iconImg: "/infos/menu/future_insight_menu.webp",
      label: "미래시 정리",
      href: "/future_insight",
    },
    {
      iconImg: "/infos/menu/recommend_team_menu.webp",
      label: "추천 조합",
      href: "/recommend_team",
    },
    {
      iconImg: "/infos/menu/blueprint_menu.webp",
      label: "청사진 모음",
      href: "/blueprint_setting",
    },
    {
      iconImg: "/infos/menu/calendar_menu.webp",
      label: "캘린더",
      href: "/calendar",
    },
    {
      iconImg: "/infos/menu/reveries_in_the_rain_menu.webp",
      label: "빗속의 공상",
      href: "/reveries_in_the_rain",
    },
    {
      iconImg: "/infos/menu/cash_package_shop_menu.webp",
      label: "현질 패키지",
      href: "/cash_package_shop",
    },
    {
      iconImg: "/infos/menu/shop_efficiency_menu.webp",
      label: "상점 효율 정리",
      href: "/shop_efficiency",
    },
    { divider: true },
    {
      iconImg: "/infos/menu/character_menu.webp",
      label: "캐릭터 가이드",
      href: "/character",
    },
    { iconImg: "/infos/menu/path_quiz_menu.webp", label: "오솔길 정답", href: "/path_quiz" },
    {
      iconImg: "/infos/menu/euphoria_guide_menu.webp",
      label: "광상 가이드",
      href: "/euphoria_guide",
    },
    {
      iconImg: "/infos/menu/psycube_guide_menu.webp",
      label: "의지 육성 가이드",
      href: "/psycube_guide",
    },
    { iconImg: "/infos/menu/cash_guide_menu.webp", label: "현질 가이드", href: "/cash_guide" },
    { iconImg: "/infos/menu/gacha_guide_menu.webp", label: "가챠 가이드", href: "/gacha_guide" },
  ];

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
        title="홈으로"
        onClick={() => setIsOpen(false)}
        className="grid h-10 w-10 place-items-center rounded-md border bg-white text-black dark:bg-black dark:text-white"
      >
        🏠
      </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="grid h-10 w-10 place-items-center rounded-md border bg-white text-black dark:bg-black dark:text-white"
      >
        ☰
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-48 rounded-md border bg-white text-black shadow-lg dark:bg-gray-900 dark:text-white sm:w-64">
          <ul className="py-2">
            {menuItems.map((item, index) => {
              if (item.divider) {
                return (
                  <hr key={index} className="mx-3 my-2 h-px border-0 bg-black dark:bg-gray-500" />
                );
              }

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
                  <li key={index}>
                    <Link
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 sm:text-sm"
                    >
                      {item.iconImg ? (
                        <Image
                          src={item.iconImg}
                          alt=""
                          width={30}
                          height={30}
                          className="h-6 w-6 sm:h-8 sm:w-8"
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
                <li key={index}>
                  <button
                    onClick={handleClick}
                    className="flex w-full items-center gap-3 px-3 py-1 text-left text-xs hover:bg-gray-200 dark:hover:bg-gray-700 sm:text-sm"
                  >
                    {item.iconImg ? (
                      <Image
                        src={item.iconImg}
                        alt=""
                        width={30}
                        height={30}
                        className="h-6 w-6 sm:h-8 sm:w-8"
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
        </div>
      )}
    </div>
  );
}
