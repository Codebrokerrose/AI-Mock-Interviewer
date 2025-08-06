import { text } from "drizzle-orm/gel-core";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  // Function to convert text to speech
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      // Check if the browser supports speech synthesis
      const speech = new SpeechSynthesisUtterance(text); // Create a new speech synthesis object
      window.speechSynthesis.speak(speech); // Speak the text
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid drid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 bg-purple-100 rounded-full md:text-sm  text-xs text-center cursor-pointer ${
                  activeQuestionIndex === index && `bg-purple-400 text-white`
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        <div className="border rounded-lg p-5 bg-purple-50 mt-10">
          <h2 className="flex gap-2 items-center text-purple-500">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm my-2 text-purple-700">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
