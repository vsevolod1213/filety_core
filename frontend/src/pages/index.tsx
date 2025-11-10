import Head from "next/head";
import Link from "next/link";

const tiles = [
  {
    title: "Транскрипция",
    description: "Перетащите аудио или видео — получайте текст и субтитры.",
    href: "/transcribe",
    accent: "from-purple-600/90 via-fuchsia-500/80 to-rose-400/70",
  },
  {
    title: "Конвертация",
    description: "Следующий релиз: лёгкий инструмент для преобразования форматов.",
    href: "/convert",
    accent: "from-purple-500/80 via-pink-500/70 to-orange-300/60",
  },
];

const quickFacts = ["Длинные файлы", "Сохранение таймкодов", "TXT / SRT / VTT", "Чистый интерфейс"];

export default function Home() {
  const title = "Filety — сервисы для работы с аудио и видео";
  const description = "Минималистичные инструменты: транскрипция, конвертация и работа с файлами.";
  const url = "https://filety.ru";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Filety" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://filety.ru/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-slate-950 via-purple-800 to-rose-500 text-white dark:border-slate-800/50">
          <div className="absolute inset-0 opacity-40" aria-hidden>
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_60%)]" />
          </div>
          <div className="container relative mx-auto flex flex-col gap-8 px-4 py-24 lg:flex-row lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]">
                Filety
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Минимальный интерфейс.
                <br />
                Максимум пользы для ваших файлов.
              </h1>
              <p className="text-lg text-white/80">
                Фокус на скорости: загрузка, результат, экспорт. Без сложностей и лишних текстов.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-white/80">
                {quickFacts.map((fact) => (
                  <span key={fact} className="rounded-full border border-white/30 px-3 py-1">
                    {fact}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/transcribe"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5"
                >
                  Попробовать транскрипцию
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white hover:-translate-y-0.5"
                >
                  Цены
                </Link>
              </div>
            </div>
            <div className="grid w-full gap-6 lg:max-w-md">
              {tiles.map((tile) => (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-lg transition hover:-translate-y-1"
                >
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${tile.accent}`} />
                  <h3 className="mt-4 text-2xl font-semibold">{tile.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{tile.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-white/90">
                    Перейти →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200/60 bg-white py-16 dark:border-slate-800/60 dark:bg-slate-950">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            {["чёткий текст", "таймкоды", "экспорт"].map((label) => (
              <div
                key={label}
                className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 text-center text-sm uppercase tracking-[0.4em] text-slate-500 dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-400"
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-950">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">
            <article className="rounded-[32px] border border-slate-200/70 bg-gradient-to-br from-slate-950 via-purple-800 to-rose-500 p-8 text-white shadow-2xl dark:border-slate-800/70">
              <h2 className="text-3xl font-semibold">Filety фокусируется на главном</h2>
              <p className="mt-4 text-white/80">Современный дизайн, режимы темы, быстрые страницы.</p>
              <ul className="mt-8 space-y-3 text-white/80">
                <li>• Всегда светлая, всегда тёмная или авто</li>
                <li>• Ничего лишнего — только сервисы Filety</li>
                <li>• Стабильные Core Web Vitals</li>
              </ul>
            </article>
            <article className="rounded-[32px] border border-slate-200/70 bg-slate-50/80 p-8 text-slate-900 shadow-lg dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-50">
              <h3 className="text-2xl font-semibold">Что дальше</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Запускаем конвертацию и обновляем FileUploader. Следите за обновлениями.
              </p>
              <Link
                href="/transcribe"
                className="mt-8 inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow dark:bg-white dark:text-slate-900"
              >
                Перейти к транскрипции →
              </Link>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
