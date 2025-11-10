import Head from "next/head";
import Link from "next/link";
import FileUploader from "@/components/FileUploader";

const stats = [
  { label: "Размер", value: "до 2 ГБ" },
  { label: "Экспорт", value: "TXT · SRT · VTT" },
  { label: "Время", value: "~5 мин / час аудио" },
];

const flow = [
  { title: "Загрузка", text: "Перетащите файл, проверяем тип и ограничение." },
  { title: "Обработка", text: "Сервер извлекает аудио и делает транскрипт." },
  { title: "Готово", text: "Получаете текст и таймкоды, можно скачать." },
];

const perks = ["Русский и английский", "Тонкий контроль громкости", "Тема свет/тём/авто", "Минимальный UI"];

export default function TranscribePage() {
  const title = "Транскрипция аудио и видео онлайн — Filety";
  const description = "Перетащите аудио или видео и получите чистый текст без лишних элементов.";
  const url = "https://filety.ru/transcribe";
  const ogImage = "https://filety.ru/og.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Filety — транскрипция аудио и видео",
    description,
    provider: { "@type": "Organization", name: "Filety", url: "https://filety.ru" },
    areaServed: "RU",
    offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
    url,
  };

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
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-slate-950 via-purple-800 to-rose-500 text-white dark:border-slate-800/60">
          <div className="absolute inset-0 opacity-30" aria-hidden>
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)]" />
          </div>
          <div className="container relative mx-auto grid gap-10 px-4 py-24 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em]">
                Транскрипция
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Сервис для расшифровки без перегруза.
                <br />
                Только загрузка и результат.
              </h1>
              <p className="text-lg text-white/80">Длинные записи, минимальный UI, режимы темы.</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/80">
                {perks.map((perk) => (
                  <span key={perk} className="rounded-full border border-white/30 px-3 py-1">
                    {perk}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#upload"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5"
                >
                  Загрузить файл
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white hover:-translate-y-0.5"
                >
                  Цены
                </Link>
              </div>
            </div>
            <div id="upload" className="space-y-6">
              <FileUploader />
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm text-white/90 backdrop-blur">
                <p className="font-medium">Результат появится здесь</p>
                <p className="mt-2 text-white/70">После запуска API мы покажем текст, длительность и ссылки на экспорт.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-950">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            {flow.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 text-slate-900 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-50"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{item.title}</p>
                <p className="mt-3 text-base text-slate-700 dark:text-slate-200">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
