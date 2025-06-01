import { motion } from "framer-motion";
import Image from "next/image";
import { Character } from "@/data/characters";

interface Props {
  results: Character[];
}

/**
 * GachaResults – 모바일과 데스크톱 UI 분리
 *   • 데스크톱(≥ sm): 원본 고정 폭/높이(200×303) 레이아웃 복원
 *   • 모바일(< sm): 5×2, 카드·아이콘·텍스트 축소
 */
export default function GachaResults({ results }: Props) {
  // 10칸 확보 (단일 뽑기면 첫 칸만 채움)
  const displayResults =
    results.length === 1
      ? Array(10)
          .fill(null)
          .map((_, idx) => (idx === 0 ? results[0] : null))
      : results.slice(0, 10);

  /** 카드 렌더러 */
  const renderCard = (char: Character | null, idx: number, isMobile: boolean) => {
    // 모바일 전용 크기 변수
    const iconSize = isMobile ? 60 : 80;
    const iconWidthClass = isMobile ? "w-4" : "w-5";
    const nameClasses = isMobile ? "bottom-1 text-xs" : "bottom-2 text-base";

    // 데스크톱 컨테이너 클래스(원본)
    const desktopContainer =
      "relative flex max-h-[320px] w-full max-w-[300px] flex-col items-center justify-center overflow-hidden rounded shadow-none";

    return (
      <motion.div
        key={idx}
        initial={{ opacity: 0 }}
        animate={{ opacity: char ? 1 : 0 }}
        style={
          isMobile
            ? {
                width: "var(--card-w)",
                height: "calc(var(--card-w)*1.5)",
              }
            : undefined
        }
        className={`${isMobile ? "relative flex flex-col items-center justify-center overflow-hidden rounded shadow-none" : desktopContainer} ${char ? "" : "opacity-0"}`}
      >
        {/* (1) 캐릭터 이미지 */}
        {char &&
          (isMobile ? (
            <Image
              src={`/characters/${char.rarity}stars/${char.engName}.webp`}
              alt={char.name}
              fill
              sizes="25vw"
              className="object-cover object-top"
              priority
            />
          ) : (
            <Image
              src={`/characters/${char.rarity}stars/${char.engName}.webp`}
              alt={char.name}
              width={200}
              height={303}
              priority
            />
          ))}

        {/* (2) 영감 아이콘 */}
        {char?.inspiration && (
          <Image
            src={`/infos/inspiration/${char.inspiration}.webp`}
            alt={char.inspiration}
            width={iconSize}
            height={iconSize}
            className={`absolute left-2 top-0 z-10 h-auto ${iconWidthClass}`}
            priority
          />
        )}

        {/* (3) 별 효과 오버레이 */}
        {char &&
          (isMobile ? (
            <Image
              src={`/infos/effects/${char.rarity}stars.webp`}
              alt={`성급 효과 ${char.rarity}`}
              fill
              className="pointer-events-none absolute inset-0 z-10 h-full"
              priority
            />
          ) : (
            <Image
              src={`/infos/effects/${char.rarity}stars.webp`}
              alt={`성급 효과 ${char.rarity}`}
              width={200}
              height={303}
              className="pointer-events-none absolute inset-0 z-10 h-full"
              priority
            />
          ))}

        {/* (4) 이름 */}
        {char && (
          <p
            className={`absolute z-40 w-full text-center font-semibold text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.8)] ${nameClasses}`}
          >
            {char.name}
          </p>
        )}
      </motion.div>
    );
  };

  const desktopCards = displayResults.map((c, i) => renderCard(c, i, false));
  const mobileCards = displayResults.map((c, i) => renderCard(c, i, true));

  return (
    <>
      {/* 모바일(< sm) */}
      <div className="grid w-full grid-cols-4 justify-items-center gap-2 [--card-w:calc((100vw/1.1-0.5rem)/4)] sm:hidden">
        {mobileCards}
      </div>

      {/* 데스크톱(≥ sm) – 원본 고정 사이즈 */}
      <div className="hidden w-full grid-cols-2 items-start justify-items-center gap-4 overflow-x-auto dark:bg-gray-900 sm:grid sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
        {desktopCards}
      </div>
    </>
  );
}
