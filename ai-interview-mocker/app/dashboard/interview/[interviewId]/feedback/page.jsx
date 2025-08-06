"use client";
import { UserAnswer } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) GetFeedback();
  }, [interviewId]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  const averageRating = feedbackList.length
    ? (
        feedbackList.reduce(
          (acc, item) => acc + parseInt(item.rating || 0),
          0
        ) / feedbackList.length
      ).toFixed(1)
    : "N/A";

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>{averageRating}</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Below are the questions with correct answers, your answers, and AI
        feedback.
      </h2>

      {feedbackList.map((item, index) => (
        <Collapsible key={index} className="mt-7">
          <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
            {item.question} <ChevronsUpDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-red-500 p-2 border rounded-lg">
                <strong>Rating:</strong> {item.rating}
              </h2>
              <h2 className="bg-red-50 text-sm p-2 border rounded-lg text-red-900">
                <strong>Your Answer: </strong> {item.userAnswer}
              </h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-500">
                <strong>Correct Answer: </strong> {item.correctAnswer}
              </h2>
              <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-700">
                <strong>Feedback: </strong>
                {item.feedback
                  ?.replace(/[\[\]{}"]/g, "") // remove brackets and quotes
                  ?.replace(/,+/g, " ") // replace commas with space
                  ?.trim()}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Button
        className="mt-6 bg-purple-600 text-white"
        onClick={() => router.replace("/dashboard")}
      >
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
