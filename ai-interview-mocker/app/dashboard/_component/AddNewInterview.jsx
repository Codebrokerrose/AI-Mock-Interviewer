"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Make sure this exists or use a <button> element
import { Input } from "@/components/ui/input"; // Make sure this exists or use a <input> element
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircle } from "lucide-react";
import { MockInterView } from "@/utils/schema";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid"; // Ensure you have uuid installed
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition,setJobPosition] = useState();
  const [jobDesc,setJobDesc] = useState();
  const [jobExperience,setJobExperience] = useState();
  const [loading ,setLoading] = useState(false);
  const [JsonResponse,setJsonResponse] = useState([]);
  const router = useRouter();
  const {user}=useUser();

  const onSubmit =async(e) => {  // Handle form submission
    setLoading(true);
    e.preventDefault();

    const InputPromt = "Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+", Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interviww question with answered in json format, Give question and answerd as field on JSON"; // Adjust the prompt as needed

    const result=await chatSession.sendMessage(InputPromt);

    // Log the response from the AI model
    const MockJsonResponse = (result.response.text()).replace('```json','').replace('```','');

    console.log(JSON.parse(MockJsonResponse));
    setJsonResponse(MockJsonResponse); // Store the response in state for further use

    if(MockJsonResponse){ // If the response is valid, proceed to insert into the database
      const resp=await db.insert(MockInterView).values({
        mockId:uuidv4(),
        jsonMockResp: MockJsonResponse,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdAt: moment().format("DD-MM-YYYY"),
      }).returning({mockId:MockInterView.mockId}); //at each insertion to db we get mockId

      console.log("Inserted ID",resp);
      if(resp){
        setOpenDialog(false); // Close the dialog after successful insertion
        router.push(`/dashboard/interview/${resp[0].mockId}`); // Redirect to the interview page with the mockId
      }
    }else{
      console.error("Failed to generate mock interview questions");
    }

    setLoading(false);
    
  }

  // Render the dialog component
  // This will be triggered when the user clicks on the "Add New" button
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <div
          className="p-10 border rounded-lg bg-purple-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
          onClick={() => setOpenDialog(true)}
        >
          <h2 className="text-lg text-center">+ Add New</h2>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Tell us more about your job interviwing
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <h2>
                Add details about your job position/role, Job description and
                years of experience
              </h2>

              <div className="mt-7 my-3">
                <label>Job Role/Job Position</label>
                <Input placeholder="Ex. Full Stack Developer" required 
                onChange={(e) => setJobPosition(e.target.value)} value={jobPosition}
                />
              </div>
              <div className="my-3">
                <label>Job Description/ Tech Stack (In Short)</label>
                <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" required
                onChange={(e) => setJobDesc(e.target.value)} value={jobDesc}
                />
              </div>
              <div className="my-3">
                <label>Years of experience</label>
                <Input placeholder="Ex. 5" type="number" max="100" required 
                onChange={(e) => setJobExperience(e.target.value)} value={jobExperience}
                />
              </div>
              {/* Dialog Body */}
              <div className="flex justify-end gap-4 mt-4">
                <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-purple-500" type="submit" disabled={loading}>
                  {loading? <>
                  <LoaderCircle className="animate-spin"/>'Generating from AI'</>:'Start Interview'
                  }
                  
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewInterview;
