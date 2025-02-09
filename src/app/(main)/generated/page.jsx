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

  const generateQuestionsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Quiz Questions", 14, 20);
    doc.setFontSize(12);

    let y = 30;

    quizData.forEach((q, index) => {
      const questionText = `${index + 1}. ${q.question}`;
      const splitQuestion = doc.splitTextToSize(questionText, 180);

      if (y + splitQuestion.length * 7 > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(splitQuestion, 14, y);
      y += splitQuestion.length * 7 + 4;

      q.options.forEach((option, idx) => {
        const optionLabel = String.fromCharCode(65 + idx);
        const optionText = `${optionLabel}. ${option}`;
        const splitOption = doc.splitTextToSize(optionText, 170);

        if (y + splitOption.length * 6 > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(splitOption, 20, y);
        y += splitOption.length * 6 + 2;
      });

      y += 10; // Add extra space after each question block
    });

    doc.save("Quiz_Questions.pdf");
  };

  const generateAnswerKeyPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Answer Key", 14, 20);
    doc.setFontSize(12);

    // Create answer key table data
    const tableData = quizData.map((q, index) => [
      index + 1,
      String.fromCharCode(65 + q.correctOption),
      q.question.substring(0, 50) + (q.question.length > 50 ? "..." : ""), // truncate long questions
    ]);

    doc.autoTable({
      startY: 30,
      head: [["Question No.", "Correct Answer", "Question"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [65, 115, 242] }, // Using the blue color from your UI
      styles: { overflow: "linebreak" },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: "auto" },
      },
    });

    doc.save("Answer_Key.pdf");
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
                  the quiz or download the PDFs.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <button
                  onClick={() => setStartQuiz(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-[#4173F2] hover:bg-[#3461d1] rounded-lg transition-colors"
                >
                  <PenLine className="w-5 h-5" />
                  Attempt Quiz
                </button>

                <button
                  onClick={generateQuestionsPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-[#4173F2] bg-[#4173F2]/10 hover:bg-[#4173F2]/20 rounded-lg transition-colors"
                >
                  <FileDown className="w-5 h-5" />
                  Questions PDF
                </button>

                <button
                  onClick={generateAnswerKeyPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-[#4173F2] bg-[#4173F2]/10 hover:bg-[#4173F2]/20 rounded-lg transition-colors"
                >
                  <FileDown className="w-5 h-5" />
                  Answer Key
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
