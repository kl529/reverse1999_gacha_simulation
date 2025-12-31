/**
 * Cloudflare Worker - R2 Public Access
 *
 * R2 버킷을 퍼블릭하게 만드는 Worker 스크립트
 *
 * 배포 방법:
 * 1. Cloudflare 대시보드 > Workers & Pages
 * 2. Create Application > Create Worker
 * 3. 이 코드 붙여넣기
 * 4. Deploy
 * 5. Settings > Variables > R2 Bucket Bindings 추가
 *    - Variable name: BUCKET
 *    - R2 bucket: reverse1999-assets
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1); // Remove leading '/'

    // CORS 헤더
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // OPTIONS 요청 처리 (CORS preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // GET, HEAD 요청만 허용
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    // 루트 경로 처리
    if (!key) {
      return new Response("R2 Public Access", {
        headers: {
          "Content-Type": "text/plain",
          ...corsHeaders,
        },
      });
    }

    try {
      // R2에서 객체 가져오기
      const object = await env.BUCKET.get(key);

      if (object === null) {
        return new Response("Object Not Found", {
          status: 404,
          headers: corsHeaders,
        });
      }

      // 캐시 헤더 설정
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);

      // CORS 헤더 추가
      Object.entries(corsHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

      // 이미지 캐싱 (1년)
      if (object.httpMetadata?.contentType?.startsWith("image/")) {
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        headers.set("Cache-Control", "public, max-age=3600");
      }

      return new Response(object.body, {
        headers,
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
