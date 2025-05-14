import { motion } from "framer-motion";
import Image from "next/image";
import { Character } from "@/data/characters";

interface Props {
  results: Character[];
}

export default function GachaResults({ results }: Props) {
  // 단일 뽑기 시 첫 칸만 캐릭터, 나머지는 빈칸
  const displayResults =
    results.length === 1
      ? Array(10)
          .fill(null)
          .map((_, index) => (index === 0 ? results[0] : null))
      : results.slice(0, 10);

  return (
    <div className="/* 필요하다면 여기서 또는 등 추가 가능 */ grid w-full max-w-[] grid-cols-2 items-start justify-items-center gap-4 overflow-x-auto dark:bg-gray-900 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
      {displayResults.map((char, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: char ? 1 : 0 }}
          className={`relative flex max-h-[320px] w-full max-w-[300px] flex-col items-center justify-center overflow-hidden rounded shadow-none ${char ? "" : "opacity-0"} `}
        >
          {/* (1) 캐릭터 이미지 */}
          {char && (
            <Image
              src={`/characters/${char.rarity}stars/${char.engName}.png`}
              alt={char.name}
              width={200} // 최대 폭 200
              height={303} // 최대 높이 303
              objectFit="contain" /* 폭이 줄어들어도 비율 유지 */
            />
          )}

          {/* (2) 왼쪽 상단 영감 아이콘 */}
          {char?.inspiration && (
            <div className="absolute left-3 top-0 z-10">
              <Image
                src={`/infos/inspiration/${char.inspiration}.png`}
                alt={char.inspiration}
                width={80}
                height={80}
                layout="intrinsic"
                className="h-auto w-5"
              />
            </div>
          )}

          {/* (3) 별 효과 (캐릭터 이미지 아래에 깔기) */}
          {char && (
            <Image
              src={`/infos/effects/${char.rarity}stars.png`}
              alt={`성급 효과 ${char.rarity}`}
              width={200}
              height={303}
              objectFit="contain"
              className="pointer-events-none absolute inset-0 z-10 mx-auto h-full"
            />
          )}

          {/* (4) 이름 (별 효과와 이미지 위에) */}
          {char && (
            <p
              className="absolute bottom-2 z-40 w-full text-center font-semibold text-white"
              style={{ textShadow: "0 0 4px rgba(0,0,0,0.8)" }}
            >
              {char.name}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
