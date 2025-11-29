import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, loading, logout, logoutAll } = useAuth();

  const formatDate = (value: string) => {
    try {
      return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(value));
    } catch {
      return value;
    }
  };

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>

      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col gap-6 px-4 py-12">
        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center text-slate-500 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
            Загружаем данные профиля...
          </div>
        )}

        {!loading && !user && (
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Требуется авторизация</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Похоже, что доступ к профилю закрыт. Выполните вход, чтобы продолжить.
            </p>
            <Link
              href="/auth/login"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              На страницу входа
            </Link>
          </div>
        )}

        {user && (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex flex-col gap-1 text-sm uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                Профиль
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 dark:text-slate-400">Email</span>
                  <span className="text-base font-semibold text-slate-900 dark:text-white">{user.email}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 dark:text-slate-400">Тариф</span>
                  <span className="text-base font-semibold text-slate-900 dark:text-white">
                    {user.tariffPlan === 0 ? "Бесплатный" : `Тариф #${user.tariffPlan}`}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 dark:text-slate-400">Регистрация</span>
                  <span className="text-base font-semibold text-slate-900 dark:text-white">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Безопасность</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Управляйте активными сессиями и выходите из аккаунта, если потеряли устройство.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    void logout();
                  }}
                  className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-purple-400 hover:text-purple-500 active:scale-95 dark:border-slate-700 dark:text-slate-200"
                >
                  Выйти из аккаунта
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void logoutAll();
                  }}
                  className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 active:scale-95 dark:bg-white dark:text-slate-900"
                >
                  Выйти на всех устройствах
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
