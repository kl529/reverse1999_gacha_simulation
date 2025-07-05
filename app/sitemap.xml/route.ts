// 정적 생성으로 변경하여 Edge 요청 줄이기
import { NextResponse } from "next/server";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import { characterSkin } from "@/data/character_skin";
import { euphoriaList } from "@/data/euphoria";
import { psycube_list } from "@/data/psycube_data";
import { characterGuideList } from "@/data/character_guide";

// 정적 생성 강제
export const dynamic = 'force-static';
export const revalidate = 86400; // 24시간마다 재생성

export async function GET() {
  const baseUrl = "https://www.reverse1999-simulator.com";
  const staticUrls = [
    "/",
    "/gacha_simulator",
    "/character_quiz",
    "/character_setting",
    "/character",
    "/skin",
    "/path_quiz",
    "/future_insight",
    "/euphoria_guide",
    "/blueprint_setting",
    "/recommend_team",
    "/cash_guide",
    "/bingo",
    "/psycube_guide",
    "/calendar",
  ].map((path) => `${baseUrl}${path}`);

  const characterSettingUrls = SETTING_CHARACTERS.map(
    (c) => `${baseUrl}/character_setting/${c.id}`
  );

  const characterSkinUrls = characterSkin.map((c) => `${baseUrl}/skin/${c.id}`);

  const euphoriaGuideUrls = euphoriaList.map((e) => `${baseUrl}/euphoria_guide/${e.id}`);

  const psycubeGuideUrls = psycube_list.map((p) => `${baseUrl}/psycube_guide/${p.id}`);

  const characterGuideUrls = characterGuideList.map(
    (c) => `${baseUrl}/character/${c.character_id}`
  );

  const urls = [
    ...staticUrls,
    ...characterSettingUrls,
    ...characterSkinUrls,
    ...euphoriaGuideUrls,
    ...psycubeGuideUrls,
    ...characterGuideUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400"
    },
  });
}
