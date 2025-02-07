"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Loader2 } from "lucide-react";
import api from "@/api/api";
import { useToast } from "@/hooks/use-toast";

const topics = [
  { id: "algebra", name: "Algebra" },
  { id: "geometry", name: "Geometry" },
  { id: "trigonometry", name: "Trigonometry" },
  { id: "calculus", name: "Calculus" },
  { id: "statistics", name: "Statistics" },
  { id: "probability", name: "Probability" },
];

const subtopics = {
  algebra: ["Linear Equations", "Quadratic Equations", "Polynomials"],
  geometry: ["Triangles", "Circles", "Coordinate Geometry"],
  trigonometry: ["Basic Ratios", "Trigonometric Identities", "Applications"],
  calculus: ["Differentiation", "Integration", "Limits"],
  statistics: [
    "Descriptive Statistics",
    "Inferential Statistics",
    "Probability Distributions",
  ],
  probability: [
    "Basic Concepts",
    "Conditional Probability",
    "Bayesian Probability",
  ],
};

export default function CustomForm() {
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/quiz/generateQuiz", {
        topic: topic,
        subTopic: subtopic,
        numberOfQuestions: numQuestions,
      });
      // toast.success("Quiz generated successfully!");
      console.log("Generated Quiz:", response.data);
      localStorage.setItem("quizData", JSON.stringify(response.data));
      localStorage.setItem("testID", JSON.stringify(response.data.qu));

      setTimeout(() => {
        router.push("/generated");
      }, 2000);
    } catch (error) {
      // toast.error("Failed to generate quiz. Please try again.");
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Settings className="h-12 w-12 text-[#4173F2] dark:text-[#315BB0]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Custom Quiz Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Select your topic and customize your quiz settings to generate
            targeted questions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Topic</Label>
            <Select onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Subtopic</Label>
            <Select onValueChange={setSubtopic} disabled={!topic}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subtopic" />
              </SelectTrigger>
              <SelectContent>
                {topic &&
                  subtopics[topic]?.map((st, index) => (
                    <SelectItem key={index} value={st}>
                      {st}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Number of Questions</Label>
            <Input
              type="number"
              min="1"
              max="50"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              placeholder="Enter number of questions"
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              className="dark:bg-gray-600"
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="bg-[#4173F2] text-white dark:bg-[#315BB0] flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />{" "}
                  Generating...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
