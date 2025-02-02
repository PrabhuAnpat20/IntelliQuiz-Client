import React from "react";
import {
  BookOpen,
  FileText,
  Youtube,
  Brain,
  ArrowRight,
  Upload,
  Sparkles,
  Play,
} from "lucide-react";
import Link from "next/link";

const howToUseSteps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Upload Your Content",
    description:
      "Upload your math PDFs or paste YouTube video links covering mathematical concepts",
    image:
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "AI Generation",
    description:
      "Our AI analyzes your content and generates relevant math questions and problems",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Play className="h-8 w-8" />,
    title: "Attempt Quiz",
    description:
      "Take the generated quizzes to test your understanding of the mathematical concepts",
    image:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "PDF Integration",
    description:
      "Upload math textbooks, notes, or study materials in PDF format for custom quiz generation",
  },
  {
    icon: <Youtube className="h-6 w-6" />,
    title: "YouTube Learning",
    description:
      "Convert math tutorial videos into interactive quizzes automatically",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Topic Organization",
    description:
      "Organize content by mathematical topics and subtopics for structured learning",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Smart Generation",
    description:
      "AI-powered system creates diverse question types based on your content",
  },
];

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Your Math Content into
          <span className="text-[#4173F2] "> Interactive Quizzes</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Upload your math PDFs or favorite YouTube tutorials and let our AI
          generate personalized quizzes to reinforce your mathematical
          understanding.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={"/quiz"}>
            <button className="px-8 py-3 bg-[#4173F2] hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors">
              Create Quiz
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>

          {/* <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-600 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-colors">
            View Examples
          </button> */}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Ways To Create Your Math Quizzes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {howToUseSteps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-[#4173F2] dark:text-indigo-400">
                    {step.icon}
                  </div>
                  {/* <span className="text-2xl font-bold text-gray-900 dark:text-white"> */}
                  {/* Step {index + 1} */}
                  {/* </span> */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Powerful Features for Math Learning
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-[#4173F2] dark:text-indigo-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-indigo-600 to-[#4173F2] rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Transform Your Math Learning?
        </h2>
        <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
          Start creating personalized math quizzes from your study materials
          today. Upload your first PDF or YouTube video and see the magic
          happen!
        </p>
        <button className="px-8 py-3 bg-white text-[#4173F2] rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Get Started for Free
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
