"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard", short: "Home", icon: "⌂" },
  { href: "/endpoints", label: "Endpoints", short: "Endpoints", icon: "⇄" },
  { href: "/models", label: "Models", short: "Models", icon: "▤" },
  { href: "/keys", label: "API Keys", short: "Keys", icon: "⚿" },
  { href: "/docs", label: "Usage", short: "Docs", icon: "✎" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-panel px-4 md:hidden">
        <div className="text-base font-semibold tracking-tight text-white">⌁ Gateway</div>
        <button onClick={logout} className="text-xs text-white/40 hover:text-white">
          Log out
        </button>
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-panel md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${
                active ? "text-accent" : "text-white/50"
              }`}
            >
              <span className="text-lg leading-none">{link.icon}</span>
              {link.short}
            </Link>
          );
        })}
      </nav>

      {/* Desktop sidebar */}
      <nav className="fixed inset-y-0 left-0 hidden w-56 shrink-0 flex-col border-r border-line bg-panel p-4 md:flex">
        <div className="mb-8 px-2">
          <div className="text-lg font-semibold tracking-tight text-white">⌁ Gateway</div>
          <div className="text-xs text-white/40">your models, one endpoint</div>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active ? "bg-accent/15 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <button
          onClick={logout}
          className="rounded-lg px-3 py-2 text-left text-sm text-white/40 transition hover:bg-white/5 hover:text-white"
        >
          Log out
        </button>
      </nav>
    </>
  );
}
