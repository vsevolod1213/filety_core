import { useTheme } from "./ThemeProvider";

const options = [
  { value: "light", label: "Свет", icon: "L" },
  { value: "system", label: "Авто", icon: "A" },
  { value: "dark", label: "Ночь", icon: "D" },
] as const;

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white/80 p-1 text-xs font-medium shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      {options.map(({ value, label, icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`flex items-center gap-1 rounded-full px-3 py-1 transition ${
              active
                ? "bg-brand-700 text-white shadow"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
            aria-pressed={active}
          >
            <span aria-hidden>{icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
