"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button, Card, Input } from "@/components/ui";

type Endpoint = {
  id: string;
  name: string;
  slug: string;
  baseUrl: string;
  createdAt: number;
};

type ModelCount = { total: number; enabled: number };

export default function EndpointsPage() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [modelCounts, setModelCounts] = useState<Record<string, ModelCount>>({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", baseUrl: "", apiKey: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<string, string>>({});
  const [manualModel, setManualModel] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    const [epRes, modRes] = await Promise.all([
      fetch("/api/admin/endpoints").then((r) => r.json()),
      fetch("/api/admin/models").then((r) => r.json()),
    ]);
    setEndpoints(epRes.endpoints ?? []);
    const counts: Record<string, ModelCount> = {};
    for (const m of modRes.models ?? []) {
      const c = counts[m.endpointId] ?? { total: 0, enabled: 0 };
      c.total += 1;
      if (m.enabled) c.enabled += 1;
      counts[m.endpointId] = c;
    }
    setModelCounts(counts);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addEndpoint(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/admin/endpoints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to add endpoint");
      return;
    }
    setForm({ name: "", baseUrl: "", apiKey: "" });
    load();
  }

  async function deleteEndpoint(id: string) {
    if (!confirm("Remove this endpoint and every model registered under it?")) return;
    await fetch(`/api/admin/endpoints/${id}`, { method: "DELETE" });
    load();
  }

  async function syncModels(id: string) {
    setStatus((s) => ({ ...s, [id]: "Fetching models..." }));
    const res = await fetch(`/api/admin/endpoints/${id}/fetch-models`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus((s) => ({ ...s, [id]: data.error ?? "Sync failed" }));
      return;
    }
    const msg =
      data.added > 0
        ? `✓ Synced — ${data.added} new model${data.added === 1 ? "" : "s"} added (${data.fetched} available total). Go to Models to enable them.`
        : `✓ Already up to date — all ${data.fetched} available models are registered. Go to Models to enable them.`;
    setStatus((s) => ({ ...s, [id]: msg }));
    load();
  }

  async function addManualModel(id: string) {
    const modelId = manualModel[id]?.trim();
    if (!modelId) return;
    const res = await fetch(`/api/admin/endpoints/${id}/models`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelId }),
    });
    if (res.ok) {
      setManualModel((s) => ({ ...s, [id]: "" }));
      setStatus((s) => ({ ...s, [id]: `Added "${modelId}".` }));
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Endpoints</h1>
      <p className="mt-1 text-sm text-white/40">
        Add every provider you have a key for — OpenAI-compatible base URL + API key. Works with OpenAI, Groq,
        Together, Fireworks, Mistral, DeepSeek, OpenRouter itself, local Ollama, or your own server.
      </p>

      <Card className="mt-6">
        <form onSubmit={addEndpoint} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <Input
            placeholder="Name (e.g. openai)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            placeholder="Base URL (e.g. https://api.openai.com/v1)"
            value={form.baseUrl}
            onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
            required
            className="sm:col-span-2"
          />
          <Input
            type="password"
            placeholder="API key"
            value={form.apiKey}
            onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
            required
          />
          <div className="sm:col-span-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "+ Add endpoint"}
            </Button>
            {error && <span className="ml-3 text-sm text-red-400">{error}</span>}
          </div>
        </form>
      </Card>

      <div className="mt-6 flex flex-col gap-4">
        {loading && <p className="text-sm text-white/40">Loading...</p>}
        {!loading && endpoints.length === 0 && (
          <p className="text-sm text-white/40">No endpoints yet — add your first one above.</p>
        )}
        {endpoints.map((ep) => {
          const counts = modelCounts[ep.id];
          return (
          <Card key={ep.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{ep.name}</span>
                  <span className="font-mono text-xs text-white/40">{ep.slug}</span>
                  {counts ? (
                    <Badge tone={counts.enabled > 0 ? "green" : "default"}>
                      {counts.total} model{counts.total === 1 ? "" : "s"} · {counts.enabled} enabled
                    </Badge>
                  ) : (
                    <Badge>0 models synced</Badge>
                  )}
                </div>
                <div className="mt-1 font-mono text-xs text-white/40">{ep.baseUrl}</div>
              </div>
              <div className="flex gap-2">
                {counts && counts.total > 0 && (
                  <Link href="/models">
                    <Button variant="ghost">View models</Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={() => syncModels(ep.id)}>
                  Sync models
                </Button>
                <Button variant="danger" onClick={() => deleteEndpoint(ep.id)}>
                  Delete
                </Button>
              </div>
            </div>
            {status[ep.id] && <p className="mt-3 text-xs text-white/50">{status[ep.id]}</p>}
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Manually add a model id (if /models isn't supported)"
                value={manualModel[ep.id] ?? ""}
                onChange={(e) => setManualModel((s) => ({ ...s, [ep.id]: e.target.value }))}
                className="max-w-sm"
              />
              <Button variant="ghost" onClick={() => addManualModel(ep.id)}>
                Add
              </Button>
            </div>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
