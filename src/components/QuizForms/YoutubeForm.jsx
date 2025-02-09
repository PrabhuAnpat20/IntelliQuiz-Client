"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Youtube, Loader2, AlertCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

const LoadingOverlay = ({ isError, errorMessage, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4 relative max-w-md w-full mx-4">
        {isError ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative">
              <AlertCircle className="h-12 w-12 text-red-500 animate-pulse" />
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Error Occurred
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {errorMessage || "Failed to generate quiz. Please try again."}
            </p>
            <Button
              variant="outline"
              className="mt-4 bg-red-500 text-white hover:bg-red-600"
              onClick={onClose}
            >
              Close
            </Button>
          </>
        ) : (
          <>
            <div className="relative">
              <div className="animate-[scale_2s_ease-in-out_infinite]">
                <Youtube className="h-12 w-12 text-[#FF0000] animate-[spin_4s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 bg-[#FF0000] rounded-full animate-[ping_1.5s_ease-in-out_infinite] opacity-20" />
              <div className="absolute inset-0 bg-[#FF0000] rounded-full animate-[ping_2s_ease-in-out_infinite_0.5s] opacity-15" />
              <div className="absolute inset-0 bg-[#FF0000] rounded-full animate-[ping_2.5s_ease-in-out_infinite_1s] opacity-10" />
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white animate-pulse">
              Processing Video...
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-[#FF0000] rounded-full animate-bounce delay-0"></div>
              <div className="w-2 h-2 bg-[#FF0000] rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-[#FF0000] rounded-full animate-bounce delay-200"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Analyzing content and generating questions
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const validateYoutubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};

export default function YoutubeForm() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const router = useRouter();

  const handleClose = () => {
    setError({ isError: false, message: "" });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate YouTube URL
    if (!validateYoutubeUrl(youtubeLink)) {
      setError({
        isError: true,
        message: "Please enter a valid YouTube URL",
      });
      setLoading(true);
      return;
    }

    // Validate number of questions
    const num = parseInt(numQuestions);
    if (isNaN(num) || num < 1 || num > 50) {
      setError({
        isError: true,
        message: "Please enter a number between 1 and 50",
      });
      setLoading(true);
      return;
    }

    setLoading(true);
    setError({ isError: false, message: "" });

    try {
      const response = await api.post("/quiz/generateYouTubeQuiz", {
        youtube_url: youtubeLink,
        numberOfQuestions: numQuestions,
      });
      console.log("Generated Quiz:", response.data);
      localStorage.setItem("quizData", JSON.stringify(response.data));
      router.push("/generated");
    } catch (error) {
      let errorMessage = "Failed to generate quiz. Please try again.";

      // Handle specific error cases
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Invalid video URL or parameters";
            break;
          case 404:
            errorMessage = "Video not found or not accessible";
            break;
          case 429:
            errorMessage = "Too many requests. Please try again later";
            break;
          case 500:
            errorMessage = "Server error. Please try again later";
            break;
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection";
      }

      setError({
        isError: true,
        message: errorMessage,
      });
      console.error("Error generating quiz:", error);
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {loading && (
        <LoadingOverlay
          isError={error.isError}
          errorMessage={error.message}
          onClose={handleClose}
        />
      )}
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
              required
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
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              className="dark:bg-gray-600"
              type="reset"
              onClick={() => {
                setYoutubeLink("");
                setNumQuestions("");
                setError({ isError: false, message: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="bg-[#4173F2] text-white dark:bg-[#315BB0] flex items-center"
              disabled={loading && !error.isError}
            >
              {loading && !error.isError ? (
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
