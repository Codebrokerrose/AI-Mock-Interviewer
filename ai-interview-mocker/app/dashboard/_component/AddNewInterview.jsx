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


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);

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
          <DialogTitle className="text-2xl">Tell us more about your job interviwing</DialogTitle>
          <DialogDescription>
           
            <h2>
              Add details about your job position/role, Job description and
              years of experience
            </h2>

            <div className="mt-7 my-2">
              <label>Job Role/Job Position</label>
              <Input placeholder="Ex. Full Stack Developer"/>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button>Start Interview</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewInterview;
