// src/components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Главная" },
  { href: "/transcribe", label: "Транскрипция" },
  { href: "/pricing", label: "Цены" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const { pathname } = useRouter();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Filety
        </Link>
        <nav className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200/60 bg-slate-100/60 px-1 py-1 dark:border-slate-800/60 dark:bg-slate-900/60">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
