from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_service import analyze_career, analyze_resume
import fitz  # PyMuPDF

app = FastAPI(title="AI Career Guidance System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CareerRequest(BaseModel):
    skills: str
    experience: str

@app.get("/")
def root():
    return {"message": "AI Career Guidance API is running!"}

@app.post("/analyze")
def analyze(request: CareerRequest):
    result = analyze_career(request.skills, request.experience)
    return {"guidance": result}

@app.post("/analyze-resume")
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    # Read PDF
    contents = await file.read()
    pdf = fitz.open(stream=contents, filetype="pdf")
    
    # Extract text from all pages
    text = ""
    for page in pdf:
        text += page.get_text()
    
    # Send to AI
    result = analyze_resume(text)
    return {"guidance": result}
