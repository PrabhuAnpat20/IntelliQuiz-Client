import UserDetails from "@/components/profile/UserDetails";
import QuizResults from "@/components/profile/QuizResult";
import AIAnalysis from "@/components/profile/AiAnalysis";
import StudyResources from "@/components/profile/StudyResources";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UserDetails />
            <QuizResults />
          </div>
          <div className="space-y-8">
            <AIAnalysis />
            <StudyResources />
          </div>
        </div>
      </div>
    </div>
  );
}
