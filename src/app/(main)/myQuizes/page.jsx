"use client";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Youtube,
  FileType,
  Settings,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import ResumeQuiz from "@/components/Quiz/ResumeQuiz";
import api from "@/api/api";

const CollapsibleQuizSection = ({
  title,
  icon,
  quizzes,
  showSubtopic = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-8 bg-white dark:bg-gray-800">
      <CardHeader
        className="flex flex-row items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-row items-center space-x-2">
          {icon}
          <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {title}
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {quizzes.length} {quizzes.length === 1 ? "quiz" : "quizzes"}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>
      <CardContent
        className={`transition-all duration-200 ease-in-out ${
          isExpanded
            ? "max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {quizzes.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 dark:text-gray-300">
                  Topic
                </TableHead>
                {showSubtopic && (
                  <TableHead className="text-gray-600 dark:text-gray-300">
                    Subtopic
                  </TableHead>
                )}
                <TableHead className="text-gray-600 dark:text-gray-300">
                  Score
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-300">
                  Date
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-300">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {quiz.topic}
                  </TableCell>
                  {showSubtopic && (
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {quiz.subTopic || "-"}
                    </TableCell>
                  )}
                  <TableCell>
                    <span
                      className={getScoreColor(quiz.score, quiz.totalQuestions)}
                    >
                      {quiz.score}/{quiz.totalQuestions} (
                      {quiz.percentage.toFixed(1)}%)
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/quizzes/${quiz.testId}`}>
                      <Button variant="outline" size="sm">
                        Analyze
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            No {title} available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function getScoreColor(score, total) {
  const percentage = (score / total) * 100;
  if (percentage >= 70) return "text-green-600 dark:text-green-400";
  if (percentage >= 40) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

const AllQuizzesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/analytics/generateAnalytics");
        const data = response.data;
        setQuizData(data);
      } catch (err) {
        setError("Failed to load quiz data. Please try again.");
        console.error("Error fetching quiz data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredQuizzes = useMemo(() => {
    return quizData.filter(
      (quiz) =>
        quiz.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.subTopic?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, quizData]);

  const quizzesByType = useMemo(
    () => ({
      youtube: filteredQuizzes.filter((quiz) => quiz.testType === "youtube"),
      pdf: filteredQuizzes.filter((quiz) => quiz.testType === "pdf"),
      custom: filteredQuizzes.filter((quiz) => quiz.testType === "custom"),
    }),
    [filteredQuizzes]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6 bg-white dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Search
              </label>
              <Input
                id="search"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CollapsibleQuizSection
        title="YouTube Quizzes"
        icon={<Youtube className="h-6 w-6 text-red-500" />}
        quizzes={quizzesByType.youtube}
        showSubtopic={false}
      />

      <CollapsibleQuizSection
        title="PDF Quizzes"
        icon={<FileType className="h-6 w-6 text-blue-500" />}
        quizzes={quizzesByType.pdf}
        showSubtopic={false}
      />

      <CollapsibleQuizSection
        title="Custom Quizzes"
        icon={<Settings className="h-6 w-6 text-green-500" />}
        quizzes={quizzesByType.custom}
        showSubtopic={true}
      />

      <div className="mt-8">
        <ResumeQuiz />
      </div>
    </div>
  );
};

export default AllQuizzesPage;
