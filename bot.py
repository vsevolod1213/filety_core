import asyncio
from aiogram import Bot, Dispatcher, types, F
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
import os
from dotenv import load_dotenv
from aiogram.handlers import MessageHandler
from transcription import transcription
#from pathlib import Path
from io import BytesIO

load_dotenv()

TOKEN = os.getenv("api_token")
bot = Bot(token=TOKEN, default_bot_properties=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp= Dispatcher()

#files_dir = Path("whisper/files")

@dp.message(CommandStart())
async def send_welcome(message: Message):
    await message.answer(
        "Привет! Отправь мне аудиофайл, и я его расшифрую."
    )

@dp.message(F.document | F.audio | F.voice)
class TranscribeHandler(MessageHandler):
    async def handle(self):
        message = self.event
        await message.answer("Получил файл, начинаю расшифровку... (это может занять время)")
        
        file_obj = message.document or message.audio or message.voice
        if not file_obj:
            await message.answer("Не удалось получить файл. Попробуйте еще раз.")
            return
        
        bio = BytesIO()
        await bot.download(file_obj, destination=bio)

        text = await asyncio.to_thread(transcription, bio)

        await message.answer(f"{text}")


async def main():
    me = await bot.get_me()
    print(f"Бот запущен: @{me.username} (id: {me.id})")
    await dp.start_polling(bot)
if __name__ == "__main__":
    asyncio.run(main())