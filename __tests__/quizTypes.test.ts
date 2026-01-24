import {
  isMultipleChoiceQuestion,
  isImageTextInputQuestion,
  isTextInputQuestion,
  isTrueFalseQuestion,
  Question,
} from "@/lib/types/quizTypes";

describe("Quiz Type Guards", () => {
  // Mock questions for testing
  const multipleChoiceQuestion: Question = {
    id: "q1",
    type: "multiple_choice",
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: 1,
  };

  const imageTextInputQuestion: Question = {
    id: "q2",
    type: "image_text_input",
    question: "What character is shown in the image?",
    image: "/images/test.webp",
    correctAnswers: ["드루비스", "Druvis III", "druvis"],
  };

  const textInputQuestion: Question = {
    id: "q3",
    type: "text_input",
    question: "Name the main protagonist",
    correctAnswers: ["버투퍼", "Vertin"],
    hint: "The main character",
  };

  const trueFalseQuestion: Question = {
    id: "q4",
    type: "true_false",
    question: "Is Druvis a 6-star character?",
    correctAnswer: true,
  };

  describe("isMultipleChoiceQuestion", () => {
    it("returns true for multiple_choice type questions", () => {
      expect(isMultipleChoiceQuestion(multipleChoiceQuestion)).toBe(true);
    });

    it("returns false for image_text_input type questions", () => {
      expect(isMultipleChoiceQuestion(imageTextInputQuestion)).toBe(false);
    });

    it("returns false for text_input type questions", () => {
      expect(isMultipleChoiceQuestion(textInputQuestion)).toBe(false);
    });

    it("returns false for true_false type questions", () => {
      expect(isMultipleChoiceQuestion(trueFalseQuestion)).toBe(false);
    });
  });

  describe("isImageTextInputQuestion", () => {
    it("returns true for image_text_input type questions", () => {
      expect(isImageTextInputQuestion(imageTextInputQuestion)).toBe(true);
    });

    it("returns false for multiple_choice type questions", () => {
      expect(isImageTextInputQuestion(multipleChoiceQuestion)).toBe(false);
    });

    it("returns false for text_input type questions", () => {
      expect(isImageTextInputQuestion(textInputQuestion)).toBe(false);
    });

    it("returns false for true_false type questions", () => {
      expect(isImageTextInputQuestion(trueFalseQuestion)).toBe(false);
    });
  });

  describe("isTextInputQuestion", () => {
    it("returns true for text_input type questions", () => {
      expect(isTextInputQuestion(textInputQuestion)).toBe(true);
    });

    it("returns false for multiple_choice type questions", () => {
      expect(isTextInputQuestion(multipleChoiceQuestion)).toBe(false);
    });

    it("returns false for image_text_input type questions", () => {
      expect(isTextInputQuestion(imageTextInputQuestion)).toBe(false);
    });

    it("returns false for true_false type questions", () => {
      expect(isTextInputQuestion(trueFalseQuestion)).toBe(false);
    });
  });

  describe("isTrueFalseQuestion", () => {
    it("returns true for true_false type questions", () => {
      expect(isTrueFalseQuestion(trueFalseQuestion)).toBe(true);
    });

    it("returns false for multiple_choice type questions", () => {
      expect(isTrueFalseQuestion(multipleChoiceQuestion)).toBe(false);
    });

    it("returns false for image_text_input type questions", () => {
      expect(isTrueFalseQuestion(imageTextInputQuestion)).toBe(false);
    });

    it("returns false for text_input type questions", () => {
      expect(isTrueFalseQuestion(textInputQuestion)).toBe(false);
    });
  });
});
