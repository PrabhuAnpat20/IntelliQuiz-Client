"use client";
import React, { useEffect, useState } from "react";
import { BookOpen, Brain, Calendar, Trophy, Youtube } from "lucide-react";
import api from "@/api/api";

function App() {
  const [data, setData] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/analytics/getStrengths");
        setData(response.data);
      } catch (error) {
        // For demo, we'll use the hardcoded data
        const mockData = {
          strength: [
            "Ability to understand and apply basic trigonometric concepts",
            "Familiarity with custom test formats",
            "Capacity to learn from mistakes and improve",
          ],
          "weak area": [
            "Lack of understanding of adjoint concepts",
            "Difficulty in solving problems without guidance",
            "Inability to apply trigonometric concepts to complex problems",
          ],
          "study resources": [
            {
              topic: "trigonometry",
              resources:
                "Khan Academy, MIT OpenCourseWare, Trigonometry by Michael Corral",
              youtube:
                "https://www.youtube.com/watch?v=7G2KzlNG62Y, https://www.youtube.com/watch?v=d3M6j8Fp9ZQ",
            },
            {
              topic: "adjoint",
              resources:
                "Linear Algebra by Jim Hefferon, Adjoint of a Matrix by Math is Fun, Adjoint and Inverse of a Matrix by NPTEL",
              youtube:
                "https://www.youtube.com/watch?v=uQqY3_6EpZA, https://www.youtube.com/watch?v=4x8l7_r9mXc",
            },
          ],
          weak_plan: [
            {
              day: "Monday",
              "to do":
                "Review trigonometric identities and formulas, practice solving basic trigonometry problems",
            },
            {
              day: "Tuesday",
              "to do":
                "Learn about adjoint concepts, watch video lectures and take notes",
            },
            {
              day: "Wednesday",
              "to do":
                "Practice solving problems related to adjoint, focus on understanding the concepts",
            },
            {
              day: "Thursday",
              "to do":
                "Review and practice trigonometry problems, focus on applying concepts to complex problems",
            },
            {
              day: "Friday",
              "to do":
                "Take a practice test on trigonometry and adjoint, identify areas of improvement",
            },
            {
              day: "Saturday",
              "to do": "Learn from mistakes, review and practice weak areas",
            },
            {
              day: "Sunday",
              "to do":
                "Review all concepts, practice mixed problems and take a final practice test",
            },
          ],
        };
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getVideoId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/
    );
    return match?.[1] || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center text-red-600">
          <p>Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Personal Study Dashboard
          </h1>
          <p className="text-gray-600">
            Track your progress and improve your learning journey
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Trophy className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Strengths</h2>
            </div>
            <ul className="space-y-2">
              {data.strength.map((str, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                  <span className="text-gray-700">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Areas for Improvement
              </h2>
            </div>
            <ul className="space-y-2">
              {data["weak area"].map((weak, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mt-2 mr-2"></span>
                  <span className="text-gray-700">{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Study Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data["study resources"].map((resource, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2 capitalize">
                  {resource.topic}
                </h3>
                <p className="text-gray-700 mb-3">{resource.resources}</p>
                {/* <div className="flex flex-wrap gap-2">
                  {resource.youtube.split(", ").map((video, vIndex) => (
                    <button
                      key={vIndex}
                      onClick={() => setSelectedVideo(getVideoId(video))}
                      className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                    >
                      <Youtube className="w-4 h-4 mr-1" />
                      Video {vIndex + 1}
                    </button>
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Weekly Study Plan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.weak_plan.map((plan, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-purple-700 mb-2">
                  {plan.day}
                </h3>
                <p className="text-gray-700 text-sm">{plan["to do"]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
