# 🎯 AI Career Guidance System

**An AI-powered career counseling platform that analyzes a user's skills, experience, or resume (PDF) and generates personalized career guidance using LLM-based reasoning.**

---

## 📌 Problem Statement

Students and early-career professionals often struggle to identify the right career path, the skill gaps they need to fill, and a clear learning roadmap — especially without access to personalized mentorship. Generic career advice found online is rarely tailored to an individual's actual skills and experience.

**AI Career Guidance System** solves this by using a large language model to act as a virtual career counselor — taking a user's skills/experience (or their resume directly) and generating a structured, personalized career plan in seconds.

---

## 🎯 Objectives

- Provide personalized career path suggestions based on a user's actual skills and experience
- Support both **manual skill input** and **direct resume (PDF) upload**
- Identify skill gaps and generate a learning roadmap to close them
- Suggest concrete, suitable job roles to apply for
- Give actionable resume improvement tips (for the resume-analysis flow)

---

## 🏗️ Architecture

             ┌───────────────────────────┐
             │   React Frontend (UI)     │
             └─────────────┬─────────────┘
                           │
             ┌─────────────▼─────────────┐
             │   FastAPI Backend (API)   │
             └─────────────┬─────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                      │
        ┌─────────▼─────────┐ ┌─────────▼─────────┐
│ /analyze │ │ /analyze-resume │
│ (manual skills + │ │ (PDF resume │
│ experience input)│ │ upload) │
└─────────┬─────────┘ └─────────┬─────────┘
│ │
│ ┌─────────────▼─────────────┐
│ │ PyMuPDF (fitz) extracts │
│ │ text from the PDF │
│ └─────────────┬─────────────┘
│ │
└──────────────────┬───────────────────┘
▼
┌───────────────────────────┐
│ Groq API (Llama 3.3 70B) │
│ Generates structured │
│ career guidance │
└───────────────────────────┘


---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI |
| AI / LLM | Groq API (`llama-3.3-70b-versatile`) |
| Resume Parsing | PyMuPDF (`fitz`) |
| Frontend | React (Create React App) |
| Environment Config | python-dotenv |

---

## 📂 Project Structure

ai-career-guidance/
├── backend/
│ ├── main.py # FastAPI app and API routes
│ ├── gemini_service.py # LLM logic (career & resume analysis via Groq)
│ ├── .env # Groq API key (not committed)
│ └── requirements.txt
└── frontend/
├── src/ # React application source
└── public/


---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check — confirms the API is running |
| `POST` | `/analyze` | Takes manually entered `skills` and `experience`, returns personalized career guidance |
| `POST` | `/analyze-resume` | Accepts a PDF resume upload, extracts its text, and returns personalized career guidance based on its content |

**Example `/analyze` request:**
```json
POST /analyze
{
  "skills": "Python, FastAPI, React, SQL",
  "experience": "Built 2 full-stack projects, 6-month internship as a backend developer"
}
```

**Example response:**
```json
{
  "guidance": "1. Top 3 suitable career paths: ...\n2. Skill gaps to fill: ...\n3. Recommended learning roadmap: ...\n4. Suggested job roles to apply for: ..."
}
```

**`/analyze-resume`** takes a `multipart/form-data` request with a `file` field containing the PDF, and returns the same style of structured guidance — additionally including a current skill assessment and resume improvement tips.

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Shivesh1p/ai-career-guidance.git
cd ai-career-guidance
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

GROQ_API_KEY=your_groq_api_key_here

(Get a free key at [console.groq.com/keys](https://console.groq.com/keys))

Run the backend:
```bash
uvicorn main:app --reload
```
API available at: `http://127.0.0.1:8000`

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```
App available at: `http://localhost:3000`

---

## 🧪 How It Works

1. **Manual input flow:** User enters their skills and experience in the UI → sent to `/analyze` → Groq-powered LLM generates career paths, skill gaps, and a learning roadmap.
2. **Resume upload flow:** User uploads a PDF resume → backend extracts the text using PyMuPDF → sent to `/analyze-resume` → LLM generates a skill assessment, career paths, skill gaps, a learning roadmap, job role suggestions, and resume improvement tips.

---

## 🔭 Future Scope

- Add ChromaDB-based vector search to ground suggestions in real job-market data
- Support multiple resume formats (DOCX, plain text)
- Add user accounts to save and track guidance history over time
- Expand the learning roadmap into clickable course/resource links

---

## 👤 Author

**Shivesh Pandey**
Final Year B.E. Information Technology, Shree L.R. Tiwari College of Engineering

---

## 📄 License

This project is developed for academic and portfolio purposes.