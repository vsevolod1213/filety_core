// frontend/src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru" dir="ltr">
      <Head>
        {/* Фавикон/манифест/PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#111827" />

        {/* Быстрые соединения под шрифты/статик */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* Базовые OG, которые страницы расширят */}
        <meta property="og:site_name" content="Filety" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Tailwind v4 классы можно сразу навесить на body */}
      <body className="antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
