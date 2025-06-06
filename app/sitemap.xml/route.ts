import { NextResponse } from "next/server";
import { SETTING_CHARACTERS } from "@/data/setting_character";
import { characterSkin } from "@/data/character_skin";
import { euphoriaList } from "@/data/euphoria";
export async function GET() {
  const baseUrl = "https://www.reverse1999-simulator.com";
  const staticUrls = [
    "/",
    "/gacha_simulator",
    "/character_quiz",
    "/character_setting",
    "/skin",
    "/path_quiz",
    "/future_insight",
    "/euphoria_guide",
    "/blueprint_setting",
    "/recommend_team",
    "/cash_guide",
    "/bingo",
  ].map((path) => `${baseUrl}${path}`);

  const characterSettingUrls = SETTING_CHARACTERS.map(
    (c) => `${baseUrl}/character_setting/${c.id}`
  );

  const characterSkinUrls = characterSkin.map((c) => `${baseUrl}/skin/${c.id}`);

  const euphoriaGuideUrls = euphoriaList.map((e) => `${baseUrl}/euphoria_guide/${e.id}`);

  const urls = [...staticUrls, ...characterSettingUrls, ...characterSkinUrls, ...euphoriaGuideUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
