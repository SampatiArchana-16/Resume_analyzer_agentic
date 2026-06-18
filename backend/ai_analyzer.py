from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def analyze_resume(resume_text):

    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the resume and return ONLY valid JSON.

Return in this format:

{{
    "ats_score": 85,

    "summary": "Short professional summary",

    "recommended_roles": [
        "AI Engineer",
        "Machine Learning Engineer",
        "Python Developer"
    ],

    "skills_found": [
        "Python",
        "FastAPI"
    ],

    "missing_skills": [
        "Docker",
        "AWS"
    ],

    "improvements": [
        "Add quantified achievements",
        "Add certifications"
    ],

    "strengths": [
        "Strong Python skills",
        "Good backend development experience"
    ],

    "weaknesses": [
        "Limited cloud experience",
        "No containerization experience"
    ],

    "learning_roadmap": [
        "Month 1: Learn Docker",
        "Month 2: Learn AWS",
        "Month 3: Learn Kubernetes"
    ]
}}

Resume:

{resume_text}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    result = response.choices[0].message.content

    # Remove markdown code fences
    result = result.replace("```json", "")
    result = result.replace("```", "")
    result = result.strip()

    return result