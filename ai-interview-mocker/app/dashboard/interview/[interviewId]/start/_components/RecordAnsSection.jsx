"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

function RecordAnsSection() {
  const [userAnswer, setUserAnswer] = useState("");

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

  // Accumulate spoken words into userAnswer
  useEffect(() => {
    if (results.length > 0) {
      const newTranscript = results.map((r) => r.transcript).join(" ");
      setUserAnswer((prev) => prev + " " + newTranscript);
    }
  }, [results]);

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Webcam Feed with Overlay */}
      <div className="flex flex-col mt-20 justify-center items-center relative rounded-lg p-5 bg-purple-100 shadow-md">
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

      {/* Recording Button */}
      <Button
        variant="outline"
        className={`my-5 ${
          isRecording ? "bg-red-600 text-white" : "bg-purple-700 text-white"
        }`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <span className="flex items-center gap-2 font-bold">
            <Mic className="animate-pulse" /> Stop Recording
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>

      {/* Debug / Output */}
      <Button
        variant="ghost" className="bg-purple-300"
        onClick={() => alert(userAnswer || "No answer recorded yet")}
      >
        Show Answer
      </Button>
    </div>
  );
}

export default RecordAnsSection;
