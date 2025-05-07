import { NextResponse } from "next/server";
import { SETTING_CHARACTERS } from "@/data/setting_character";

export async function GET() {
  const baseUrl = "https://www.reverse1999-simulator.com";
  const staticUrls = ["/", "/gacha_simulator", "/character_quiz", "/character_setting", "/skin", "/path_quiz"];

  const characterUrls = SETTING_CHARACTERS.map(
    (c) => `${baseUrl}/character_setting/${c.id}`
  );

  const urls = [...staticUrls, ...characterUrls];

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