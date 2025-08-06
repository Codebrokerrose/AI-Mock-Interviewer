import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

// Define the MockInterview table schema
export const MockInterView = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const UserAnswer=pgTable("userAnswer",{
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAnswer: text("correctAnswer"),
  userAnswer: text("userAnswer"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
})
