"use client";
import { User, Award, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/api/api"; // Ensure you have the correct API import

export default function UserDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/me");
        setData(response.data);
      } catch (error) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-[#4173F2] rounded-full flex items-center justify-center mr-6">
          <User className="w-12 h-12 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data?.userName || "Unknown"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{data?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-[#4173F2] dark:text-[#6B8FF2] mr-2" />
          <p className="text-gray-600 dark:text-gray-300">
            Joined: {new Date(data?.createdAt).toDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <Award className="w-5 h-5 text-[#4173F2] dark:text-[#6B8FF2] mr-2" />
          <p className="text-gray-600 dark:text-gray-300">
            Quizzes completed: {data?.completedQuizzes || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
