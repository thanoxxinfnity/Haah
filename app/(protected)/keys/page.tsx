"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@/components/ui";

type Key = { id: string; name: string; prefix: string; createdAt: number };

export default function KeysPage() {
  const [keys, setKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/keys").then((r) => r.json());
    setKeys(res.keys ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createKey(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/admin/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name || "Unnamed key" }),
    });
    const data = await res.json();
    setCreating(false);
    setName("");
    setNewKey(data.key);
    load();
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
      <h1 className="text-2xl font-semibold text-white">API Keys</h1>
      <p className="mt-1 text-sm text-white/40">
        Issue keys for your own apps to call the gateway. Each key can call every model you've enabled.
      </p>

      {newKey && (
        <Card className="mt-6 border-accent/40 bg-accent/5">
          <div className="text-sm font-medium text-white">Copy this key now — it won't be shown again.</div>
          <div className="mt-3 flex items-center gap-2">
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
        <form onSubmit={createKey} className="flex gap-3">
          <Input placeholder="Key name (e.g. my-app)" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit" disabled={creating}>
            {creating ? "Generating..." : "+ Generate key"}
          </Button>
        </form>
      </Card>

      <div className="mt-6 flex flex-col gap-2">
        {loading && <p className="text-sm text-white/40">Loading...</p>}
        {!loading && keys.length === 0 && <p className="text-sm text-white/40">No API keys yet.</p>}
        {keys.map((k) => (
          <Card key={k.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">{k.name}</div>
              <div className="mt-1 font-mono text-xs text-white/40">
                {k.prefix}••••••••&nbsp;&nbsp;·&nbsp;&nbsp;created {new Date(k.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Button variant="danger" onClick={() => remove(k.id)}>
              Revoke
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
