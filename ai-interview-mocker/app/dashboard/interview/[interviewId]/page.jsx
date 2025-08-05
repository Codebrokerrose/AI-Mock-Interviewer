"use client";

import { useParams } from "next/navigation";
import { MockInterView } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

function Interview() {
  const { interviewId } = useParams(); // ✅ Get dynamic param
  const [interviewData, setInterviewData] = useState(null);

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

    console.log(result);
    setInterviewData(result[0]); // Assuming single record
  };

  return (
    <div className="flex my-10 justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      {interviewData && (
        <pre className="mt-4 bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify(interviewData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Interview;
