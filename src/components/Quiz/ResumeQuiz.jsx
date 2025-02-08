"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, ClipboardX } from "lucide-react";
import Link from "next/link";

const ResumeQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncompleteQuizzes = async () => {
      try {
        setIsLoading(true);
        const result = await api.get("/quiz/getnot");

        setQuizzes(result.data.data);
      } catch (err) {
        setError("Failed to load incomplete quizzes. Please try again later.");
        console.error("Error fetching incomplete quizzes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncompleteQuizzes();
  }, []);

  if (error) {
    return (
      <Card className="mt-6 dark:bg-gray-800">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <ClipboardX className="h-12 w-12" />
          </div>
          <p className="text-lg font-semibold text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
          <Button
            className="mt-4"
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="mt-6 dark:bg-gray-800">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading incomplete quizzes...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!quizzes.length) {
    return (
      <Card className="mt-6 dark:bg-gray-800">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <ClipboardX className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Incomplete Quizzes
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            You have no incomplete quizzes at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Incomplete Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test ID</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Subtopic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.testId}>
                <TableCell className="font-medium">{quiz.testId}</TableCell>
                <TableCell>{quiz.topic || "N/A"}</TableCell>
                <TableCell>{quiz.subTopic || "N/A"}</TableCell>
                <TableCell>{quiz.status}</TableCell>
                <TableCell>
                  <Link
                    href={`/restartQuiz/${quiz.testId}/${quiz.totalQuestionsCount}/${quiz.submittedQuestionsCount}`}
                  >
                    <Button variant="outline" size="sm">
                      Resume Test
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ResumeQuiz;
