import Head from "next/head";
import Link from "next/link";

const heroFacts = ["Без лишних шагов", "Рус/Eng", "TXT · SRT · VTT"];
const services = [
  {
    title: "Транскрибируйте аудио",
    text: "Загрузите запись, получите текст и субтитры в пару кликов.",
    href: "/transcribe",
    badge: "Готово",
  },
  {
    title: "Конвертируйте файлы",
    text: "Смените формат или извлеките аудио без браузерных ограничений.",
    href: "/convert",
    badge: "В разработке",
  },
  {
    title: "Следующий инструмент",
    text: "Готовим новые утилиты для обработки файлов. Подпишитесь чтобы узнать первым.",
    href: "/pricing",
    badge: "Скоро",
  },
];
const highlights = [
  { title: "Скорость", text: "Файлы обрабатываются на сервере, UI остаётся отзывчивым." },
  { title: "Форматы", text: "Принимаем длинные аудио и видео, сохраняем таймкоды." },
  { title: "Контроль", text: "Минимум настроек, максимум ясности и экспортов." },
];

export default function Home() {
  const title = "Filety — быстрые инструменты для аудио и видео";
  const description = "Транскрибируйте и конвертируйте файлы онлайн. Минимальный интерфейс, точный результат.";
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
          <div className="container relative mx-auto flex flex-col gap-8 px-4 py-20 sm:py-24 lg:flex-row lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]">Filety</p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Работайте с файлами
                <br />
                без лишних шагов
              </h1>
              <p className="text-base text-white/80 sm:text-lg">Выберите инструмент и получите результат. Всё остальное делает сервер.</p>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.4em] text-white/70 sm:text-sm">
                {heroFacts.map((fact) => (
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
                  Перейти к транскрипции
                </Link>
                <Link
                  href="/convert"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white hover:-translate-y-0.5"
                >
                  Посмотреть конвертацию
                </Link>
              </div>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-lg">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="rounded-[28px] border border-white/10 bg-white/10 p-5 text-white shadow-2xl backdrop-blur transition hover:-translate-y-1"
                >
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]">
                    {service.badge}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{service.text}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-white/90">Открыть →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200/60 bg-white py-14 dark:border-slate-800/60 dark:bg-slate-950">
          <div className="container mx-auto grid gap-4 px-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-5 text-sm text-slate-700 dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-200"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{item.title}</p>
                <p className="mt-3 text-base text-slate-900 dark:text-white">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-950">
          <div className="container mx-auto flex flex-col gap-8 px-4 lg:flex-row">
            <div className="rounded-[32px] border border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/60">
              <h2 className="text-xl font-semibold">Что доступно сейчас</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li>• Транскрибируйте длинные файлы и скачивайте результат.</li>
                <li>• Следите за статусом задач прямо в браузере.</li>
                <li>• Экспортируйте TXT, SRT и VTT без правок.</li>
              </ul>
            </div>
            <div className="rounded-[32px] border border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/60">
              <h2 className="text-xl font-semibold">Что готовим</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Запускаем конвертацию, новые форматы и API. Подключите уведомления через почту в личном кабинете после релиза.
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow dark:bg-white dark:text-slate-900"
              >
                Посмотреть тарифы
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
