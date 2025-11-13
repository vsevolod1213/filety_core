from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from transcription import which_file

app = FastAPI(tiyle="Failety API")

app.get("/health")
async def health_check():
    return {"status": "ok"}

app.get("/translate")
async def translate_file(file: UploadFile = File(...)):
    content = await file.read()
    try:
        text = await asyncio.to_thread(which_file, content, media_type=file.content_type)
        return {"transcription": text}
    except Exception as e:
        return {"error": "Transcription failed"}