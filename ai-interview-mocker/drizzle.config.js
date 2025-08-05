import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: "postgresql://Ai-interview_owner:npg_U5u1bkavQGgp@ep-wispy-lab-a8ttfa67-pooler.eastus2.azure.neon.tech/Ai-interview?sslmode=require&channel_binding=require",
  },
});
