# PREPTIK – AI Mock Interview Assistant

PREPTIK is an AI-powered mock interview platform designed to simulate real-world interviews with the help of Gemini AI, voice input, and webcam support. It helps users practice interview questions, receive smart feedback, and improve their soft skills in a real-time environment.

---
## 🔗 Website
Access the live platform here: [PREPTIK – AI Mock Interviewer](https://preptik.vercel.app)
---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/), [HyperUI](https://www.hyperui.dev/)
- **Authentication:** [Clerk.dev](https://clerk.dev)
- **Database:** [PostgreSQL](https://www.postgresql.org/) via [Neon.tech](https://neon.tech)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **AI Q&A Generation:** Gemini AI (Google Generative AI)
- **Voice & Webcam:** `react-hook-speech-to-text`, `react-webcam`
- **Icons:** [Lucide.dev](https://lucide.dev)

---

## ✨ Features

- 👤 **User Authentication** with Clerk
- 🎤 **Voice Input** with Speech-to-Text
- 🎥 **Webcam Simulation** for realistic interview experience
- 🤖 **AI-generated Questions & Answers** using Gemini API
- 📈 **Real-time Feedback & Rating**
- 📦 **Data Storage** using Drizzle ORM + PostgreSQL
- 📃 **Detailed Report** with feedback and improvement tips

---

## 🔐 User Authentication Flow

```mermaid
graph TD
A[User Opens App] --> B[Login Screen]
B --> C[Enter Credentials]
C --> D{Are Credentials Valid?}
D -- Yes --> E[Access Granted]
E --> F[Load User Dashboard]
D -- No --> G[Access Denied]
G --> H[Display Error Message]
H --> I[Back to Landing Page]

