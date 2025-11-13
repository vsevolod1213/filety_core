import { useId } from "react";

const FASTAPI_HOSTNAME = process.env.NEXT_PUBLIC_FASTAPI_HOSTNAME;

type FileUploaderProps = {
  onUploadStart?: () => void;
  onUploadSuccess?: (text: string) => void;
  onUploadError?: (message: string) => void;
};

export async function uploadToServer(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://api.filety.online/translate", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function FileUploader({ onUploadStart, onUploadSuccess, onUploadError }: FileUploaderProps) {
  const inputId = useId();
  const accept = "audio/*,video/*";

  async function handleUploader(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files?.[0];
    if (!files) return;

    onUploadStart?.();

    try {
      const result = await uploadToServer(files);
      onUploadSuccess?.(result.transcription ?? "Нет текста. Попробуйте другой файл.");
    } catch (error) {
      const message = (error as Error).message || "Ошибка при загрузке файла.";
      onUploadError?.(message);
    }
  }

  return (
    <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 text-center shadow-2xl shadow-brand-700/20 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/60">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">Загрузка</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Перетащите аудио или видео</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Файлы до 2 ГБ, обработка сразу на сервере.</p>

      <label
        htmlFor={inputId}
        className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/60 bg-slate-50/70 px-6 py-10 text-slate-500 transition hover:border-brand-700/60 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
      >
        <svg width="48" height="48" fill="none" stroke="currentColor" className="mb-4 text-brand-700">
          <path strokeWidth="1.5" d="M24 10v28M12 24h24" />
        </svg>
        <span className="text-base font-medium text-slate-700 dark:text-white">Нажмите или перетащите файл</span>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">audio/video</span>
      </label>

      <input id={inputId} type="file" accept={accept} className="sr-only" onChange={handleUploader} />
    </div>
  );
}
