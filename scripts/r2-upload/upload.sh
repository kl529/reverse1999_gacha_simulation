#!/bin/bash

# Cloudflare R2 이미지 업로드 스크립트
# 
# 사용법:
#   1. Cloudflare API 토큰 생성 (R2 읽기/쓰기 권한)
#   2. 환경 변수 설정:
#      export CLOUDFLARE_ACCOUNT_ID="your-account-id"
#      export CLOUDFLARE_API_TOKEN="your-api-token"
#      export R2_BUCKET_NAME="reverse1999-assets"
#   3. 이 스크립트 실행: ./scripts/r2-upload/upload.sh

set -e

# 환경 변수 확인
if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "❌ CLOUDFLARE_ACCOUNT_ID 환경 변수가 설정되지 않았습니다."
  exit 1
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "❌ CLOUDFLARE_API_TOKEN 환경 변수가 설정되지 않았습니다."
  exit 1
fi

if [ -z "$R2_BUCKET_NAME" ]; then
  echo "❌ R2_BUCKET_NAME 환경 변수가 설정되지 않았습니다."
  exit 1
fi

echo "🚀 Cloudflare R2 업로드 시작..."
echo "📦 버킷: $R2_BUCKET_NAME"
echo ""

# 업로드할 디렉토리 목록
UPLOAD_DIRS=(
  "public/infos/character_skin"
  "public/infos/banner_img"
  "public/infos/home"
  "public/characters"
)

# wrangler 설치 확인
if ! command -v wrangler &> /dev/null; then
  echo "📥 wrangler CLI 설치 중..."
  npm install -g wrangler
fi

echo "✅ wrangler CLI 준비 완료"
echo ""

# 각 디렉토리 업로드
for DIR in "${UPLOAD_DIRS[@]}"; do
  if [ -d "$DIR" ]; then
    echo "📂 업로드 중: $DIR"
    
    # public/ 제거하여 R2 경로 생성
    R2_PATH="${DIR#public/}"
    
    # 파일 개수 확인
    FILE_COUNT=$(find "$DIR" -type f | wc -l | xargs)
    echo "   파일 개수: $FILE_COUNT"
    
    # wrangler r2 object put 사용
    find "$DIR" -type f | while read file; do
      # public/ 제거
      RELATIVE_PATH="${file#public/}"
      
      # 파일 업로드
      wrangler r2 object put "$R2_BUCKET_NAME/$RELATIVE_PATH" \
        --file="$file" \
        --content-type="$(file -b --mime-type "$file")" \
        2>&1 | grep -v "deprecated" || true
      
      echo "   ✓ $RELATIVE_PATH"
    done
    
    echo "   ✅ 완료: $DIR"
    echo ""
  else
    echo "⚠️  디렉토리 없음: $DIR"
  fi
done

echo "🎉 모든 이미지 업로드 완료!"
echo ""
echo "다음 단계:"
echo "1. 환경 변수에 CDN URL 추가:"
echo "   NEXT_PUBLIC_CDN_URL=https://$R2_BUCKET_NAME.r2.dev"
echo "2. 코드에서 이미지 경로 수정"
