"use client";
import React, { useEffect, useState } from "react";

import {
  BookOpen,
  Youtube,
  Calendar,
  TrendingUp,
  AlertTriangle,
  BarChart2,
  Loader2,
} from "lucide-react";
import api from "@/api/api";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/analytics/getStrengths");
        setData(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : "";
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  w-full mt-0">
        <div className="flex items-center space-x-4">
          <BarChart2 className="w-12 h-12 text-blue-500 animate-pulse" />
          <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
          <p className="text-lg font-semibold text-gray-700 animate-pulse">
            Analyzing Quiz Results...
          </p>
        </div>
      </div>
    );

  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
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

          <div className="bg-white rounded-lg shadow-md p-6">
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Youtube className="w-6 h-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Video Resources
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
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

        <div className="bg-white rounded-lg shadow-md p-6">
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
