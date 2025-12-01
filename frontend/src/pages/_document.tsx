// frontend/src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru" dir="ltr">
      <Head>
        {/* Статические фавиконки для поисковиков и всех браузеров */}
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icon-mask.svg" color="#111827" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        {/* Динамическая подмена фавиконки для светлой/тёмной темы */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var light = '/favicon-light.png';
                var dark = '/favicon-dark.png';
                function setIcon(matches) {
                  var link = document.querySelector('link[rel="icon"][data-dynamic="true"]');
                  if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    link.setAttribute('data-dynamic', 'true');
                    document.head.appendChild(link);
                  }
                  link.href = matches ? dark : light;
                }
                var media = window.matchMedia('(prefers-color-scheme: dark)');
                setIcon(media.matches);
                if (media.addEventListener) {
                  media.addEventListener('change', function(e) { setIcon(e.matches); });
                } else if (media.addListener) {
                  media.addListener(function(e) { setIcon(e.matches); });
                }
              })();
            `,
          }}
        />

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
