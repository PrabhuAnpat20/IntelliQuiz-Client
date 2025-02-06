"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import api from "@/api/api";
import withAuth from "@/app/utils/isAuth";
function AllQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [testTypeFilter, setTestTypeFilter] = useState("all");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize topics list
  const topics = useMemo(() => {
    if (!tableData.length) return ["all"];
    return ["all", ...new Set(tableData.map((quiz) => quiz.topic))];
  }, [tableData]);

  // Memoize test types list
  const testTypes = useMemo(() => {
    if (!tableData.length) return ["all"];
    return ["all", ...new Set(tableData.map((quiz) => quiz.testType))];
  }, [tableData]);

  // Memoize filtered quizzes
  const filteredQuizzes = useMemo(() => {
    if (!tableData.length) return [];

    return tableData.filter((quiz) => {
      const matchesSearch =
        quiz.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.subTopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (quiz.testType &&
          quiz.testType.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTopic = topicFilter === "all" || quiz.topic === topicFilter;

      const matchesTestType =
        testTypeFilter === "all" || quiz.testType === testTypeFilter;

      const matchesScore =
        scoreFilter === "all" ||
        (scoreFilter === "high" && quiz.score / quiz.totalQuestions >= 0.7) ||
        (scoreFilter === "medium" &&
          quiz.score / quiz.totalQuestions >= 0.4 &&
          quiz.score / quiz.totalQuestions < 0.7) ||
        (scoreFilter === "low" && quiz.score / quiz.totalQuestions < 0.4);

      return matchesSearch && matchesTopic && matchesScore && matchesTestType;
    });
  }, [searchTerm, topicFilter, scoreFilter, testTypeFilter, tableData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("/analytics/generateAnalytics");
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load quiz data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-600 dark:text-gray-300">
              Loading quizzes...
            </p>
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
            <div className="w-full md:w-1/4">
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Topic
              </label>
              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Filter by topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic === "all" ? "All Topics" : topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4">
              <label
                htmlFor="testType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Test Type
              </label>
              <Select value={testTypeFilter} onValueChange={setTestTypeFilter}>
                <SelectTrigger id="testType">
                  <SelectValue placeholder="Filter by test type" />
                </SelectTrigger>
                <SelectContent>
                  {testTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4">
              <label
                htmlFor="score"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Score
              </label>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger id="score">
                  <SelectValue placeholder="Filter by score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (70%+)</SelectItem>
                  <SelectItem value="medium">Medium (40-69%)</SelectItem>
                  <SelectItem value="low">Low (0-39%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 dark:text-gray-300">
                  Topic
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-300">
                  Subtopic
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-300">
                  Test Type
                </TableHead>
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
              {filteredQuizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {quiz.topic}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {quiz.subTopic}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {quiz.testType}
                  </TableCell>
                  <TableCell>
                    <span
                      className={getScoreColor(quiz.score, quiz.totalQuestions)}
                    >
                      {quiz.score}/{quiz.totalQuestions}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/quizzes/${quiz.id}`}>
                      <Button variant="outline" size="sm">
                        Analyze
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function getScoreColor(score, total) {
  const percentage = (score / total) * 100;
  if (percentage >= 70) return "text-green-600 dark:text-green-400";
  if (percentage >= 40) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export default withAuth(AllQuizzesPage);
