"use client";

import {
  Question,
  isMultipleChoiceQuestion,
  isImageTextInputQuestion,
  isTextInputQuestion,
  isTrueFalseQuestion,
} from "@/lib/types/quizTypes";
import MultipleChoice from "./MultipleChoice";
import ImageTextInput from "./ImageTextInput";
import TextInput from "./TextInput";
import TrueFalse from "./TrueFalse";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  userAnswer: number | string | boolean | null;
  onAnswer: (answer: number | string | boolean) => void;
  onSubmit?: () => void;
  showResult?: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  userAnswer,
  onAnswer,
  onSubmit,
  showResult = false,
  isCorrect = false,
  disabled = false,
}: QuestionCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl overflow-hidden rounded-2xl border border-purple-300 bg-white shadow-2xl backdrop-blur-xl dark:border-purple-500/20 dark:bg-gray-900/60"
    >
      {/* 진행바 */}
      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800">
        <motion.div
  className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_100%]"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            backgroundPosition: ["0% 50%", "100% 50%"]
          }}
          transition={{ 
            width: { duration: 0.5 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        {/* 문제 컨텐츠 */}
        <div className="min-h-[250px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isMultipleChoiceQuestion(question) && (
                <MultipleChoice
                  question={question}
                  selectedAnswer={typeof userAnswer === "number" ? userAnswer : null}
                  onAnswer={(answer) => onAnswer(answer)}
                  showResult={showResult}
                  disabled={disabled}
                />
              )}

              {isImageTextInputQuestion(question) && (
                <ImageTextInput
                  question={question}
                  userAnswer={typeof userAnswer === "string" ? userAnswer : ""}
                  onAnswer={(answer) => onAnswer(answer)}
                  onSubmit={onSubmit || (() => {})}
                  showResult={showResult}
                  isCorrect={isCorrect}
                  disabled={disabled}
                />
              )}

              {isTextInputQuestion(question) && (
                <TextInput
                  question={question}
                  userAnswer={typeof userAnswer === "string" ? userAnswer : ""}
                  onAnswer={(answer) => onAnswer(answer)}
                  onSubmit={onSubmit || (() => {})}
                  showResult={showResult}
                  isCorrect={isCorrect}
                  disabled={disabled}
                />
              )}

              {isTrueFalseQuestion(question) && (
                <TrueFalse
                  question={question}
                  selectedAnswer={typeof userAnswer === "boolean" ? userAnswer : null}
                  onAnswer={(answer) => onAnswer(answer)}
                  showResult={showResult}
                  disabled={disabled}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
