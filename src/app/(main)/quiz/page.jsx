"use client";
import { useRouter } from "next/navigation";
import { Brain, BookOpen, Youtube } from "lucide-react";

export default function GenerateQuizPage() {
  const router = useRouter();

  const handleCardClick = (formType) => {
    router.push(`/generate-quiz/${formType}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 mt-4">
          <p className="text-4xl text-muted-foreground max-w-5xl mx-auto my-4 dark:text-slate-300 font-semibold">
            Select the way you want to generate the quiz!
          </p>
          <p className=" max-w-5xl  text-[14px]  dark:text-white text-center  mx-auto">
            Transform learning into an interactive experience by choosing your
            preferred method. Upload a PDF, extract insights from a YouTube
            video, or create a custom quiz tailored to your needs. Our
            AI-powered system ensures personalized and adaptive quizzes for a
            smarter way to learn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mt-7">
          {/* Custom Quiz Card */}
          <div
            onClick={() => handleCardClick("custom")}
            className="bg-white rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
          >
            <div className="h-2 bg-purple-500 w-full absolute top-0"></div>
            <div className="p-8 dark:bg-slate-300">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">
                Custom Quiz
              </h2>
              <p className="text-gray-600 text-center">
                Generate a quiz based on your chosen topic
              </p>
            </div>
          </div>

          {/* PDF Quiz Card */}
          <div
            onClick={() => handleCardClick("pdf")}
            className="bg-white rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
          >
            <div className="h-2 bg-blue-500 w-full absolute top-0"></div>
            <div className="p-8 dark:bg-slate-300">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 ">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">PDF Quiz</h2>
              <p className="text-gray-600 text-center">
                Create a quiz from your PDF document
              </p>
            </div>
          </div>

          {/* YouTube Quiz Card */}
          <div
            onClick={() => handleCardClick("youtube")}
            className="bg-white rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
          >
            <div className="h-2 bg-red-500 w-full absolute top-0"></div>
            <div className="p-8 dark:bg-slate-300">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
                <Youtube className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">
                YouTube Quiz
              </h2>
              <p className="text-gray-600 text-center">
                Generate questions from a YouTube video
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
