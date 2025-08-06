"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterView } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";

function StartInterview() {
  const { interviewId } = useParams(); // ✅ grabs the dynamic route param
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails(interviewId);
    }
  }, [interviewId]);

  const GetInterviewDetails = async (id) => {
    const result = await db
      .select()
      .from(MockInterView)
      .where(eq(MockInterView.mockId, id));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log("jsonMockResp", jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions  */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Recording */}

        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6 ">
        {activeQuestionIndex>0&& 
        <Button className="bg-purple-600"
        onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
        >Previous Question</Button>
        }
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&& 
        <Button className="bg-purple-600"
        onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>
    }
        {activeQuestionIndex==mockInterviewQuestion?.length-1&& <Button className="bg-purple-600">End Interview</Button>}
      </div>
    </div>
  );
}

export default StartInterview;
