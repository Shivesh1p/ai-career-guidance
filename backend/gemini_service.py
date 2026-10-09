import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_career(skills: str, experience: str) -> str:
    prompt = f"""
    You are an expert career guidance counselor.
    
    A student has provided the following details:
    Skills: {skills}
    Experience/Projects: {experience}
    
    Please provide:
    1. Top 3 suitable career paths
    2. Skill gaps to fill
    3. Recommended learning roadmap
    4. Suggested job roles to apply for
    
    Be specific, practical and encouraging.
    """
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    return response.choices[0].message.content
def analyze_resume(resume_text: str) -> str:
    prompt = f"""
    You are an expert career guidance counselor and resume analyst.
    
    Analyze the following resume and provide:
    1. Current skill assessment
    2. Top 3 suitable career paths based on the resume
    3. Skill gaps to fill
    4. Recommended learning roadmap
    5. Suggested job roles to apply for
    6. Resume improvement tips
    
    Resume Content:
    {resume_text}
    
    Be specific, practical and encouraging.
    """
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    return response.choices[0].message.content
