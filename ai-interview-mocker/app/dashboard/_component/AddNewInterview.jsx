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

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition,setJobPosition] = useState();
  const [jobDesc,setJobDesc] = useState();
  const [jobExperience,setJobExperience] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
  }

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
                onchange={(e) => setJobPosition(e.target.value)} value={jobPosition}
                />
              </div>
              <div className="my-3">
                <label>Job Description/ Tech Stack (In Short)</label>
                <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" required
                onchange={(e) => setJobDesc(e.target.value)} value={jobDesc}
                />
              </div>
              <div className="my-3">
                <label>Years of experience</label>
                <Input placeholder="Ex. 5" type="number" max="100" required 
                onchange={(e) => setJobExperience(e.target.value)} value={jobExperience}
                />
              </div>
              {/* Dialog Body */}
              <div className="flex justify-end gap-4 mt-4">
                <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Start Interview</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewInterview;
