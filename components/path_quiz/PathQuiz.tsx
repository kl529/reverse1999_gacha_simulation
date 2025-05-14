"use client";

import { useState } from "react";
import Image from "next/image";
import { pathQuizList } from "@/data/path_quiz";

export default function PathQuiz() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 mt-8 text-center text-2xl font-bold text-black dark:text-white lg:text-3xl">
          오솔길 정답 모음
        </h1>

        <div className="space-y-6">
          {pathQuizList.map((quiz, index) => (
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
