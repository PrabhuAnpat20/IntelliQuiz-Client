import React, { useState, useEffect } from "react";
import api from "@/api/api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  AlertTria,
} from "recharts";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Quiz = ({ testID, num }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [review, setReview] = useState(false);
  useEffect(() => {
    startQuiz();
  }, []);

  useEffect(() => {
    if (!isSubmitted && currentQuestion) {
      setStartTime(Date.now());
    }
  }, [currentQuestion, isSubmitted]);

  const startQuiz = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post("/quiz/startquiz", {
        test_id: testID,
        difficulty: difficulty,
      });

      if (data.questions && data.questions.length > 0) {
        setCurrentQuestion(data.questions[0]);
      } else {
        console.error("No questions found in the response.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error starting quiz:", error);
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    if (!isSubmitted) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer !== null && !isSubmitted) {
      const endTime = Date.now();
      const timeSpent = Math.floor((endTime - startTime) / 1000);
      setTimeTaken(timeSpent);

      try {
        const data = await api.post("/quiz/submit", {
          testId: testID,
          questionId: currentQuestion.id,
          selectedOption: selectedAnswer,
          time_taken: timeSpent,
        });
        console.log(data);
        const isCorrect = data.result === 1;
        console.log(data.data.result);
        const explanation = data.data.explanation;
        setExplanation(explanation);

        if (isCorrect) {
          setScore(score + 1);
        }

        setIsSubmitted(true);
        setDifficulty(currentQuestion.difficulty);
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };
  const report = async () => {
    const id = currentQuestion.id;
    const response = await api.put(`/quiz/report/${id}`);
    if (response) {
      if (setReview) {
        setReview(false);
      }

      setReview(true);
    }
  };
  const handleNextQuestion = async () => {
    // Check if this is the last question
    if (questionCount + 1 == num) {
      await postTestResult();
      return;
    }

    try {
      setIsLoading(true);
      setExplanation(null);
      setReview(false);
      const response = await api.get(
        `/quiz/nextquestion?difficulty=${difficulty}&isCorrect=${
          isSubmitted ? 1 : 0
        }&time_taken=${timeTaken}&testId=${testID}`
      );

      if (response.data && response.data.newQuestion) {
        const nextQuestion = response.data.newQuestion;
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setQuestionCount((prevCount) => prevCount + 1);
      } else {
        await postTestResult();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching next question:", error);
      await postTestResult();
      setIsLoading(false);
    }
  };
  const postTestResult = async () => {
    try {
      const response = await api.post("/result/test", {
        test_id: testID,
      });

      console.log("Test Result Response:", response);
      // Directly use the result from the response
      setTestResult(response.data.result);
      setShowScore(true);
    } catch (error) {
      console.error("Error posting test result:", error);
    }
  };

  const ResultVisualization = ({ result }) => {
    const pieData = [
      {
        name: "Correct Answers",
        value: result.correctAnswers,
        color: "#22c55e", // Green for correct answers
      },
      {
        name: "Incorrect Answers",
        value: result.totalQuestions - result.correctAnswers,
        color: "#ef4444", // Red for incorrect answers
      },
    ];

    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Test Results
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Score Details */}
              <div className="text-center">
                <div className="text-xl text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    <strong>Score:</strong> {result.correctAnswers} /{" "}
                    {result.totalQuestions}
                  </p>
                  <p>
                    <strong>Percentage:</strong> {result.percentage}%
                  </p>
                  <p>{/* <strong>Test ID:</strong> {result.testId} */}</p>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getOptionClassName = (index) => {
    if (!isSubmitted) {
      return `w-full p-4 text-left rounded-lg transition-colors ${
        selectedAnswer === index
          ? "bg-[#4173F2] text-white"
          : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
      }`;
    }

    if (index === currentQuestion.correctOption) {
      return "w-full p-4 text-left rounded-lg transition-colors bg-green-500 text-white";
    }

    if (index === selectedAnswer) {
      return `w-full p-4 text-left rounded-lg transition-colors ${
        selectedAnswer === currentQuestion.correctOption
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }`;
    }

    return "w-full p-4 text-left rounded-lg transition-colors bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200";
  };

  const handlePause = () => {
    setOpen(true);
  };

  const handleConfirmPause = () => {
    router.push("/");
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showScore && testResult) {
    console.log("Rendering Result Visualization", testResult);
    return <ResultVisualization result={testResult} />;
  }
  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Pause Test
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action will pause the test and redirect you to the home
                    page.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleConfirmPause}>
                    Confirm
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              className=" bg-yellow-200"
              onClick={report}
            >
              {review ? <>Marked For review </> : <>Mark For Review</>}
            </Button>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Question {questionCount + 1} of {num}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isSubmitted}
                className={getOptionClassName(index)}
              >
                {option}
              </button>
            ))}
          </div>
          {explanation && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Explanation
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                {" "}
                <ReactMarkdown>{explanation}</ReactMarkdown>
              </p>
            </div>
          )}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitted}
              className={`w-full py-3 rounded-lg transition-colors ${
                selectedAnswer === null || isSubmitted
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-[#4173F2] hover:bg-[#3461d1] text-white"
              }`}
            >
              Submit Answer
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!isSubmitted}
              className={`w-full py-3 rounded-lg transition-colors ${
                !isSubmitted
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-[#4173F2] hover:bg-[#3461d1] text-white"
              }`}
            >
              {questionCount + 1 >= num ? "Finish Test" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
