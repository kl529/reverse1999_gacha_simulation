import { motion } from "framer-motion";
import { Character } from "../data/characters";
import Image from "next/image";

interface Props {
  results: Character[];
}

export default function GachaResults({ results }: Props) {
  const displayResults = results.length === 1 
    ? Array(10).fill(null).map((_, index) => index === 0 ? results[0] : null)
    : results.slice(0, 10);

  return (
    <div
      className="
        grid
        w-full
        min-h-[600px] 
        gap-4
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        auto-rows-fr  /* 각 행(row)의 높이를 균등 분배 */
        items-stretch /* 카드가 늘어나도록 설정 */
      "
    >
      {displayResults.map((char, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: char ? 1 : 0 }}
          className={`
            relative w-full aspect-[3/4] /* 세로 4 : 가로 3 비율 유지 */
            rounded overflow-hidden shadow-lg
            min-h-[160px] md:min-h-[200px] /* 작은 화면에서도 적절한 높이 유지 */
            ${char ? "" : "opacity-0"}
          `}
        >
          {/* (1) 캐릭터 이미지 */}
          {char && (
            <Image
              src={`/characters/${char.rarity}stars/${char.engName}.png`}
              alt={char.name}
              width={200}  // 고정 크기 사용
              height={266} // 3:4 비율 유지
              objectFit="contain" // 📌 이미지가 비율 유지하면서 다 보이게 함
              className="absolute inset-0"
            />
          )}

          {/* (2) 별 효과 */}
          {char && (
            <Image
              src={`/infos/effects/${char.rarity}stars.png`}
              alt={`성급 효과 ${char.rarity}`}
              width={200}
              height={266}
              objectFit="contain"
              className="absolute inset-0 z-10 pointer-events-none w-full h-full"
            />
          )}

          {/* (3) 이름 */}
          {char && (
            <p className="absolute bottom-2 w-full text-center text-white font-semibold z-30"
              style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>
              {char.name}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}