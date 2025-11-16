import Image from "next/image";
import Link from "next/link";

export interface LinkBoxProps {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function LinkBox({ icon, label, href, onClick }: LinkBoxProps) {
  const isExternal = href?.startsWith("http");
  const content = (
    <div className="flex flex-col items-center p-2 transition-transform hover:scale-105">
      <Image
        src={icon}
        alt={label}
        width={48}
        height={48}
        loading="lazy"
        className="h-12 w-12 object-contain"
      />
      <p className="mt-1 whitespace-nowrap text-center text-xs text-white dark:text-gray-100 sm:text-sm">
        {label.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    </div>
  );

  if (!href || href === "#")
    return <button onClick={onClick}>{content}</button>;
  if (isExternal)
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </Link>
    );
  return (
    <Link href={href} onClick={onClick}>
      {content}
    </Link>
  );
}
