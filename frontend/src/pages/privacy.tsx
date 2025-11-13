import Head from "next/head";

export default function PrivacyPage() {
  const title = "Filety Privacy — как мы работаем с данными";
  const description = "Filety не продаёт и не передаёт пользовательские файлы. Данную политику уточним с юристом.";
  const url = "https://filety.ru/privacy";

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
        <meta property="og:image" content="https://filety.ru/og.png" />
      </Head>

      <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <section className="container mx-auto space-y-6 px-4 py-16">
          <h1 className="text-3xl font-semibold">Политика конфиденциальности</h1>
          <p>
            Это предварённая версия документа. Юрист финализирует детали перед запуском платного функционала. Ниже фиксируем нашу позицию
            по работе с данными.
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              <strong>Файлы.</strong> Загруженные аудио и видео используются только для транскрипции/конвертации и не передаются третьим лицам. По
              завершении задачи временные файлы удаляются автоматически.
            </p>
            <p>
              <strong>Текст и результаты.</strong> Расшифровки не индексируются и не попадают в сторонние сервисы. Пользователь сам решает, хранить ли
              результат в личном кабинете.
            </p>
            <p>
              <strong>Cookies и аналитика.</strong> Используем только технические cookies (сессии, авторизация). Рекламных пикселей нет.
            </p>
            <p>
              <strong>Контакты.</strong> По вопросам приватности пишите на <a className="text-purple-500" href="mailto:privacy@filety.ru">privacy@filety.ru</a>.
            </p>
            <p>
              <strong>Обновления.</strong> Финальный документ будет опубликован перед релизом Pro-плана. Пользователи получат уведомление.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
