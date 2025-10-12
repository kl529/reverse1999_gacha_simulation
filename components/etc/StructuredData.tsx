/**
 * JSON-LD 구조화된 데이터 컴포넌트
 * Google과 다른 검색엔진에 구조화된 정보를 제공하여 SEO를 개선합니다.
 */

interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

interface VideoGameSchema {
  "@context": "https://schema.org";
  "@type": "VideoGame";
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  image?: string;
}

interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
}

type Schema = WebsiteSchema | VideoGameSchema | ArticleSchema;

interface StructuredDataProps {
  data: Schema;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

// 홈페이지용 스키마
export function WebsiteStructuredData() {
  const schema: WebsiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "버틴의 여행가방",
    url: "https://www.reverse1999-simulator.com",
    description:
      "리버스 1999 게임의 모든 정보를 한눈에 - 가챠 시뮬레이터, 캐릭터 정보, 추천 조합 등",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.reverse1999-simulator.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return <StructuredData data={schema} />;
}

// 게임 정보용 스키마
export function VideoGameStructuredData() {
  const schema: VideoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Reverse: 1999",
    description: "새로운 구시대, 아방가르드 RPG",
    url: "https://reverse1999.haoplay.com/",
    applicationCategory: "Game",
    operatingSystem: "iOS, Android, PC",
    image: "https://www.reverse1999-simulator.com/infos/link_img/home_link_img.webp",
  };

  return <StructuredData data={schema} />;
}

// 아티클/가이드용 스키마
export function ArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const schema: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    author: {
      "@type": "Organization",
      name: "버틴의 여행가방",
    },
    publisher: {
      "@type": "Organization",
      name: "버틴의 여행가방",
      logo: {
        "@type": "ImageObject",
        url: "https://www.reverse1999-simulator.com/pwa_icon.webp",
      },
    },
    datePublished,
    dateModified,
  };

  return <StructuredData data={schema} />;
}
