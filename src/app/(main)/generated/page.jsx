// pages/generated/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { FileDown, PenLine, Trophy } from "lucide-react";
import Quiz from "@/components/Quiz/quiz";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Generated() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);

  const [testID, setTestID] = useState();
  const [num, setNum] = useState();
  useEffect(() => {
    const storedQuiz = localStorage.getItem("quizData");
    if (storedQuiz) {
      const data = JSON.parse(storedQuiz);
      setQuizData(data.questions);
      setNum(data.questions.length);
      if (data.questions.length > 0) {
        setTestID(data.questions[0].testId);
      }
    }
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Generated Quiz", 14, 20);
    doc.setFontSize(12);

    let y = 30; // Initial vertical position

    quizData.forEach((q, index) => {
      const questionText = `${index + 1}. ${q.question}`;
      const splitQuestion = doc.splitTextToSize(questionText, 180); // Wrap text

      if (y + splitQuestion.length * 7 > 280) {
        doc.addPage(); // Add new page if content exceeds page height
        y = 20;
      }

      doc.text(splitQuestion, 14, y);
      y += splitQuestion.length * 7 + 4; // Adjust vertical space after question

      q.options.forEach((option, idx) => {
        const optionLabel = String.fromCharCode(65 + idx);
        const optionText = `${optionLabel}. ${option}`;
        const splitOption = doc.splitTextToSize(optionText, 170);

        if (y + splitOption.length * 6 > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(splitOption, 20, y);
        y += splitOption.length * 6 + 2; // Adjust space after each option
      });

      const correctAnswer = `Correct Answer: ${String.fromCharCode(
        65 + q.correctOption
      )}`;
      doc.text(correctAnswer, 20, y + 4);
      y += 14; // Add extra space after each question block
    });

    doc.save("Generated_Quiz.pdf");
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
        <Quiz testID={testID} num={num} />
      )}
    </div>
  );
}

export default Generated;
