"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "../dashboard/_component/Header";

export default function HowItWorks() {
  return (
    <div>
      <Header />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">
          How PREPTIK Works
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          PREPTIK is your all-in-one AI-powered mock interview assistant that
          helps you simulate real-life interview experiences — right from your
          browser. Whether you're preparing for a software engineering role at a
          top tech company or a marketing associate position at a startup,
          PREPTIK adapts to your needs using voice interaction, webcam
          simulation, and smart AI feedback.
        </p>

        <ol className="list-decimal pl-6 space-y-6 text-gray-800 leading-relaxed">
          <li>
            <strong>🧑‍💼 Create a Mock Interview:</strong>
            <br />
            Choose your desired <span className="font-medium">
              job role
            </span>{" "}
            (e.g., Frontend Developer, HR Manager, Data Analyst),
            <span className="font-medium"> experience level</span> (e.g.,
            Entry-Level, Mid-Level, Senior), and add an optional
            <span className="font-medium"> job description</span> or JD to
            personalize the questions.
            <br />
            <span className="italic text-sm text-gray-600">
              Example: Applying for "Frontend Developer with React expertise at
              a SaaS startup."
            </span>
          </li>

          <li>
            <strong>🎤 Answer Interview Questions:</strong>
            <br />
            PREPTIK generates context-specific questions. Use your microphone to
            respond naturally — as if you're speaking to a real interviewer.
            <br />
            <span className="italic text-sm text-gray-600">
              Example Question: "How do you manage state in a large React
              application?"
            </span>
          </li>

          <li>
            <strong>🧠 Receive Instant AI Feedback:</strong>
            <br />
            After each response, PREPTIK gives you an AI-generated rating (out
            of 10) and personalized improvement tips based on clarity, content
            depth, tone, and delivery.
            <br />
            <span className="italic text-sm text-gray-600">
              Example Feedback: "7/10 - Great use of terminology. Try to
              elaborate on using Redux Toolkit for better state management."
            </span>
          </li>

          <li>
            <strong>📹 Real-Life Simulation via Webcam:</strong>
            <br />
            Enable your webcam to simulate eye contact and body language
            analysis — key components in behavioral and HR interviews. This
            helps you get comfortable with virtual or in-person interviews.
            <br />
            <span className="italic text-sm text-gray-600">
              Tip: Maintain posture and eye contact as PREPTIK monitors
              engagement and confidence.
            </span>
          </li>

          <li>
            <strong>📈 Review & Improve:</strong>
            <br />
            Once the session is over, access a detailed report with:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Per-question feedback and scores</li>
              <li>Speech clarity and filler word analysis</li>
              <li>Summary of strengths and improvement areas</li>
              <li>
                Download or export your session report for future reference
              </li>
            </ul>
          </li>
        </ol>

        <div className="mt-10">
          <Link href="/dashboard">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              🚀 Start Practicing Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
