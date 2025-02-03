"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for a quiz (unchanged)
const quizData = {
  id: 1,
  title: "JavaScript Basics",
  questions: [
    {
      id: 1,
      question: "What is the output of console.log(typeof [])?",
      options: ["array", "object", "undefined", "null"],
      userAnswer: "array",
      correctAnswer: "object",
      explanation:
        "In JavaScript, arrays are actually objects. Therefore, typeof [] returns 'object'.",
    },
    {
      id: 2,
      question: "Which method is used to add elements to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      userAnswer: "push()",
      correctAnswer: "push()",
      explanation:
        "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
    },
    {
      id: 3,
      question: "What does the '===' operator do?",
      options: [
        "Checks for equality, including type",
        "Checks for equality, not including type",
        "Assigns a value",
        "Compares greater than or equal to",
      ],
      userAnswer: "Checks for equality, including type",
      correctAnswer: "Checks for equality, including type",
      explanation:
        "The '===' operator is a strict equality operator that checks for equality without type coercion.",
    },
    {
      id: 4,
      question: "What is the result of 3 + '3' in JavaScript?",
      options: ["6", "33", "NaN", "Error"],
      userAnswer: "6",
      correctAnswer: "33",
      explanation:
        "When you use the + operator with a string, it performs concatenation. So 3 + '3' results in the string '33'.",
    },
    {
      id: 5,
      question:
        "Which keyword is used to declare a variable that can't be reassigned?",
      options: ["var", "let", "const", "final"],
      userAnswer: "const",
      correctAnswer: "const",
      explanation:
        "The 'const' keyword is used to declare variables that cannot be reassigned. However, for objects and arrays, the properties or elements can still be modified.",
    },
  ],
};

export default function QuizAnalysisPage() {
  const params = useParams();
  const [quiz] = useState(quizData); // In a real app, you'd fetch this data based on the quiz ID

  return (
    <div className="container mx-auto px-28 py-8">
      {/* <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Quiz Analysis: {quiz.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Quiz ID: {params.id}
      </p> */}

      {quiz.questions.map((question, index) => (
        <Card key={question.id} className="mb-6 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">
              Question {index + 1}: {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`p-3 rounded-lg ${
                    option === question.correctAnswer
                      ? "bg-green-100 dark:bg-green-900"
                      : option === question.userAnswer &&
                        option !== question.correctAnswer
                      ? "bg-red-100 dark:bg-red-900"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    {option}
                    {option === question.correctAnswer && (
                      <CheckCircle2
                        className="inline-block ml-2 text-green-500"
                        size={20}
                      />
                    )}
                    {option === question.userAnswer &&
                      option !== question.correctAnswer && (
                        <XCircle
                          className="inline-block ml-2 text-red-500"
                          size={20}
                        />
                      )}
                  </p>
                </div>
              ))}
            </div>
            <Badge
              variant={
                question.userAnswer === question.correctAnswer
                  ? "success"
                  : "destructive"
              }
              className="mb-4"
            >
              {question.userAnswer === question.correctAnswer
                ? "Correct"
                : "Incorrect"}
            </Badge>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="explanation">
                <AccordionTrigger>View Explanation</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {question.explanation}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
