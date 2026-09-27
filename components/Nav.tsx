"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/endpoints", label: "Endpoints" },
  { href: "/models", label: "Models" },
  { href: "/keys", label: "API Keys" },
  { href: "/docs", label: "Usage" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex h-screen w-56 shrink-0 flex-col border-r border-line bg-panel p-4">
      <div className="mb-8 px-2">
        <div className="text-lg font-semibold tracking-tight text-white">⌁ Gateway</div>
        <div className="text-xs text-white/40">your models, one endpoint</div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {LINKS.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
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
  );
}
