import { Book, Youtube } from "lucide-react";

export default function StudyResources() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Study Resources
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-white">
            <Book className="w-5 h-5 mr-2 text-[#4173F2] dark:text-[#6B8FF2]" />
            Recommended Articles
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-[#4173F2] dark:text-[#6B8FF2] hover:underline"
              >
                Mastering Trigonometric Functions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#4173F2] dark:text-[#6B8FF2] hover:underline"
              >
                Advanced Calculus Techniques
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-white">
            <Youtube className="w-5 h-5 mr-2 text-[#4173F2] dark:text-[#6B8FF2]" />
            Video Lessons
          </h3>
          <div className="space-y-4">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
              alt="youtube"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
