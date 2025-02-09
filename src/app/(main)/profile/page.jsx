import UserDetails from "@/components/profile/UserDetails";
import QuizResults from "@/components/profile/QuizResult";
import AIAnalysis from "@/components/profile/AiAnalysis";
import StudyResources from "@/components/profile/StudyResources";
import Analysis from "@/components/Analysis";

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="">
          <div className="lg:col-span-2">
            <UserDetails />
            {/* <QuizResults /> */}
          </div>
          <div className="space-y-8">
            <Analysis />
          </div>
        </div>
      </div>
    </div>
  );
}
