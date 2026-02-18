"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  List,
} from "lucide-react";
import {
  contentGuideData,
  CONTENT_CATEGORIES,
  YoutubeVideo,
} from "@/data/content_guide";

const COLOR_MAP: Record<string, { badge: string; text: string }> = {
  purple: {
    badge: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
  },
  orange: {
    badge: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
  },
  blue: {
    badge: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
};

function VideoList({ videos }: { videos: YoutubeVideo[] }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <p className="rounded-md bg-yellow-50 p-2.5 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 sm:text-sm">
        영상은 제작 당시 버전 기준의 공략이며, 현재 버전과 다를 수 있습니다.
        정답이 아닌 참고용으로 활용해 주세요.
      </p>
      {videos.map((video) => (
        <div key={video.id}>
          <h3 className="mb-1.5 text-sm font-medium sm:mb-2 sm:text-base">
            {video.title}
          </h3>
          <div className="relative w-full overflow-hidden rounded-lg pb-[56.25%]">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CollapsibleSection({
  title,
  subtitle,
  defaultOpen,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="border border-gray-300">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between p-4 text-left sm:p-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold sm:text-2xl">{title}</h2>
              {subtitle && (
                <span className="text-xs text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

interface ContentGuideDetailProps {
  contentId: string;
}

export default function ContentGuideDetail({
  contentId,
}: ContentGuideDetailProps) {
  const router = useRouter();
  const content = contentGuideData[contentId];

  if (!content) {
    return <div>컨텐츠 정보를 찾을 수 없습니다.</div>;
  }

  const allItems = Object.values(contentGuideData);
  const sameCategoryItems = allItems.filter(
    (item) => item.category === content.category
  );
  const currentIndex = sameCategoryItems.findIndex(
    (item) => item.id === contentId
  );
  const prevItem =
    currentIndex > 0 ? sameCategoryItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < sameCategoryItems.length - 1
      ? sameCategoryItems[currentIndex + 1]
      : null;

  const categoryInfo = CONTENT_CATEGORIES.find(
    (c) => c.id === content.category
  );
  const colors = categoryInfo
    ? COLOR_MAP[categoryInfo.color] || COLOR_MAP.purple
    : COLOR_MAP.purple;

  const handleContentChange = (value: string) => {
    router.push(`/content_guide/${value}`);
  };

  const hasSubContent = content.subContent && content.subContent.length > 0;
  const hasHiddenEnding =
    content.hiddenEndings && content.hiddenEndings.length > 0;

  return (
    <div className="mt-6 flex min-h-screen w-full flex-col items-center bg-white p-3 dark:bg-gray-900 dark:text-gray-200 sm:mt-10 sm:p-4">
      {/* 헤더 섹션 */}
      <div className="mb-5 w-full max-w-4xl sm:mb-8">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h1 className="text-center text-xl font-bold text-black dark:text-gray-100 sm:text-2xl lg:text-3xl">
            {content.name}
          </h1>

          <div className="grid grid-cols-1 gap-2">
            <Select value={contentId} onValueChange={handleContentChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="컨텐츠 선택" />
              </SelectTrigger>
              <SelectContent>
                {allItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.id === contentId ? (
                      <span className="font-bold">{item.name}</span>
                    ) : (
                      item.name
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                className="sm:size-default"
                onClick={() =>
                  prevItem && router.push(`/content_guide/${prevItem.id}`)
                }
                disabled={!prevItem}
              >
                <ChevronLeft className="mr-1 h-4 w-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">이전</span>
              </Button>
              <Link href="/content_guide">
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:size-default w-full"
                >
                  <List className="mr-1 h-4 w-4 sm:mr-2" />
                  <span className="text-xs sm:text-sm">목록</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="sm:size-default"
                onClick={() =>
                  nextItem && router.push(`/content_guide/${nextItem.id}`)
                }
                disabled={!nextItem}
              >
                <span className="text-xs sm:text-sm">다음</span>
                <ChevronRight className="ml-1 h-4 w-4 sm:ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-5 sm:space-y-8">
        {/* 컨텐츠 설명 */}
        <Card className="border border-gray-300 p-4 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-1.5 sm:mb-4 sm:gap-2">
            <span>{categoryInfo?.icon}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium sm:text-sm ${colors.badge} ${colors.text}`}
            >
              {categoryInfo?.name}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
              {content.contentType}
            </span>
            <span className="text-xs text-muted-foreground">
              v{content.versionAdded}
            </span>
            <span className="text-xs text-muted-foreground">
              · {content.unlockCondition}
            </span>
          </div>
          <p className="text-sm sm:text-base">{content.description}</p>
        </Card>

        {/* 확장/히든엔딩이 있는 컨텐츠: Collapsible 섹션들 */}
        {(hasSubContent || hasHiddenEnding) ? (
          <>
            {/* 종합 공략 */}
            {content.youtubeVideos && content.youtubeVideos.length > 0 && (
              <CollapsibleSection title="종합 공략" defaultOpen={true}>
                <VideoList videos={content.youtubeVideos} />
              </CollapsibleSection>
            )}

            {/* 히든 엔딩 공략 */}
            {hasHiddenEnding && (
              <CollapsibleSection title="히든 엔딩 공략" defaultOpen={false}>
                <div className="space-y-6">
                  <p className="rounded-md bg-yellow-50 p-2.5 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 sm:text-sm">
                    영상은 제작 당시 버전 기준의 공략이며, 현재 버전과 다를 수 있습니다.
                    정답이 아닌 참고용으로 활용해 주세요.
                  </p>
                  {content.hiddenEndings!.map((ending, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-semibold sm:text-base">
                        {ending.name}
                      </h3>
                      {ending.description && (
                        <p className="mt-1 whitespace-pre-line text-xs text-muted-foreground sm:text-sm">
                          {ending.description}
                        </p>
                      )}
                      {ending.youtubeVideo ? (
                        <div className="mt-2">
                          <p className="mb-1.5 text-xs font-medium sm:text-sm">
                            {ending.youtubeVideo.title}
                          </p>
                          <div className="relative w-full overflow-hidden rounded-lg pb-[56.25%]">
                            <iframe
                              className="absolute left-0 top-0 h-full w-full"
                              src={`https://www.youtube.com/embed/${ending.youtubeVideo.id}`}
                              title={ending.youtubeVideo.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="mt-1 text-xs italic text-muted-foreground">
                          영상 준비중
                        </p>
                      )}
                      {index < content.hiddenEndings!.length - 1 && (
                        <div className="mt-6 border-b border-gray-200 dark:border-gray-700" />
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}

            {/* 확장팩별 공략 */}
            {hasSubContent &&
              content.subContent!.map((sub, index) => (
                <CollapsibleSection
                  key={index}
                  title={sub.name}
                  subtitle={`v${sub.versionAdded}`}
                  defaultOpen={false}
                >
                  <p className="mb-3 text-sm sm:text-base">{sub.description}</p>
                  {sub.mechanic && (
                    <p className="mb-3 text-xs text-muted-foreground sm:text-sm">
                      고유 시스템: {sub.mechanic}
                    </p>
                  )}
                  {sub.youtubeVideos && sub.youtubeVideos.length > 0 && (
                    <div className="mt-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                      <VideoList videos={sub.youtubeVideos} />
                    </div>
                  )}
                </CollapsibleSection>
              ))}
          </>
        ) : (
          /* 일반 컨텐츠: 기존 공략 영상 카드 */
          content.youtubeVideos && content.youtubeVideos.length > 0 && (
            <Card className="border border-gray-300 p-4 sm:p-6">
              <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-2xl">
                공략 영상
              </h2>
              <VideoList videos={content.youtubeVideos} />
            </Card>
          )
        )}
      </div>
    </div>
  );
}
