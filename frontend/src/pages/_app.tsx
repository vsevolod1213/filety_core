// frontend/src/pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  const title = "Filety — транскрипция аудио и видео";
  const description =
    "Быстрая транскрипция аудио и видео, поддержка длинных файлов, удобный веб-интерфейс и API.";
  const url = "https://filety.ru";
  const image = `${url}/og.png`;

  return (
    <>
      {/* Дефолт на случай, если страница ничего своего не задала */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <ThemeProvider>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
          <Header />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
