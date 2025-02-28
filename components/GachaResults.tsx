import { motion } from "framer-motion";
import { Character } from "../data/characters";
import Image from "next/image";

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
        min-h-[600px]
        gap-4
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        auto-rows-fr   /* 각 행(row)의 높이를 균등 분배 */
        items-stretch  /* 그리드 아이템(카드)을 세로로 늘려줌 */
      "
    >
      {displayResults.map((char, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: char ? 1 : 0 }}
          className={`
            relative w-[160px] h-full
            rounded overflow-hidden shadow-lg 
            ${char ? "" : "opacity-0"}
          `}
        >
          {/* (1) 메인 이미지 */}
          {char && (
            <div className="absolute inset-0">
              <Image
                src={`/characters/${char.rarity}stars/${char.engName}.png`}
                alt={char.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          {/* (2) 별 효과 */}
          {char && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <Image
                src={`/infos/effects/${char.rarity}stars.png`}
                alt={`성급 효과 ${char.rarity}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          {/* (3) 이름 */}
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