"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui";

export default function DashboardPage() {
  const [stats, setStats] = useState({ endpoints: 0, modelsEnabled: 0, modelsTotal: 0, keys: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const [epRes, modRes, keyRes] = await Promise.all([
        fetch("/api/admin/endpoints").then((r) => r.json()),
        fetch("/api/admin/models").then((r) => r.json()),
        fetch("/api/admin/keys").then((r) => r.json()),
      ]);
      setStats({
        endpoints: epRes.endpoints?.length ?? 0,
        modelsTotal: modRes.models?.length ?? 0,
        modelsEnabled: modRes.models?.filter((m: { enabled: boolean }) => m.enabled).length ?? 0,
        keys: keyRes.keys?.length ?? 0,
      });
      setLoaded(true);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/40">Your personal, unified AI gateway — one endpoint for every model.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Endpoints connected" value={stats.endpoints} loaded={loaded} />
        <Stat label="Models enabled" value={`${stats.modelsEnabled} / ${stats.modelsTotal}`} loaded={loaded} />
        <Stat label="API keys issued" value={stats.keys} loaded={loaded} />
        <Stat label="Unified route" value="/api/v1/*" loaded={loaded} mono />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <QuickLink href="/endpoints" title="1. Add an endpoint" desc="Paste a provider's base URL + API key." />
        <QuickLink href="/models" title="2. Enable models" desc="Sync and pick which models are live." />
        <QuickLink href="/keys" title="3. Create an API key" desc="Issue a gateway key for your app to use." />
      </div>

      <Card className="mt-8">
        <div className="mb-2 text-sm font-medium text-white">Call any model through one endpoint</div>
        <pre className="scrollbar-thin overflow-x-auto rounded-lg bg-base p-4 text-xs text-white/70">
{`curl https://<your-domain>/api/v1/chat/completions \\
  -H "Authorization: Bearer gw-sk-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [{ "role": "user", "content": "hello" }]
  }'`}
        </pre>
        <p className="mt-3 text-xs text-white/40">
          The model id is always <code className="text-white/60">endpoint-slug/model-id</code> — see the{" "}
          <Link href="/docs" className="text-accent underline">
            Usage
          </Link>{" "}
          page for full examples.
        </p>
      </Card>
    </div>
  );
}

function Stat({ label, value, loaded, mono = false }: { label: string; value: string | number; loaded: boolean; mono?: boolean }) {
  return (
    <Card>
      <div className="text-xs uppercase tracking-wide text-white/40">{label}</div>
      <div className={`mt-2 text-2xl font-semibold text-white ${mono ? "font-mono text-lg" : ""}`}>
        {loaded ? value : "—"}
      </div>
    </Card>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href}>
      <Card className="h-full transition hover:border-accent/50">
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="mt-1 text-xs text-white/40">{desc}</div>
      </Card>
    </Link>
  );
}
