"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModal";
import { UserAnswer } from "@/utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";


function RecordAnsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null); // AI-generated feedback
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const [recordingStopped, setRecordingStopped] = useState(false);

  useEffect(() => {
    if (recordingStopped && userAnswer.trim().length > 10) {
      UpdateUserAnswer();
      setRecordingStopped(false);
    }
  }, [recordingStopped]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Capture spoken results
  useEffect(() => {
    if (results.length > 0) {
      const newTranscript = results.map((r) => r.transcript).join(" ");
      setUserAnswer((prev) => prev + " " + newTranscript);
    }
  }, [results]);

  useEffect(() => {
    if(!isRecording && userAnswer.length>10) { //if recording stopped and answer is long enough
      UpdateUserAnswer(); // Call function to process and save the answer
    }
    // // Wait for mic to stop and ensure transcription is usable
    // if (userAnswer?.length < 10) {
    //   setLoading(false);
    //   toast.error("Answer too short. Please try again.");
    //   return;
    // }
  },[userAnswer]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
      setRecordingStopped(true); // Mark recording as stopped
    } else {
      setUserAnswer("");
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const question = mockInterviewQuestion[activeQuestionIndex]?.question;
    const feedbackPrompt = `Question: ${question}, User Answer: ${userAnswer}. Based on this, rate the answer (out of 10) and give 3-5 lines of feedback as a JSON object with fields: "rating" and "feedback".`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const responseText = (await result.response.text())
      .replace("```json", "")
      .replace("```", "");

    const json = JSON.parse(responseText);

    // Save the user answer along with AI feedback and rating
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: json?.feedback,
      rating: json?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast.success("User Answer Recorded successfully!");
    }
    setUserAnswer(""); // Clear the answer after saving
    setLoading(false); // Reset loading state
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Webcam feed */}
      <div className="flex flex-col justify-center items-center relative rounded-lg p-5 bg-purple-100 shadow-md">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute opacity-10"
          alt="Webcam Overlay"
        />
        <Webcam
          mirrored
          style={{
            height: 300,
            width: 400,
            borderRadius: "10px",
            zIndex: 10,
          }}
        />
      </div>

      {/* Record button */}
      <Button
        variant="outline"
        className={`my-5 transition-all duration-300 ${
          isRecording
            ? "bg-red-600 text-white animate-bounce-updown"
            : " bg-white text-purple-600 hover:bg-purple-100"
        }`}
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="flex items-center gap-2 font-bold">
            <Mic className="animate-pulse" /> Stop Recording
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
