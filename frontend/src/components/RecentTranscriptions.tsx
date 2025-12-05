import { useState } from "react";
import { useRecentTranscriptions } from "@/hooks/useRecentTranscriptions";

const STATUS_STYLES: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  completed: { label: "Готово", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200" },
  processing: { label: "В процессе", className: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200" },
  pending: { label: "В очереди", className: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200" },
  error: { label: "Ошибка", className: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200" },
};

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const buildPreview = (text: string) => {
  if (text.length <= 150) {
    return text;
  }
  return `${text.slice(0, 150).trimEnd()}…`;
};

export default function RecentTranscriptions() {
  const { items, loading, error } = useRecentTranscriptions();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="border-t border-slate-200/60 bg-white py-12 dark:border-slate-800/60 dark:bg-slate-950">
      <div className="container mx-auto space-y-6 px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Недавние транскрипции</h2>
        </div>

        {loading && (
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200/70 bg-white/90 px-4 py-3 text-slate-600 shadow dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
            <span>Загружаем список транскрипций…</span>
          </div>
        )}

        {error && !loading && (
          <p className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-100">
            {error}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="rounded-3xl border border-slate-200 bg-white/90 px-4 py-6 text-center text-sm text-slate-500 shadow dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
            Пока нет транскрипций.
          </p>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className="space-y-4">
            {items.map((item) => {
              const statusStyle = STATUS_STYLES[item.status] ?? {
                label: item.status,
                className: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
              };
              const isExpanded = Boolean(expanded[item.id]);
              const text = isExpanded ? item.text : buildPreview(item.text);
              const canToggle = item.text.length > 150;

              return (
                <li
                  key={item.id}
                  className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                    <span>{formatDate(item.createdAt)}</span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold normal-case tracking-normal ${statusStyle.className}`}>
                      {statusStyle.label}
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-800 dark:text-slate-100">{text || "—"}</p>
                  {canToggle && (
                    <button
                      type="button"
                      onClick={() => {
                        toggle(item.id);
                      }}
                      className="mt-3 text-sm font-semibold text-purple-600 transition hover:text-purple-400 dark:text-purple-300"
                    >
                      {isExpanded ? "Скрыть" : "Показать полностью"}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
