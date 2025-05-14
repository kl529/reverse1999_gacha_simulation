"use client";

import { useState } from "react";
import Image from "next/image";

type QuizItem = {
  question: string;
  answerImage?: string;
  answerDescription?: string;
};

const quizList: QuizItem[] = [
  {
    question: "1장-7. 신비한 유니콘",
    answerImage: "/infos/path_quiz/1_7.webp",
    answerDescription: "정답 : 조용한 레이븐 하트",
  },
  {
    question: "1장-10. 마틸다의 성적표",
    answerImage: "/infos/path_quiz/1_10.webp",
    answerDescription: "정답 : 86",
  },
  {
    question: "1장-15. 슈나이더의 언니들",
    answerImage: "/infos/path_quiz/1_15.webp",
    answerDescription: "정답 : 12",
  },
  {
    question: "2장-3. 페인트가 마르지 않은 문",
    answerImage: "/infos/path_quiz/2_3.webp",
    answerDescription: "2TH - 15 스토리 보상",
  },
  { question: "2장-4.", answerImage: "/infos/path_quiz/2_4.webp" },
  {
    question: "2장-6. 정원 오솔길의 문",
    answerImage: "/infos/path_quiz/2_6.webp",
    answerDescription: "2TH - 12 스토리 보상",
  },
  {
    question: "3장-5. 발음이 어려운 동요",
    answerImage: "/infos/path_quiz/3_5.webp",
    answerDescription: "3TH - 15 스토리 보상",
  },
  {
    question: "3장-7.",
    answerImage: "/infos/path_quiz/3_7.webp",
    answerDescription: "정답 : 바구니, 캐비닛",
  },
  {
    question: "3장-11. 당신이 아는 새끼 강아지",
    answerImage: "/infos/path_quiz/3_11.webp",
    answerDescription: "3TH - 2 오솔길 보상",
  },
  { question: "3장-12.", answerImage: "/infos/path_quiz/3_12.webp" },
  {
    question: "3장-15. 뜻밖의 청중",
    answerImage: "/infos/path_quiz/3_15.webp",
    answerDescription: "정답 : 붉은 다람쥐와 딱따구리",
  },
  { question: "4장-6.", answerImage: "/infos/path_quiz/4_6.webp" },
  { question: "4장-10.", answerImage: "/infos/path_quiz/4_10.webp" },
  { question: "5장-4.", answerDescription: "정답 : 4년" },
  { question: "5장-9.", answerDescription: "정답 : 우 좌" },
];

export default function PathQuiz() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-black dark:text-white">
          오솔길 정답 모음
        </h1>

        <div className="space-y-6">
          {quizList.map((quiz, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg dark:bg-gray-800"
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  {index + 1}. {quiz.question}
                </h2>

                <button
                  onClick={() => toggleAnswer(index)}
                  className="self-start rounded bg-blue-500 px-3 py-1 text-xs font-bold text-white transition hover:bg-blue-600"
                >
                  {openIndex === index ? "정답 숨기기" : "정답 보기"}
                </button>

                {openIndex === index && (
                  <div className="mt-4 flex flex-col items-center gap-4">
                    {quiz.answerImage && (
                      <Image
                        src={quiz.answerImage}
                        alt="정답 이미지"
                        width={600}
                        height={400}
                        className="rounded-lg object-contain"
                      />
                    )}
                    <p className="whitespace-pre-line text-center text-sm text-black dark:text-gray-300">
                      {quiz.answerDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-black dark:text-gray-300">
          오솔길 해설 모음 :{" "}
          <a
            href="https://arca.live/b/arcalivebreverse/98040001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            https://arca.live/b/arcalivebreverse/98040001
          </a>
        </p>
      </div>
    </div>
  );
}
