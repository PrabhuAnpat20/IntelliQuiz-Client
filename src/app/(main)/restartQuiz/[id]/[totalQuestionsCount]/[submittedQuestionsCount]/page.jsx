"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import RestartedQuiz from "@/components/Quiz/RestartedQuix";

function Page() {
  const params = useParams();
  const { id, totalQuestionsCount, submittedQuestionsCount } = params;

  // Convert params to integers
  const testID = parseInt(id, 10);
  const num = parseInt(totalQuestionsCount, 10);
  const submittedCount = parseInt(submittedQuestionsCount, 10);

  // Log params when the component mounts
  useEffect(() => {
    console.log("Params:", { testID, num, submittedCount });
  }, [testID, num, submittedCount]);

  return (
    <div>
      <RestartedQuiz
        testID={testID}
        num={num}
        submittedCount={submittedCount}
      />
    </div>
  );
}

export default Page;
