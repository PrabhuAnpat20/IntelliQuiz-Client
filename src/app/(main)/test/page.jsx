import React from "react";
import {
  BookOpen,
  Youtube,
  Calendar,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

function App() {
  const data = {
    strength: [
      "Ability to understand basic concepts of Units",
      "Familiarity with geometric shapes, specifically Circles",
      "Capacity to attempt a variety of question types",
    ],
    weak_area: [
      "Difficulty with applying Units to complex problems",
      "Struggling with theorems related to Circles in geometry",
      "Need to improve understanding of geometric formulas and properties",
    ],
    youtube_resources: [
      {
        topic: "Units - null",
        links: [
          "https://www.youtube.com/watch?v=s7IIcTmQoIg",
          "https://www.youtube.com/watch?v=0tNSybBhx-I",
          "https://www.youtube.com/watch?v=K-ZoDMZBHC8",
        ],
      },
      {
        topic: "geometry - Circles",
        links: [
          "https://www.youtube.com/watch?v=Fzaof9cX-PM",
          "https://www.youtube.com/watch?v=Sc7tu1yJEbc",
          "https://www.youtube.com/watch?v=nd46bA9DKE0",
        ],
      },
    ],
    weekly_plan: [
      {
        day: "Monday",
        tasks: ["Review notes on Units", "Practice 10 questions on Units"],
      },
      {
        day: "Tuesday",
        tasks: [
          "Watch video lectures on geometry and Circles",
          "Take notes on key concepts and formulas",
        ],
      },
      {
        day: "Wednesday",
        tasks: [
          "Practice 15 questions on geometry and Circles",
          "Review and analyze mistakes",
        ],
      },
      {
        day: "Thursday",
        tasks: [
          "Review textbook chapters on Units and geometry",
          "Summarize key points in own words",
        ],
      },
      {
        day: "Friday",
        tasks: [
          "Take a practice test on Units and geometry",
          "Review and identify areas for improvement",
        ],
      },
      {
        day: "Saturday",
        tasks: [
          "Work on improving weak areas in Units and geometry",
          "Practice mixed questions on both topics",
        ],
      },
      {
        day: "Sunday",
        tasks: [
          "Review all material covered during the week",
          "Plan and set goals for the upcoming week",
        ],
      },
    ],
  };

  const getVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Quiz Analysis Dashboard
          </h1>
          <p className="text-gray-600">
            Your personalized learning journey for Units and Geometry
          </p>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Strengths</h2>
            </div>
            <ul className="space-y-2">
              {data.strength.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Areas for Improvement
              </h2>
            </div>
            <ul className="space-y-2">
              {data.weak_area.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-2 mr-2"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Resources */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center mb-6">
            <Youtube className="w-6 h-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Video Resources
            </h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.youtube_resources.map((resource, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {resource.topic}
                </h3>
                <div className="space-y-4">
                  {resource.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube-nocookie.com/embed/${getVideoId(
                          link
                        )}`}
                        title={`Video ${linkIndex + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Plan Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Weekly Study Plan
            </h2>
          </div>
          <div className="space-y-6">
            {data.weekly_plan.map((day, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                {index !== data.weekly_plan.length - 1 && (
                  <div className="absolute left-2 top-4 w-0.5 h-full -ml-px bg-blue-200"></div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {day.day}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {day.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="text-gray-600 flex items-start"
                      >
                        <BookOpen className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
