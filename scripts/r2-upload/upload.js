/**
 * Cloudflare R2 이미지 업로드 스크립트
 *
 * 사전 준비:
 * 1. Cloudflare 대시보드에서 R2 API 토큰 생성
 *    - R2 읽기/쓰기 권한 필요
 * 2. .env 파일 생성 (scripts/r2-upload/.env)
 *
 * 실행:
 *   cd scripts/r2-upload
 *   npm install
 *   npm run upload
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { lookup } from "mime-types";
import dotenv from "dotenv";

dotenv.config();

// 환경 변수 확인
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME || "reverse1999-assets";

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
  console.error("❌ 환경 변수가 설정되지 않았습니다.");
  console.error("필요한 환경 변수:");
  console.error("  - CLOUDFLARE_ACCOUNT_ID");
  console.error("  - R2_ACCESS_KEY_ID");
  console.error("  - R2_SECRET_ACCESS_KEY");
  console.error("  - R2_BUCKET_NAME (선택)");
  process.exit(1);
}

// R2 클라이언트 설정
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// 업로드할 디렉토리 목록
const UPLOAD_DIRS = [
  "../../public/infos/character_skin",
  "../../public/infos/banner_img",
  "../../public/infos/home",
  "../../public/characters",
];

/**
 * 디렉토리 내 모든 파일 재귀적으로 가져오기
 */
function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * 파일을 R2에 업로드
 */
async function uploadFile(filePath, r2Key) {
  const fileContent = readFileSync(filePath);
  const contentType = lookup(filePath) || "application/octet-stream";

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: r2Key,
    Body: fileContent,
    ContentType: contentType,
  });

  await r2Client.send(command);
}

/**
 * 메인 업로드 함수
 */
async function main() {
  console.log("🚀 Cloudflare R2 업로드 시작...");
  console.log(`📦 버킷: ${BUCKET_NAME}`);
  console.log("");

  let totalFiles = 0;
  let uploadedFiles = 0;
  let failedFiles = 0;

  for (const dir of UPLOAD_DIRS) {
    const absolutePath = join(import.meta.dirname, dir);

    try {
      const files = getAllFiles(absolutePath);
      totalFiles += files.length;

      console.log(`📂 업로드 중: ${dir}`);
      console.log(`   파일 개수: ${files.length}`);

      for (const file of files) {
        // public/ 기준 상대 경로 생성
        const publicIndex = file.indexOf("public/");
        const r2Key = file.substring(publicIndex + 7); // 'public/' 제거

        try {
          await uploadFile(file, r2Key);
          uploadedFiles++;

          // 진행률 표시
          if (uploadedFiles % 10 === 0) {
            console.log(
              `   진행: ${uploadedFiles}/${totalFiles} (${Math.round((uploadedFiles / totalFiles) * 100)}%)`
            );
          }
        } catch (error) {
          failedFiles++;
          console.error(`   ❌ 실패: ${r2Key}`, error.message);
        }
      }

      console.log(`   ✅ 완료: ${dir}`);
      console.log("");
    } catch (error) {
      console.error(`⚠️  디렉토리 오류: ${dir}`, error.message);
    }
  }

  console.log("🎉 업로드 완료!");
  console.log(`✅ 성공: ${uploadedFiles}/${totalFiles}`);
  if (failedFiles > 0) {
    console.log(`❌ 실패: ${failedFiles}`);
  }
  console.log("");
  console.log("다음 단계:");
  console.log(`1. R2 버킷에서 퍼블릭 액세스 활성화`);
  console.log(`2. 환경 변수에 CDN URL 추가:`);
  console.log(`   NEXT_PUBLIC_CDN_URL=https://${BUCKET_NAME}.r2.dev`);
  console.log(`3. 코드에서 이미지 경로 수정`);
}

main().catch(console.error);
