"use client";
import React, { useEffect, useState } from "react";
import { BookOpen, Brain, Calendar, Trophy, Youtube } from "lucide-react";
import api from "@/api/api";

function Analysis() {
  const [data, setData] = useState();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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
                {/* {mounted && selectedVideo && (
                  <div className="mt-4">
                    <div className="relative pt-[56.25%]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${selectedVideo}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Weekly Study Plan
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200"></div>
            <div className="space-y-8 relative">
              {data.weak_plan.map((plan, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-8 h-8 bg-blue-100 rounded-full border-4 border-blue-200 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                    <h3 className="font-semibold text-blue-700 mb-2">
                      {plan.day}
                    </h3>
                    <p className="text-gray-700">{plan["to do"]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
