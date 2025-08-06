"use client"
import { MockInterView } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

    const {user}=useUser();
    const [interviewList,setInterviewList] = useState([]);

    useEffect(()=>{
        user&&GetInterviewList(); // if user available then get the interview list 
    },[user])

    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterView)
        .where(eq(MockInterView.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterView.id));

        setInterviewList(result);
    }

  return (
    <div>
      <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
      <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList&&interviewList.map((interview,index)=>(
            <InterviewItemCard 
            interview={interview}
            key={index} />
        ))}
      </div>
    </div>
  )
}

export default InterviewList
