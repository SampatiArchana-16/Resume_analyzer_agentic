from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import os
import shutil
import json

from resume_parser import extract_text
from ai_analyzer import analyze_resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://venerable-flan-f3b8d0.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@app.get("/")
def home():
    return {
        "message": "Resume Analyzer API Running"
    }

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text(file_path)

    result = analyze_resume(resume_text)

    print("GPT RESPONSE:")
    print(result)

    try:
        return json.loads(result)

    except Exception as e:
        return {
            "error": str(e),
            "raw_response": result
        }