"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Card, Input } from "@/components/ui";

type Key = {
  id: string;
  name: string;
  prefix: string;
  createdAt: number;
  requestCount: number;
  lastUsedAt: number | null;
};

export default function KeysPage() {
  const [keys, setKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/admin/keys").then((r) => r.json());
      setKeys(res.keys ?? []);
      setLoading(false);
    })();
  }, []);

  async function createKey(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/admin/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name || "Unnamed key" }),
    });
    const data = await res.json().catch(() => ({}));
    setCreating(false);
    if (!res.ok) return;
    setName("");
    setNewKey(data.plaintext);
    // Use the server's own response — the store can lag a moment after a
    // write, so re-fetching right away can miss the key we just created.
    setKeys((prev) => [data.key, ...prev]);
  }

  async function remove(id: string) {
    if (!confirm("Revoke this API key? Anything using it will stop working immediately.")) return;
    setKeys((prev) => prev.filter((k) => k.id !== id));
    await fetch(`/api/admin/keys/${id}`, { method: "DELETE" });
  }

  function copy() {
    if (!newKey) return;
    navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-white sm:text-2xl">API Keys</h1>
      <p className="mt-1 text-sm text-white/40">
        Issue keys for your own apps to call the gateway. Each key can call every model you've enabled.
      </p>

      {newKey && (
        <Card className="mt-6 border-accent/40 bg-accent/5">
          <div className="text-sm font-medium text-white">Copy this key now — it won't be shown again.</div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="flex-1 overflow-x-auto rounded-lg bg-base px-3 py-2 text-sm text-white">{newKey}</code>
            <Button variant="ghost" onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <button onClick={() => setNewKey(null)} className="mt-3 text-xs text-white/40 hover:text-white">
            Dismiss
          </button>
        </Card>
      )}

      <Card className="mt-6">
        <form onSubmit={createKey} className="flex flex-col gap-3 sm:flex-row">
          <Input placeholder="Key name (e.g. my-app)" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit" disabled={creating} className="w-full sm:w-auto">
            {creating ? "Generating..." : "+ Generate key"}
          </Button>
        </form>
      </Card>

      <div className="mt-6 flex flex-col gap-2">
        {loading && <p className="text-sm text-white/40">Loading...</p>}
        {!loading && keys.length === 0 && <p className="text-sm text-white/40">No API keys yet.</p>}
        {keys.map((k) => (
          <Card key={k.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-white">{k.name}</span>
                <Badge tone={k.requestCount > 0 ? "green" : "default"}>
                  {k.requestCount} call{k.requestCount === 1 ? "" : "s"}
                </Badge>
              </div>
              <div className="mt-1 font-mono text-xs text-white/40">
                {k.prefix}•••••••• · created {new Date(k.createdAt).toLocaleDateString()}
                {k.lastUsedAt && <> · last used {new Date(k.lastUsedAt).toLocaleString()}</>}
              </div>
            </div>
            <Button variant="danger" onClick={() => remove(k.id)} className="w-full sm:w-auto">
              Revoke
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
