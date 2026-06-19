from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def analyze_resume(resume_text):

    prompt = f"""

    Analyze this resume.

    Return ONLY valid JSON.

    {{
    "ats_score": 85,
    "summary": "",
    "recommended_roles": [],
    "skills_found": [],
    "missing_skills": [],
    "improvements": [],
    "strengths": [],
    "weaknesses": [],
    "learning_roadmap": []
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