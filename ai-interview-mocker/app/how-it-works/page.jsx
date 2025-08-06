"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "../dashboard/_component/Header";

export default function HowItWorks() {
  return (
    <div>
      <Header/>
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">How PREPTIK Works</h1>
      <p className="text-gray-700 mb-6">
        PREPTIK is your AI-powered mock interview assistant designed to help you
        practice and improve your interview skills through voice, webcam, and
        AI-generated feedback.
      </p>

      <ol className="list-decimal pl-6 space-y-4 text-gray-800">
        <li>
          <strong>Create a Mock Interview:</strong> Select the job position,
          experience level, and description.
        </li>
        <li>
          <strong>Answer Interview Questions:</strong> Questions are generated
          automatically. Use your microphone to record your answer.
        </li>
        <li>
          <strong>AI Feedback:</strong> After each question, PREPTIK evaluates
          your answer with a rating and improvement tips.
        </li>
        <li>
          <strong>Webcam Integration:</strong> Simulates a real-life interview
          setting to help you feel confident.
        </li>
        <li>
          <strong>Review & Improve:</strong> At the end, review feedback on all
          questions and refine your skills.
        </li>
      </ol>

      <div className="mt-8">
        <Link href="/dashboard">
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Start Practicing
          </Button>
        </Link>
      </div>
    </div>
    </div>
  );
}
