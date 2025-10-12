import { CardItem } from "@/lib/types/menuTypes";
import LinkBox from "./LinkBox";

export interface CardBoxProps {
  title: string;
  subTitle: string;
  items: CardItem[];
  onItemClick?: (item: CardItem) => void;
}

export default function CardBox({ title, subTitle, items, onItemClick }: CardBoxProps) {
  const gridColsClass =
    items.length === 2
      ? "grid-cols-2"
      : items.length === 3
        ? "grid-cols-3"
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-gray-900/60 px-4 py-5 sm:px-6 lg:px-0">
      <h3 className="mb-1 text-center text-xl font-bold">{title}</h3>
      <p className="mb-4 text-center text-sm">{subTitle}</p>
      <div
        className={`grid ${gridColsClass} h-full w-full items-center justify-center gap-2 sm:gap-3 lg:gap-4`}
      >
        {items.map((item: CardItem, idx: number) => (
          <LinkBox
            key={idx}
            icon={item.icon}
            label={item.label}
            href={item.href}
            onClick={() => "image" in item && item.image && onItemClick?.(item)}
          />
        ))}
      </div>
    </div>
  );
}
