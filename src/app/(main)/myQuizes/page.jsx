"use client";

import { useState, useMemo } from "react";
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

const quizzes = [
  {
    id: 1,
    title: "Variables and Data Types",
    score: 8,
    total: 10,
    date: "2023-04-15",
    topic: "Programming",
    subtopic: "JavaScript Basics",
  },
  {
    id: 2,
    title: "Functions and Scope",
    score: 7,
    total: 10,
    date: "2023-04-16",
    topic: "Programming",
    subtopic: "JavaScript Basics",
  },
  {
    id: 3,
    title: "Components and Props",
    score: 2,
    total: 10,
    date: "2023-04-18",
    topic: "Web Development",
    subtopic: "React Fundamentals",
  },
  {
    id: 4,
    title: "State and Lifecycle",
    score: 3,
    total: 10,
    date: "2023-04-19",
    topic: "Web Development",
    subtopic: "React Fundamentals",
  },
  {
    id: 5,
    title: "Flexbox Layout",
    score: 7,
    total: 10,
    date: "2023-04-20",
    topic: "Web Development",
    subtopic: "CSS Flexbox",
  },
  {
    id: 6,
    title: "Flexbox Alignment",
    score: 8,
    total: 10,
    date: "2023-04-21",
    topic: "Web Development",
    subtopic: "CSS Flexbox",
  },
  {
    id: 7,
    title: "Python Syntax",
    score: 8,
    total: 10,
    date: "2023-04-22",
    topic: "Programming",
    subtopic: "Python for Beginners",
  },
  {
    id: 8,
    title: "Python Functions",
    score: 7,
    total: 10,
    date: "2023-04-23",
    topic: "Programming",
    subtopic: "Python for Beginners",
  },
  {
    id: 9,
    title: "Arrays and Linked Lists",
    score: 9,
    total: 10,
    date: "2023-04-25",
    topic: "Computer Science",
    subtopic: "Data Structures",
  },
  {
    id: 10,
    title: "Trees and Graphs",
    score: 8,
    total: 10,
    date: "2023-04-26",
    topic: "Computer Science",
    subtopic: "Data Structures",
  },
];

export default function AllQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");

  const topics = useMemo(
    () => ["all", ...new Set(quizzes.map((quiz) => quiz.topic))],
    []
  );

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.subtopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.topic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = topicFilter === "all" || quiz.topic === topicFilter;
      const matchesScore =
        scoreFilter === "all" ||
        (scoreFilter === "high" && quiz.score / quiz.total >= 0.7) ||
        (scoreFilter === "medium" &&
          quiz.score / quiz.total >= 0.4 &&
          quiz.score / quiz.total < 0.7) ||
        (scoreFilter === "low" && quiz.score / quiz.total < 0.4);
      return matchesSearch && matchesTopic && matchesScore;
    });
  }, [searchTerm, topicFilter, scoreFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        All Quizzes
      </h1> */}

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
                    {quiz.subtopic}
                  </TableCell>
                  <TableCell>
                    <span className={getScoreColor(quiz.score, quiz.total)}>
                      {quiz.score}/{quiz.total}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {quiz.date}
                  </TableCell>
                  <TableCell>
                    <Link href={"/quizzes/1"}>
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
