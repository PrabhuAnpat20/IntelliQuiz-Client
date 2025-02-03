"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
export default function PdfForm() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generating quiz from PDF:", pdfFile);
  };

  return (
    <main className=" bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-[#4173F2] dark:text-[#315BB0]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PDF Quiz Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload a PDF and specify the number of questions to generate a
            custom quiz
          </p>
        </div>
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
