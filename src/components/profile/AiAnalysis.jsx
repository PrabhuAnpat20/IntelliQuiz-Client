import { Brain, TrendingUp, TrendingDown } from "lucide-react";

export default function AIAnalysis() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <Brain className="w-8 h-8 text-[#4173F2] dark:text-[#6B8FF2] mr-3" />
        AI Analysis
      </h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <TrendingUp className="w-6 h-6 text-green-500 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Strengths
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Excellent performance in Algebra and Statistics
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <TrendingDown className="w-6 h-6 text-red-500 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Areas for Improvement
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Focus on enhancing Trigonometry skills
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
