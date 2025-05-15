"use client";

import Image from "next/image";
import { pathQuizList } from "@/data/path_quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PathQuiz() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 mt-8 text-center text-2xl font-bold text-black dark:text-white lg:text-3xl">
          오솔길 정답 모음
        </h1>

        <Accordion type="single" collapsible className="space-y-4">
          {pathQuizList.map((quiz, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="w-full rounded-lg bg-white p-4 dark:bg-gray-800"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-black dark:text-white">
                {index + 1}. {quiz.question}
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden">
                <div className="mt-4 flex min-h-[200px] w-full flex-col items-center gap-4">
                  {quiz.answerImage && (
                    <Image
                      src={quiz.answerImage}
                      alt="정답 이미지"
                      width={600}
                      height={400}
                      className="w-full max-w-[600px] rounded-lg object-contain"
                    />
                  )}
                  <p className="whitespace-pre-line text-center text-sm text-black dark:text-gray-300">
                    {quiz.answerDescription}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-center">
          <a
            className="mt-8 text-center text-sm text-black text-blue-500 hover:text-blue-600 dark:text-gray-300"
            href="https://arca.live/b/arcalivebreverse/98040001"
            target="_blank"
            rel="noopener noreferrer"
          >
            오솔길 해설 모음 링크
          </a>
        </div>
      </div>
    </div>
  );
}
