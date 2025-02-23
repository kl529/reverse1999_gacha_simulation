import { motion } from "framer-motion";
import { Character } from "../data/characters";

interface Props {
  results: Character[];
}

export default function GachaResults({ results }: Props) {
  const displayResults = results.length === 1 
  ? Array(10).fill(null).map((_, index) => index === 2 ? results[0] : null)
  : results.slice(0, 10);

  return (
    <div
      className="
        grid
        w-full
        h-full
        min-h-[600px]      /* 최소 높이 유지 */
        gap-x-4 gap-y-6    /* 가로, 세로 간격을 균형 있게 조정 */
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        place-items-center
      "
    >
      {displayResults.map((char, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: char ? 1 : 0 }}  // 빈 슬롯일 경우 투명
          className={`
            relative w-full h-full rounded overflow-hidden shadow-lg
            flex flex-col justify-between
            ${char ? "" : "opacity-0"}  // 빈 슬롯이면 투명도 적용
          `}
        >
          {/* (1) 캐릭터 메인 이미지 (카드 전체 채우기) */}
          {char && (
            <div className="w-full h-full relative z-0">
              <img
                src={`/characters/${char.rarity}stars/${char.engName}.png`}
                alt={char.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* (2) 왼쪽 상단 영감 아이콘 */}
          {char?.inspiration && (
            <div className="absolute left-2 z-10">
              <img
                src={`/infos/inspiration/${char.inspiration}.png`}
                alt={char.inspiration}
                className="w-5 h-auto"
              />
            </div>
          )}

          {/* (3) 카드 하단 성급(별) 효과 (가로 폭 카드와 동일) */}
          {char && (
            <div className="absolute inset-0 w-full h-full z-10">
              <img
                src={`/infos/effects/${char.rarity}stars.png`}
                alt={`성급 효과 ${char.rarity}`}
                className="w-full h-full"
              />
            </div>
          )}

          {/* (4) 캐릭터 이름 (카드 하단 중앙) */}
          {char && (
            <p
              className="absolute bottom-2 w-full text-center text-white font-semibold z-30"
              style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
            >
              {char.name}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}