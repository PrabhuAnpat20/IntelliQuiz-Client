"use client";
import React, { useState } from "react";
import { FileDown, PenLine, Trophy } from "lucide-react";
import Quiz from "@/components/Quiz/quiz";

function Generated() {
  const [startQuiz, setStartQuiz] = useState(false);

  const handleDownloadPDF = () => {
    // PDF download logic would go here
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!startQuiz ? (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <div className="w-20 h-20 bg-[#4173F2] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Congratulations!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Your quiz has been generated successfully. You can now attempt
                  the quiz or download it as PDF.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <button
                  onClick={() => setStartQuiz(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-[#4173F2] hover:bg-[#3461d1] rounded-lg transition-colors"
                >
                  <PenLine className="w-5 h-5" />
                  Attempt Quiz
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-[#4173F2] bg-[#4173F2]/10 hover:bg-[#4173F2]/20 rounded-lg transition-colors"
                >
                  <FileDown className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default Generated;
