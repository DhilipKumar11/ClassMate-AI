# ClassMate AI
**Voice-Enabled AI Teaching Assistant for Government Schools**

## Problem Statement
Government school teachers often teach large classrooms with students from diverse linguistic backgrounds. Many students struggle to understand complex concepts taught in English, while teachers frequently spend valuable classroom time simplifying lessons and translating textbook content.

ClassMate AI is designed to assist teachers during live classroom sessions by providing voice-enabled concept simplification and bilingual translation support, helping bridge language and learning gaps.

---

## Solution Overview
ClassMate AI is an AI-powered classroom assistant that enables teachers to interact using voice commands.

The system can:

- Simplify complex concepts into conversational Hinglish explanations.
- Generate classroom-friendly visual representations of concepts.
- Transcribe spoken textbook content.
- Translate educational content between English and Hindi.
- Display both original and translated content on a smart board.
- Read explanations and translations aloud.

The solution is designed specifically for multilingual government-school classrooms.

---

## Features

### 1. Live Concept Simplification
Teachers can ask questions such as:

> "Explain Photosynthesis for Class 8 students."
The system will:

- Convert speech to text.
- Generate a simple Hinglish explanation.
- Provide a real-world example.
- Create a visual concept diagram.
- Read the explanation aloud.
- Display all content on the smart board.

---

### 2. Bilingual Dictation & Translation
Teachers can dictate textbook content such as:

> "Photosynthesis is the process by which green plants prepare food."
The system will:

- Convert speech to text.
- Display the original text.
- Translate the content into Hindi.
- Display both versions side-by-side.
- Provide audio playback.

---

## Target Users

- Government school teachers
- Multilingual classrooms
- Students learning through English-medium textbooks
- Schools equipped with smart boards or projectors

---

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Mermaid.js
- Web Speech API
- SpeechSynthesis API

### Backend

- FastAPI
- Python

### AI

- Google Gemini API

### Deployment

- Frontend: Vercel
- Backend: Vercel (Serverless)

---

## System Architecture
Teacher Voice Input
↓
Speech-to-Text
↓
Intent Detection
↓
Feature Selection
├── Concept Simplification
└── Bilingual Translation
↓
Gemini AI
↓
Response Generation
↓
Visual Generation
↓
Text-to-Speech
↓
Smart Board Display

---

## Key Design Decisions

### Hinglish-First Learning
Many students understand concepts better when explanations mix Hindi and English naturally. The system therefore prioritizes conversational Hinglish explanations.

### Visual Learning Support
Concept diagrams are generated to improve understanding and classroom engagement.

### Voice-First Interaction
Teachers can interact with the system without interrupting classroom flow.

### Smart Board Optimization
The interface is designed for large-screen classroom displays.

### Accessibility
Text and audio outputs support different learning preferences.

---

## Offline Resilience
Government schools may experience intermittent internet connectivity.

To improve usability:

- Previously generated explanations can be cached.
- Translation history can be stored locally.
- Users receive clear notifications when connectivity issues occur.

---

## Future Enhancements

- Additional regional language support
- Voice-triggered quizzes
- Lesson plan generation
- Student assessment tools
- Offline AI support
- Learning analytics dashboard

---

## Installation

### Clone Repository

```
git clone <your-repo-link>
cd classmate-ai
```

### Frontend

```
cd frontend
npm install
npm run dev
```

### Backend

```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Environment Variables
Create a `backend/.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

---

## Demo Workflow

### Concept Simplification

1. Teacher clicks microphone.
2. Teacher says:
"Explain Photosynthesis for Class 8."
3. AI generates Hinglish explanation
4. Real-life example comes up
5. Visual diagram shown
6. Explanation is spoken aloud.

### Bilingual Translation

1. Teacher dictates textbook content.
2. AI transcribes speech.
3. AI translates to Hindi.
4. Both versions are displayed.
5. Audio playback is available.

---

## Impact
ClassMate AI aims to make classroom learning more accessible, engaging, and inclusive by reducing language barriers and helping teachers deliver concepts more effectively in multilingual government-school environments.

---
