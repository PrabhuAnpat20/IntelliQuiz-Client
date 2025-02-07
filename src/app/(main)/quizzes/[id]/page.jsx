"use client";
import React from "react";
import { useState, useEffect } from "react";
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
import api from "@/api/api";

export default function QuizAnalysisPage() {
  const params = useParams();
  const [quiz, setQuizData] = useState();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(`/analytics/test/${params.id}`);
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!quiz) return null;

  return (
    <div className="container mx-auto px-4 md:px-28 py-8">
      {quiz.map((question, index) => (
        <Card
          key={question.testQuestionId}
          className="mb-6 bg-white dark:bg-gray-800"
        >
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">
              Question {index + 1}: {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {question.options.map((option, optionIndex) => {
                const isSelected = optionIndex === question.selectedOption;
                const isCorrect = optionIndex === question.correctOption;

                let bgColor = "bg-gray-100 dark:bg-gray-700";
                if (isSelected && isCorrect) {
                  bgColor = "bg-green-100 dark:bg-green-900";
                } else if (isSelected && !isCorrect) {
                  bgColor = "bg-red-100 dark:bg-red-900";
                } else if (isCorrect) {
                  bgColor = "bg-green-100 dark:bg-green-800/30";
                }

                return (
                  <div
                    key={optionIndex}
                    className={`p-3 rounded-lg ${bgColor} transition-colors`}
                  >
                    <p className="text-gray-800 dark:text-gray-200 flex items-center justify-between">
                      <span>{option}</span>
                      <span>
                        {isCorrect && (
                          <CheckCircle2 className="text-green-500" size={20} />
                        )}
                        {isSelected && !isCorrect && (
                          <XCircle className="text-red-500" size={20} />
                        )}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
            <Badge
              variant={question.isCorrect === 1 ? "success" : "destructive"}
              className="mb-4"
            >
              {question.isCorrect === 1 ? "Correct" : "Incorrect"}
            </Badge>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="explanation">
                <AccordionTrigger>View Explanation</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {question.explanation || "Explanation not available"}
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
