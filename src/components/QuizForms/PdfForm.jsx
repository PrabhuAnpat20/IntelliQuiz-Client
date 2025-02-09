"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4">
      <div className="relative">
        <BookOpen className="h-12 w-12 text-[#4173F2] dark:text-[#315BB0] animate-[flip_3s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[#4173F2] dark:bg-[#315BB0] rounded-full animate-ping opacity-20"></div>
      </div>
      <p className="text-lg font-medium text-gray-900 dark:text-white">
        Generating Your Quiz...
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Processing your PDF and creating questions
      </p>
    </div>
  </div>
);

export default function PdfForm() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!pdfFile || !topic || !numQuestions) {
      setError("Please fill in all fields.");
      return;
    }

    if (pdfFile.size > 20 * 1024 * 1024) {
      // Optional: 5MB file size limit
      setError("File size should not exceed 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("topics", JSON.stringify([topic]));
    formData.append("num_questions", numQuestions);

    try {
      setLoading(true);
      const response = await api.post("/pdf/process-pdf", formData);
      localStorage.setItem("quizData", JSON.stringify(response.data));
      router.push("/generated");
    } catch (error) {
      console.error("Error generating quiz:", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(
          error.response.data.message ||
            "Failed to generate quiz. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection.");
      } else {
        // Something went wrong in setting up the request
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {loading && <LoadingOverlay />}
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-[#4173F2] dark:text-[#315BB0]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PDF Quiz Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload a PDF, specify the topic, and the number of questions to
            generate a custom quiz
          </p>
        </div>

        {error && (
          <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-800 dark:text-red-200">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label>PDF File</Label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="flex flex-col my-4">
            <Label>Topic</Label>
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic for the quiz"
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
            <Button variant="outline" className="dark:bg-gray-600" type="reset">
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
