# PhotoLearn

PhotoLearn is an interactive web application designed to help users learn the fundamentals of photography through hands-on simulators, quizzes, and a creative playground. Built with Next.js and React, it features a modern, responsive UI and a simple Flask backend for future extensibility.

## Features

- **Step-by-step Learning Flow:**
  - Learn about ISO, Aperture, and Shutter Speed with interactive simulators and practical examples.
  - Each topic includes a quick check to reinforce learning.
  - Progress is visually tracked with a dynamic progress bar and step bubbles.
  - After completing the quiz, the entire learn section becomes fully navigable.

- **Quiz:**
  - Test your knowledge with a mix of simulator-based and scenario-based questions.
  - Responsive feedback and a detailed summary of your answers at the end.
  - Only your final answer for each question is shown in the summary.

- **Playground:**
  - Upload your own images and experiment with camera settings in real time.
  - Drag-and-drop or browse to upload, with a UI that works in both light and dark mode.

- **Modern UI/UX:**
  - Clean, accessible design with clear navigation and progress indicators.
  - Fully responsive and mobile-friendly.

## Getting Started

### Frontend (Next.js)

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend (Flask)

A simple Flask backend is included in `backend/app.py`.

1. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Run the backend:
   ```bash
   python app.py
   ```
   The backend will start on http://localhost:5000

#### Endpoints
- `GET /` — Health check, returns `{ "status": "ok" }`
- `POST /echo` — Echoes back posted JSON as `{ "you_sent": ... }`

## Future Flask Backend Improvements
- Save user progress and quiz results to a database
- User authentication and profiles
- Image analysis or feedback (e.g., auto-detecting settings from uploaded images)
- Leaderboards or sharing results
- More advanced API endpoints for lesson/quiz content

## Contributing

_Contributors:_
- Shivan Mukherjee
- Allyce Chung
- Janie
- Jalaj Mehta

---

PhotoLearn is open source and welcomes feedback and contributions!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
