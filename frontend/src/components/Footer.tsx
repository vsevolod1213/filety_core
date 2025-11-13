import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-8 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Filety. Работаем с аудио и видео.</p>
        <div className="flex gap-4">
          
          <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white">
            Тарифы
          </Link>
          <a href="mailto:hi@filety.ru" className="hover:text-slate-900 dark:hover:text-white">
          Для связи
          </a>
          <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white">
            Политика конфиденциальности
          </Link>

        </div>
      </div>
    </footer>
  );
}
