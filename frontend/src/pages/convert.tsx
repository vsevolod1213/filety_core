import Head from "next/head";
import Link from "next/link";

const formats = ["MP3", "WAV", "AAC", "MP4", "MOV", "WEBM"];
const actions = [
  { title: "Измените формат", text: "Audio → Audio, Video → Video" },
  { title: "Извлеките звук", text: "Видео в чистое аудио" },
  { title: "Сожмите файл", text: "Оптимальные параметры для расшаривания" },
];
const steps = [
  { title: "1. Выбор", text: "Перетащите файл, выберите нужный пресет." },
  { title: "2. Обработка", text: "ffmpeg работает на сервере, браузер не зависает." },
  { title: "3. Ссылка", text: "Скачивание и временный weblink." },
];

export default function ConvertPage() {
  const title = "Filety Конвертация — смена форматов аудио и видео";
  const description = "Поменяйте формат, извлеките аудио или подготовьте файл к публикации.";
  const url = "https://filety.ru/convert";
  const ogImage = "https://filety.ru/og.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Filety Convert",
    description,
    provider: { "@type": "Organization", name: "Filety", url: "https://filety.ru" },
    areaServed: "RU",
    url,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-slate-950 via-purple-800 to-rose-500 text-white dark:border-slate-800/60">
          <div className="absolute inset-0 opacity-40" aria-hidden>
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent_60%)]" />
          </div>
          <div className="container relative mx-auto grid gap-10 px-4 py-20 sm:py-24 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em]">Convert</p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Быстрая конвертация без плагинов
              </h1>
              <p className="text-base text-white/80 sm:text-lg">Готовим инструмент для смены форматов и извлечения аудио напрямую на сервере.</p>
              <div className="flex flex-wrap gap-2 text-sm text-white/80">
                {formats.map((format) => (
                  <span key={format} className="rounded-full border border-white/30 px-3 py-1">
                    {format}
                  </span>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {actions.map((action) => (
                  <div key={action.title} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">{action.title}</p>
                    <p className="mt-2 text-white/90">{action.text}</p>
                  </div>
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
                  Узнать цены
                </Link>
              </div>
            </div>
            <div className="space-y-4 rounded-[32px] border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Скоро</p>
              <p className="text-white/90">Мы подключим тот же загрузчик, что и для транскрипции, плюс пресеты для популярных задач.</p>
              <p className="text-sm text-white/70">Оставьте заявку на тарифах, чтобы получить уведомление.</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-950">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 text-slate-900 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-50"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{step.title}</p>
                <p className="mt-3 text-base text-slate-700 dark:text-slate-200">{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
