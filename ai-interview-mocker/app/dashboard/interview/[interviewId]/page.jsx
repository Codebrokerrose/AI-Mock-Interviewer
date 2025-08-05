"use client";
import { MockInterView } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";

function Interview() {
  const [interviewData, setInterviewData] = useState(null);
  const { interviewId } = useParams();
  const [webCamEnable, setWebCamEnable] = useState(false);

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
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 px-4 md:px-10">
      <h2 className="font-bold text-3xl mb-5 text-center text-purple-700">
        Let's Get Started
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {interviewData && (
          <div className="flex flex-col gap-6">
            {/* Job Details Box */}
            <div className="flex flex-col p-5 rounded-lg border shadow bg-white">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong>{" "}
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-lg mt-2">
                <strong>Job Description / Tech Stack:</strong>{" "}
                {interviewData.jobDesc}
              </h2>
              <h2 className="text-lg mt-2">
                <strong>Years of Experience:</strong>{" "}
                {interviewData.jobExperience}
              </h2>
            </div>

            {/* Info Box */}
            <div className="p-4 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2 className="flex gap-2 items-center text-yellow-600 text-lg font-semibold">
                <Lightbulb /> Information
              </h2>
              <p className="mt-3 text-yellow-700">
                {process.env.NEXT_PUBLIC_INFORMATION ||
                  "Tips and tricks will show here."}
              </p>
            </div>
          </div>
        )}

        {/* Webcam Section */}
        <div className="text-center w-full flex flex-col items-center">
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              className="rounded-lg shadow-md border-2 border-purple-300 w-full max-w-lg h-[350px] object-cover"
            />
          ) : (
            <>
              <WebcamIcon className="h-64 w-full p-20 bg-purple-50 rounded-lg border my-7" />
              <Button
                variant="ghost"
                className="bg-purple-400 text-white w-full max-w-lg"
                onClick={() => setWebCamEnable(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-end mt-4">
        <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg">
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
