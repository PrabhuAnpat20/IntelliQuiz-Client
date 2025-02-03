"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
export default function YoutubeForm() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generating quiz from YouTube:", youtubeLink);
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Youtube className="h-12 w-12 text-[#FF0000] dark:text-[#FF0000]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            YouTube Quiz Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter a YouTube video link and specify the number of questions to
            generate a custom quiz
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5">
            <Label>YouTube Link</Label>
            <Input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-4">
            <Label>Number of Questions</Label>
            <Input
              type="number"
              min="1"
              max="50"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              placeholder="Enter number of questions"
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" className="dark:bg-gray-600">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="bg-[#4173F2] text-white dark:bg-[#315BB0]"
            >
              Generate Quiz
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
