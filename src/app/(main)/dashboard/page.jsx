"use client";

import { useEffect, useState } from "react";
import withAuth from "@/app/utils/isAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Trophy } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "@/api/api";
function DashboardPage() {
  const [scores, setScores] = useState({
    totalQuizzes: 0,
    avgScore: 0,
    highestPercentage: 0,
    quizzesThisWeek: 0,
  });
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoresRes, analyticsRes] = await Promise.all([
          api.get("/analytics/generateScores"),
          api.get("/analytics/generateAnalytics"),
        ]);

        // Directly access data without .json()
        setScores(scoresRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const performanceData = analytics
    .map((item) => ({
      date: new Date(item.createdAt).toLocaleDateString(),
      score: item.percentage,
    }))
    .reverse();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    // Rest of the component remains the same
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 my-6">
              <StatCard
                title="Total Quizzes"
                value={scores.totalQuizzes.toString()}
                icon={
                  <Calendar className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                }
              />
              <StatCard
                title="Average Score"
                value={`${Math.round(scores.avgPercentage)}%`}
                icon={
                  <Trophy className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
                }
              />
              <StatCard
                title="Quizzes This Week"
                value={scores.quizzesThisWeek.toString()}
                icon={
                  <BarChart className="h-8 w-8 text-green-500 dark:text-green-400" />
                }
              />
              <StatCard
                title="Highest Score"
                value={`${Math.round(scores.highestPercentage)}%`}
                icon={
                  <Trophy className="h-8 w-8 text-red-500 dark:text-red-400" />
                }
              />
            </div>
            <div className="flex flex-col md:flex-row mt-6">
              <Card className="flex-1 mb-6 md:mr-6 md:mb-0 dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-100">
                    Recent Quizzes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analytics.map((quiz) => (
                      <QuizScoreCard
                        key={quiz.id}
                        quiz={{
                          id: quiz.id,
                          topic: quiz.topic,
                          subtopic: quiz.subTopic,
                          score: quiz.correctAnswers,
                          total: quiz.totalQuestions,
                          date: new Date(quiz.createdAt).toLocaleDateString(),
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="flex-1 dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-100">
                    Performance Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#374151"
                          className="dark:opacity-50"
                        />
                        <XAxis
                          dataKey="date"
                          stroke="#9CA3AF"
                          tick={{ fill: "#9CA3AF" }}
                        />
                        <YAxis
                          stroke="#9CA3AF"
                          tick={{ fill: "#9CA3AF" }}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "none",
                            borderRadius: "0.375rem",
                            boxShadow:
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }}
                          itemStyle={{ color: "#E5E7EB" }}
                          labelStyle={{ color: "#9CA3AF" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, fill: "#2563EB" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// StatCard and QuizScoreCard components remain the same
function StatCard({ title, value, icon }) {
  return (
    <Card className="dark:bg-slate-800">
      <CardContent className="flex items-center mt-4">
        <div className="mr-4">{icon}</div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function QuizScoreCard({ quiz }) {
  const percentage = (quiz.score / quiz.total) * 100;
  let bgColor;
  if (percentage >= 75) {
    bgColor = "text-green-600 dark:text-green-500";
  } else if (percentage < 50) {
    bgColor = "text-red-500 dark:text-red-500";
  } else {
    bgColor = "text-yellow-400 dark:text-yellow-300";
  }

  return (
    <Card className="dark:bg-gray-700 transition-colors duration-200 shadow-xl">
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
          {quiz.topic}
        </h3>
        <h2>{quiz.subtopic}</h2>
        <h2>{}</h2>
        <div className="flex justify-between items-center">
          <span
            className={`text-2xl font-bold text-gray-900 dark:text-gray-50 ${bgColor}`}
          >
            {quiz.score}/{quiz.total}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {quiz.date}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default withAuth(DashboardPage);
