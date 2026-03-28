import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://www.reverse1999-simulator.com";

/**
 * Generate locale-aware metadata for a page.
 * @param locale - Current locale (ko | en)
 * @param metadataKey - Key in metadata section of messages (e.g., "home", "gacha")
 * @param options - Additional overrides
 */
export async function generatePageMetadata(
  locale: string,
  metadataKey: string,
  options?: {
    path?: string;
    imageUrl?: string;
    imageAlt?: string;
    type?: "website" | "article";
    titleParams?: Record<string, string>;
    descriptionParams?: Record<string, string>;
  }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteName = t("siteName");

  const title = options?.titleParams
    ? t(
        `${metadataKey}.title` as Parameters<typeof t>[0],
        options.titleParams as Record<string, string>
      )
    : t(`${metadataKey}.title` as Parameters<typeof t>[0]);

  const description = options?.descriptionParams
    ? t(
        `${metadataKey}.description` as Parameters<typeof t>[0],
        options.descriptionParams as Record<string, string>
      )
    : t(`${metadataKey}.description` as Parameters<typeof t>[0]);

  const ogDescription = (() => {
    try {
      return options?.descriptionParams
        ? t(
            `${metadataKey}.ogDescription` as Parameters<typeof t>[0],
            options.descriptionParams as Record<string, string>
          )
        : t(`${metadataKey}.ogDescription` as Parameters<typeof t>[0]);
    } catch {
      return description;
    }
  })();

  const imageUrl = options?.imageUrl || `/infos/link_img/home_link_img.webp`;
  const imageAlt = (() => {
    try {
      return t(`${metadataKey}.imageAlt` as Parameters<typeof t>[0]);
    } catch {
      return `${title}`;
    }
  })();

  const pageUrl = options?.path ? `${BASE_URL}/${locale}${options.path}` : `${BASE_URL}/${locale}`;

  const alternateLocale = locale === "ko" ? "en" : "ko";
  const alternatePath = options?.path
    ? `${BASE_URL}/${alternateLocale}${options.path}`
    : `${BASE_URL}/${alternateLocale}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    icons: { icon: "/pwa_icon.webp" },
    manifest: "/manifest.json",
    alternates: {
      canonical: pageUrl,
      languages: {
        ko: locale === "ko" ? pageUrl : alternatePath,
        en: locale === "en" ? pageUrl : alternatePath,
      },
    },
    openGraph: {
      title,
      description: ogDescription,
      url: pageUrl,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      type: options?.type || "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? "en_US" : "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
      images: [imageUrl],
    },
  };
}
