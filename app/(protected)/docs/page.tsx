import { Card } from "@/components/ui";

function Code({ children }: { children: string }) {
  return (
    <pre className="scrollbar-thin overflow-x-auto rounded-lg bg-base p-4 text-xs text-white/70">{children}</pre>
  );
}

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-white">Usage</h1>
      <p className="mt-1 text-sm text-white/40">
        Your gateway speaks the OpenAI API format. Point any OpenAI-compatible SDK at it and pick models by{" "}
        <code className="text-white/60">endpoint-slug/model-id</code>.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        <Card>
          <div className="mb-2 text-sm font-medium text-white">1. List your enabled models</div>
          <Code>{`curl https://<your-domain>/api/v1/models \\
  -H "Authorization: Bearer gw-sk-..."`}</Code>
        </Card>

        <Card>
          <div className="mb-2 text-sm font-medium text-white">2. Chat completion (any provider, one route)</div>
          <Code>{`curl https://<your-domain>/api/v1/chat/completions \\
  -H "Authorization: Bearer gw-sk-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [{ "role": "user", "content": "hello" }],
    "stream": false
  }'`}</Code>
        </Card>

        <Card>
          <div className="mb-2 text-sm font-medium text-white">3. Using the OpenAI Python SDK</div>
          <Code>{`from openai import OpenAI

client = OpenAI(
    base_url="https://<your-domain>/api/v1",
    api_key="gw-sk-...",
)

resp = client.chat.completions.create(
    model="groq/llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "hello"}],
)
print(resp.choices[0].message.content)`}</Code>
        </Card>

        <Card>
          <div className="mb-2 text-sm font-medium text-white">4. Using the OpenAI Node SDK</div>
          <Code>{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://<your-domain>/api/v1",
  apiKey: "gw-sk-...",
});

const resp = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user", content: "hello" }],
});`}</Code>
        </Card>

        <Card>
          <div className="mb-2 text-sm font-medium text-white">How routing works</div>
          <p className="text-sm text-white/50">
            Any POST to <code className="text-white/70">/api/v1/&lt;anything&gt;</code> (chat/completions,
            completions, embeddings, ...) is authenticated against your gateway keys, then forwarded to whichever
            endpoint owns the <code className="text-white/70">model</code> you asked for — with that provider's own
            API key attached. Streaming responses are passed straight through.
          </p>
        </Card>
      </div>
    </div>
  );
}
