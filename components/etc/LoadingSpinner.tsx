"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { getHomeUrl } from "@/lib/cdn";

export default function LoadingSpinner() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image src={getHomeUrl("loading.gif")} alt={t("loading")} width={100} height={100} priority />
    </div>
  );
}
