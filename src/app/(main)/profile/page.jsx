"use client";

import UserDetails from "@/components/profile/UserDetails";
import Analysis from "@/components/Analysis";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
export default function ProfilePage() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleGenerateAnalysis = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-16 py-8">
        <div className="lg:col-span-2">
          <UserDetails />
        </div>
        {!showAnalysis && (
          <div className=" flex justify-center text-center mt-14">
            <div className="space-y-8 mt-8 text-center">
              {!showAnalysis && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Quiz Analysis
                  </h2>

                  <p className="text-lg text-blue-600 font-bold animate-pulse">
                    Discover your strengths and areas to improve with insights
                    and get your learning pathway!
                  </p>

                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition duration-300"
                    onClick={handleGenerateAnalysis}
                  >
                    Generate Analysis
                    <TrendingUp />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className=" mt-3">{showAnalysis && <Analysis />}</div>
      </div>
    </div>
  );
}
