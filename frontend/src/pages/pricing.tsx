import Head from "next/head";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0 ₽",
    label: "5 минут в день",
    bullets: ["Первые тесты", "TXT/SRT/VTT", "Очередь по приоритету"],
    action: "Начать бесплатно",
  },
  {
    name: "Pro",
    price: "1 990 ₽/мес",
    label: "до 15 часов",
    bullets: ["Длинные файлы", "Приоритетная обработка", "Webhook и экспорт"],
    action: "Оформить Pro",
  },
  {
    name: "Team",
    price: "запрос",
    label: "API + SLA",
    bullets: ["Групповые лимиты", "Уведомления", "Поддержка 24/7"],
    action: "Связаться",
  },
];

export default function PricingPage() {
  const title = "Filety Тарифы — бесплатный старт и план Pro";
  const description = "Выберите объём: Free для тестов, Pro для работы, Team для интеграций.";
  const url = "https://filety.ru/pricing";
  const ogImage = "https://filety.ru/og.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Filety Pricing",
    description,
    url,
    itemListElement: plans.map((plan, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: plan.name,
      price: plan.price.replace(/[^0-9]/g, "") || "0",
      priceCurrency: "RUB",
      description: plan.label,
    })),
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
          <div className="container relative mx-auto space-y-6 px-4 py-20 text-center sm:py-24">
            <p className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em]">Pricing</p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">Тарификация без сюрпризов</h1>
            <p className="text-base text-white/80 sm:text-lg">Начните бесплатно и обновляйтесь, когда понадобится больше минут.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/transcribe" className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900">
                Запустить транскрипцию
              </Link>
              <a href="mailto:hi@filety.ru" className="rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white">
                Написать команде
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-950">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className="rounded-[32px] border border-slate-200/70 bg-slate-50/80 p-6 text-slate-900 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-50"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{plan.name}</p>
                <p className="mt-4 text-3xl font-semibold">{plan.price}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{plan.label}</p>
                <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-8 w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-600 dark:bg-white dark:text-slate-900"
                >
                  {plan.action}
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
