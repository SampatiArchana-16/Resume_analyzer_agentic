from fastapi import FastAPI, UploadFile, File

from fastapi.middleware.cors import CORSMiddleware

import shutil
import json
import os

from resume_parser import extract_text
from ai_analyzer import analyze_resume

app = FastAPI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


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

    print("GPT RESULT:")
    print(result)

    try:
        return json.loads(result)

    except Exception as e:
        return {
            "error": str(e),
            "raw_response": result
        }