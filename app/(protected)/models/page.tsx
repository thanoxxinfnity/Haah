"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Input } from "@/components/ui";

type Model = {
  id: string;
  endpointId: string;
  modelId: string;
  enabled: boolean;
  endpointName: string;
  endpointSlug: string;
  requestCount: number;
  lastUsedAt: number | null;
};

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/admin/models").then((r) => r.json());
      setModels(res.models ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(
    () => models.filter((m) => m.id.toLowerCase().includes(query.toLowerCase())),
    [models, query]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Model[]>();
    for (const m of filtered) {
      const list = map.get(m.endpointId) ?? [];
      list.push(m);
      map.set(m.endpointId, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  async function toggle(id: string, enabled: boolean) {
    setBusy((b) => ({ ...b, [id]: true }));
    // Optimistic: flip local state immediately, don't wait on a re-read.
    setModels((prev) => prev.map((m) => (m.id === id ? { ...m, enabled } : m)));
    await fetch(`/api/admin/models/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
    setBusy((b) => ({ ...b, [id]: false }));
  }

  async function remove(id: string) {
    setModels((prev) => prev.filter((m) => m.id !== id));
    await fetch(`/api/admin/models/${encodeURIComponent(id)}`, { method: "DELETE" });
  }

  async function bulk(enabled: boolean, endpointId?: string) {
    // Optimistic: apply to local state right away instead of waiting on a
    // re-read of the store, which can lag right after a write.
    setModels((prev) =>
      prev.map((m) => (!endpointId || m.endpointId === endpointId ? { ...m, enabled } : m))
    );
    await fetch("/api/admin/models/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled, ids: "all", endpointId }),
    });
  }

  const totalEnabled = models.filter((m) => m.enabled).length;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white sm:text-2xl">Models</h1>
          <p className="mt-1 text-sm text-white/40">
            {totalEnabled} of {models.length} models are live on your gateway.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => bulk(true)} className="flex-1 sm:flex-none">
            Add all
          </Button>
          <Button variant="ghost" onClick={() => bulk(false)} className="flex-1 sm:flex-none">
            Remove all
          </Button>
        </div>
      </div>

      <Input
        placeholder="Search models..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-6 sm:max-w-sm"
      />

      <div className="mt-6 flex flex-col gap-6">
        {loading && <p className="text-sm text-white/40">Loading...</p>}
        {!loading && grouped.length === 0 && (
          <p className="text-sm text-white/40">
            No models yet. Go to <span className="text-white/60">Endpoints</span> and sync a provider first.
          </p>
        )}
        {grouped.map(([endpointId, list]) => (
          <div key={endpointId} className="rounded-2xl border border-line bg-panel p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-medium text-white">{list[0].endpointName}</div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => bulk(true, endpointId)}>
                  Add all
                </Button>
                <Button variant="ghost" onClick={() => bulk(false, endpointId)}>
                  Remove all
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-col divide-y divide-line">
              {list.map((m) => (
                <div key={m.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <input
                      type="checkbox"
                      checked={m.enabled}
                      disabled={busy[m.id]}
                      onChange={(e) => toggle(m.id, e.target.checked)}
                      className="h-4 w-4 shrink-0 accent-accent"
                    />
                    <span className="break-all font-mono text-sm text-white/80">{m.id}</span>
                    {m.enabled && <Badge tone="green">live</Badge>}
                    {m.requestCount > 0 && <Badge>{m.requestCount} calls</Badge>}
                  </div>
                  <button
                    onClick={() => remove(m.id)}
                    className="shrink-0 text-xs text-white/30 hover:text-red-400"
                    title="Remove from registry"
                  >
                    remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
