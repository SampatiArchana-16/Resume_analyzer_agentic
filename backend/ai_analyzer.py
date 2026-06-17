from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def analyze_resume(resume_text):

    prompt = f"""
You are an ATS Resume Analyzer.

Analyze the resume and return ONLY valid JSON.

Example:

{{
  "ats_score": 85,
  "skills_found": ["Python", "FastAPI"],
  "missing_skills": ["Docker", "AWS"],
  "improvements": [
    "Add GitHub profile",
    "Add quantified achievements"
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

    return response.choices[0].message.content