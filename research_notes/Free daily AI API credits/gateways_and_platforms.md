# Free daily/monthly AI API allowances: gateways and inference platforms (state as of late September 2026)

All facts accessed 2026-09-29 unless another date is stated. Method: official docs fetched via WebFetch (the fetch tool summarizes pages, so exact numbers are as summarized by that tool); search snippets and third-party blogs are flagged as secondary. No sign-ups, no keys used. Note: the well-known repo cheahjs/free-llm-api-resources could not be fetched (404 on the raw README and repo URL), so it was not used; mnfst/awesome-free-llm-apis was used as the community list instead.

## OpenRouter (free ":free" models)

### Takeaway
OpenRouter remains the best-known OpenAI-compatible multi-model gateway with a no-card free tier: 20 requests/min on all `:free` models, 50 requests/day with less than about $10 lifetime top-up and 1,000/day after a top-up. All free models are open-weight or "stealth" models; no Claude, GPT-class or Gemini-class flagship is free. Paying is the catch for South Asia (international card, Alipay or USDC only).

### Cited Findings
- Limits for `:free` models: less than $10 purchased gives 20 req/min and 50 req/day; $10 or more gives 20 req/min and 1,000 req/day. The doc says the higher ceiling starts "one credit below" the threshold (i.e. about $9+ all-time purchases). Usage is visible via `free_model_daily_requests` on `GET /api/v1/key`. Limits do not apply to BYOK requests or exempt accounts. — [OpenRouter limits docs](https://openrouter.ai/docs/api-reference/limits) (accessed 2026-09-29)
- OpenRouter's own 2026 comparison article (published 2026-06-15, updated 2026-09-24) confirms 20+ free models, 20 RPM, 50 RPD (1,000/day with $10 top-up), no card required, base URL `https://openrouter.ai/api/v1`. — [OpenRouter blog, Free LLM API in 2026](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/) (accessed 2026-09-29)
- Current free-model collection (as rendered on 2026-09-29): NVIDIA Nemotron 3 Ultra 550B-A55B (`nvidia/nemotron-3-ultra-550b-a55b:free`, 1M ctx), NVIDIA Nemotron 3 Super 120B-A12B (`:free`, 262K), Nemotron 3.5 Lightning (`:free`, 1M), Nemotron 3 Nano Omni (`:free`, 256K), Poolside Laguna S 2.1 (`poolside/laguna-s-2.1:free`, 262K), Laguna XS 2.1 (`:free`), Thinking Machines Inkling (`thinkingmachines/inkling:free`, 1.05M) and Inkling Small (`:free`), Qwen3.8 27B (`qwen/qwen3.8-27b:free`, 262K), Cohere North Mini Code (`cohere/north-mini-code:free`), dots-3-note-preview (`:free`), inclusionAI Ling 3.0 Flash Sante (`:free`), Liquid LFM2.5-2.6B (`:free`), plus an anonymous "Space Bunny Alpha" stealth model (`stealth/space-bunny-alpha`, 1M ctx) listed as the most-used. — [OpenRouter free models collection](https://openrouter.ai/collections/free-models) (accessed 2026-09-29; page is a rendered summary, list may be incomplete)
- None of the listed free models are Anthropic, OpenAI-GPT or Google Gemini models; the collection is dominated by NVIDIA, Poolside, Thinking Machines, Qwen, Cohere. — same collection page
- Privacy: OpenRouter's FAQ says it logs only metadata by default and controls prompt logging via privacy settings. — [OpenRouter FAQ](https://openrouter.ai/docs/faq) (accessed 2026-09-29). Community list says "free providers may log prompts for training" and the free-model endpoints are provided by third parties. — [mnfst/awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis) (accessed 2026-09-29). Stealth models in particular are typically logged by the provider (general knowledge, not verified in a 2026 source).
- Payment methods: major credit cards, Alipay, and USDC crypto. — [OpenRouter FAQ](https://openrouter.ai/docs/faq). Third-party (secondary): no UPI, net banking or domestic-only cards; crypto is USDC only, non-refundable, may carry a fee. — [MasterPrompting, AICredits vs OpenRouter](https://masterprompting.net/blog/aicredits-vs-openrouter-india) (2026-03-22)
- Model rotation: free model lists change often (the stealth model and preview names above did not exist in older lists). No official rotation policy quoted; treat IDs as unstable.

### Inferences
- The 50/day cap without top-up is only useful for testing; in a self-hosted gateway (LiteLLM etc.) the cap is per account, so it is shared across all free models.
- The ~$10 top-up unlock (20x more daily requests) is the best "value" upgrade in the survey, but blocked for many South Asian users without an international card or USDC.

### Gaps
- Exact current list of all `:free` IDs could not be pulled from `/api/v1/models` (fetch summarizer returned nothing usable). Whether the free-model counter is per key or per account not explicitly confirmed beyond "daily requests" language.

## Vercel AI Gateway

### Takeaway
Vercel gives every team a monthly free credit (reported as $5 per 30 days) on a subset of models, starting at first request; no card needed, but buying any credit permanently ends the free monthly credit. Free-tier model list is small and appears to be mostly cheap or promotional models, not flagship Claude/GPT/Gemini.

### Cited Findings
- Official: every team gets a free tier and a paid tier; the free tier "includes a subset of models, not the full catalog"; free requests are rate limited per model with lower limits; free credits start on the first gateway request; once you buy credits you move to the paid tier and "the monthly free credit no longer applies". No markup on tokens; you pay payment-processing fees; BYOK needs purchased credits. — [Vercel AI Gateway pricing](https://vercel.com/docs/ai-gateway/pricing) (page last_updated 2026-09-08; accessed 2026-09-29)
- Official rate-limit doc: free tier "lower limit per model", numbers deliberately not published ("Limits can change"); paid tier has no AI Gateway limits; 429 may originate upstream. — [Vercel rate limits](https://vercel.com/docs/ai-gateway/rate-limits) (last_updated 2026-09-08)
- The dollar amount is NOT stated on the official pages I could fetch. Secondary sources say $5 per 30 days, no card, and that adding a card/purchase permanently cancels free credits: [Agent Journal](https://agentjournal.dev/blog/vercel-ai-gateway-free/) (2026-08-16); search-result summaries from [TrueFoundry](https://www.truefoundry.com/blog/understanding-vercel-ai-gateway-pricing), [Continuum](https://continuumcode.ai/guides/vercel-ai-gateway-pricing/). Treat $5/month as likely but not confirmed on the official page.
- Which models: Free-tier filter page (`?freeTier=true`) as rendered showed essentially one free-tagged text model (`inclusionai/ling-3.0-flash-sante`) plus several $0-priced image/video/audio models; no monthly amount shown. — [Vercel model list, freeTier filter](https://vercel.com/ai-gateway/models?freeTier=true) (accessed 2026-09-29; rendering may be partial, dynamic page).
- Endpoint: OpenAI-compatible chat completions at `https://ai-gateway.vercel.sh/v1/chat/completions` with `Authorization: Bearer $AI_GATEWAY_API_KEY`. — [Vercel rate limits doc code sample](https://vercel.com/docs/ai-gateway/rate-limits)

### Inferences
- A free-credit user cannot then try flagship Claude/GPT via the free credit unless those models carry the free flag; not observed. The $5 would buy only a few hundred thousand tokens of a flagship model anyway.
- Card requirement is not at signup for the free credit (per secondary sources) but any upgrade requires a payment method; Vercel account signup itself (email/GitHub) not tested.

### Gaps
- Official dollar amount and exact free-eligible model list unconfirmed; India card/payment support for credit top-up not checked.

## Groq

### Takeaway
Groq has a permanent free plan with no card (community list), but the catalog on the free plan has shrunk to a handful of models: gpt-oss and Qwen3.8 27B at 30 RPM / 1,000 RPD / 8K TPM / 200K TPD.

### Cited Findings
- Free plan limits: `openai/gpt-oss-120b`, `gpt-oss-20b`, `gpt-oss-safeguard-20b`, `qwen/qwen3.8-27b`: 30 RPM, 1K RPD, 8K TPM, 200K TPD. Whisper-large-v3 (+turbo): 20 RPM, 2K RPD. Orpheus TTS: 10 RPM, 100 RPD. Prompt-guard models: 30 RPM, 14.4K RPD. Docs say exceptions may exist and to check the account limits page. — [Groq rate limits](https://console.groq.com/docs/rate-limits) (accessed 2026-09-29)
- Base URL `https://api.groq.com/openai/v1`; no card required per the community list. — [mnfst/awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis) (accessed 2026-09-29)
- Llama 3.3 70B is NOT in the current free-plan table on Groq's page although OpenRouter's 2026 article still lists it as free (stale). — Groq rate-limits page vs [OpenRouter blog](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/)

### Inferences
- The 8K TPM cap makes long-context agentic use impractical; good for short chat/tool-call bursts and speed.

### Gaps
- Phone/region verification during signup not checked.

## Cerebras

### Takeaway
Cerebras changed from a free daily tier to a $5 trial credit that expires after 30 days and requires a verified payment method: no longer suitable for a card-less user.

### Cited Findings
- Free Trial: `gpt-oss-120b` and `qwen-3.8-27b` at 5 RPM, 30K uncached TPM / 90K total TPM, 1M tokens/hour, 1M tokens/day. "$5 in free credits" that "expire 30 days after they're granted"; docs state there is no renewing free tier; playground and API access "require adding a verified payment method". — [Cerebras rate limits](https://inference-docs.cerebras.ai/support/rate-limits) (accessed 2026-09-29)
- Contradiction: OpenRouter's article (updated 2026-09-24) still says Cerebras "No card, 30 RPM, ~1M tokens/day, Llama 3.3 70B" — stale vs official docs. — [OpenRouter blog](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/)

### Inferences
- Recent change (recorded change from an always-free to trial model); community lists claiming permanent free are outdated.

### Gaps
- Exact date of the change not found.

## SambaNova

### Takeaway
SambaNova has a genuine no-card Free Tier (no payment method linked) but tiny: 20 RPM, 20 requests/day, 200K tokens/day, on 5 models including DeepSeek and gpt-oss-120b.

### Cited Findings
- Free Tier applies when no payment method is linked: 20 RPM, 20 RPD, 200,000 TPD. Models: DeepSeek-V3.1, Meta-Llama-3.3-70B-Instruct, gpt-oss-120b (production); DeepSeek-V3.2, gemma-4-31B-it (preview). Developer Tier (payment method linked): 60-240 RPM, 12,000-48,000 RPD, 20M TPD cap. — [SambaNova rate limits](https://docs.sambanova.ai/docs/en/models/rate-limits) (accessed 2026-09-29)
- OpenRouter's article says SambaNova needs a card at signup and a $5 trial credit: conflicts with official docs above (stale/incorrect). — [OpenRouter blog](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/)
- Base URL not fetched from official docs; SambaNova Cloud is generally `https://api.sambanova.ai/v1` (from general knowledge, not verified this session).

### Inferences
- 20 requests/day is very low; useful only as a backup lane in a router.

### Gaps
- Signup verification (phone/region) and base URL not verified.

## Together AI

### Takeaway
No ongoing free tier or signup credit found; a minimum ~$5 purchase is reported. Official pricing page shows one $0 model.

### Cited Findings
- Official docs: dynamic rate limits, 429/503 behavior; no free-tier info on the rate-limit page. — [Together rate limits](https://docs.together.ai/docs/rate-limits)
- Pricing page shows one zero-priced serverless model ("Ternary Bonsai 27B") and no explicit free credits. — [Together pricing](https://www.together.ai/pricing) (accessed 2026-09-29)
- Secondary (search summaries, conflicting): $5 minimum purchase, signup credit retired, no ongoing free tier as of Aug 2026. Older sources still mention $25 credits (likely outdated). — [CloudZero](https://www.cloudzero.com/blog/together-ai-pricing/), [continuumcode](https://continuumcode.ai/guides/together-ai-pricing/)

### Gaps
- Official statement on minimum purchase not verified; treat as unverified. Base URL (`https://api.together.xyz/v1`) from general knowledge.

## Fireworks AI

### Takeaway
No free credits; accounts with no payment method are capped at 10 RPM and Tier 1 needs a valid payment method.

### Cited Findings
- "No payment method or no credits" = 10 RPM; Tier 1 requires valid payment method and billing profile; no complimentary credits documented. — [Fireworks rate limits](https://docs.fireworks.ai/guides/quotas_usage/rate-limits) (accessed 2026-09-29; only via fetch summary)

### Gaps
- Whether any promotional signup credit exists in Sept 2026 not confirmed.

## Cloudflare Workers AI

### Takeaway
10,000 Neurons/day free on the Workers Free plan, no card, resetting 00:00 UTC, OpenAI-compatible endpoint available. Newer big models (Kimi K2.6/2.7-code, GLM 5.2/5.3, DeepSeek V4) need a paid plan or prepaid credits.

### Cited Findings
- 10,000 Neurons/day at no charge on both Free and Paid Workers plans; limits reset daily at 00:00 UTC; Free plan has no overage (upgrade for more). — [Cloudflare Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) (accessed 2026-09-29)
- Free-eligible: Llama 3.x, Mistral, Qwen, Gemma, OpenAI OSS, embeddings/audio/image. Paid-only: `@cf/moonshotai/kimi-k2.6`, `kimi-k2.7-code`, `@cf/zai-org/glm-5.2`, `glm-5.3`, `glm-5.3-flash`, `@cf/deepseek-ai/deepseek-v4-flash-0731`, `deepseek-v4-pro-0813` (need Workers Paid or prepaid AI Gateway credits). — same page
- OpenAI-compatible base URL: `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1` (chat completions, embeddings; `/responses` for gpt-oss only, non-streaming). — [Cloudflare OpenAI compat](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/) (accessed 2026-09-29)
- Community list: 75+ models, 10K Neurons shared across models. — [mnfst list](https://github.com/mnfst/awesome-free-llm-apis)

### Gaps
- Whether Cloudflare signup requires a card is not stated in docs (Free Workers plan historically does not); regional restrictions not checked.

## GitHub Models

### Takeaway
GitHub Models is RETIRED as of 2026-07-30 (was the source of free GPT-4o / Claude-class access in older lists). Any list still recommending it is stale.

### Cited Findings
- Retired for all customers on July 30, 2026 (playground, catalog, inference API, BYOK); stopped for new customers June 16, 2026; announced July 1; brownouts July 16 and 23. Migration suggested: Microsoft Foundry or GitHub Copilot. — [GitHub docs](https://docs.github.com/en/github-models/prototyping-with-ai-models) and [GitHub changelog 2026-07-30](https://github.blog/changelog/2026-07-30-github-models-is-now-retired/) (search results; accessed 2026-09-29)
- OpenRouter's Sept-2026 article still lists GitHub Models with GPT-4o and Claude 3.5 Sonnet: stale. — [OpenRouter blog](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/)

## NVIDIA build.nvidia.com / NIM

### Takeaway
Free hosted API for 100+ models via NVIDIA Developer Program, roughly 40 RPM, no credits, no card; limits are unpublished and vary by model/traffic. Official position: no way to raise limits on the free tier. Intended for prototyping.

### Cited Findings
- Base URL `https://integrate.api.nvidia.com/v1`; 100+ models; "40 RPM, 10,000 RPD" per community list; free with NVIDIA Developer Program membership. — [mnfst list](https://github.com/mnfst/awesome-free-llm-apis)
- NVIDIA forum: rate limit is "dependent on model, use-case and the amount of current overall traffic"; no official way to obtain an increase on the free tier; higher volume requires deploying NIM or paid partner endpoints. Many 2026 forum threads ask to raise 40 RPM to 200 RPM. — [NVIDIA forum thread](https://forums.developer.nvidia.com/t/rate-limit-increase-request-40-rpm-200-rpm-build-nvidia-com-free-tier/384546) (accessed 2026-09-29)
- Search summary: NVIDIA staff say build.nvidia.com no longer uses a credit system and limits are unpublished. — [forum search results](https://forums.developer.nvidia.com/t/request-for-nvidia-build-api-rate-limit-increase-40-rpm-200-rpm/373495) (secondary)
- Kilo docs note NVIDIA endpoints involve NVIDIA data collection terms. — [Kilo free-use doc](https://kilo.ai/docs/getting-started/using-kilo-for-free)

### Gaps
- build.nvidia.com FAQ page 404; phone verification requirement (historically required) not verified; official terms text not read.

## Hugging Face Inference Providers

### Takeaway
Free users get only $0.10/month of routed-inference credit ("subject to change"); PRO $2/month. Essentially a trial, not a daily allowance.

### Cited Findings
- Free users $0.10 monthly credits (Inference Providers only), PRO $2.00, Team/Enterprise $2 per seat; pay-as-you-go needs purchased credits; routed requests get credits, custom provider keys do not. — [HF pricing docs](https://huggingface.co/docs/inference-providers/pricing) (accessed 2026-09-29)
- OpenAI-compatible base URL `https://router.huggingface.co/v1` with an HF token. — same page (code sample)

## Kilo Gateway (Kilo Code)

### Takeaway
Newer gateway with free models that need no account or API key: 200 requests/hour per IP for anonymous use. Free models rotate as Kilo's partners change and may be logged/trained on.

### Cited Findings
- Base URL `https://api.kilo.ai/api/gateway/`; anonymous users limited to 200 req/hour per IP. — [Kilo models & providers](https://kilo.ai/docs/gateway/models-and-providers) (accessed 2026-09-29)
- "Auto Free" (`kilo-auto/free`) auto-routes to best available free models; warning: may route to providers that log prompts/outputs and use them to improve services; "Available free models change over time as Kilo partners with different inference providers". — [Kilo: Using Kilo for free](https://kilo.ai/docs/getting-started/using-kilo-for-free)
- Community list: 12 free models incl. NVIDIA Nemotron and Stepfun Step, no card, no key. — [mnfst list](https://github.com/mnfst/awesome-free-llm-apis); a search summary says 19 free models incl. `nvidia/nemotron-3-ultra-550b-a55b:free` (secondary). Count differs by source (12 vs 19 vs "40+" on a third-party plugin repo) — not reconciled.

### Inferences
- Best practical option for a no-card user: no signup at all, OpenAI-style; but per-IP limit and no SLA.

## Other free-tier providers found (brief)

- Google Gemini API (AI Studio): free tier with no card; free Flash-class models: Gemini 3.8/3.7/3.6/3.5 Flash and Flash-Lite variants, Gemini 2.5 Flash/Flash-Lite. Pro-class (Gemini 3.1 Pro Preview) not free on the pricing page. — [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing) (accessed 2026-09-29). Secondary (Sept 2026 article): about 20 requests/day on 3.8/3.7/3.6/3.5 Flash and 500/day on Flash-Lite; RPD resets midnight Pacific; unpaid-tier content may be used to improve Google products. — [ScriptByAI](https://www.scriptbyai.com/gemini-api-free-tier-limits/). Official docs say exact limits appear only in the AI Studio dashboard. — [Gemini rate limits](https://ai.google.dev/gemini-api/docs/rate-limits). Base URL: `https://generativelanguage.googleapis.com/v1beta` (OpenAI-compat at `/v1beta/openai/` from general knowledge). This is the only legitimate no-card free access to a Gemini-class (Flash) current model found; the flagship Pro is not free.
- Mistral (La Plateforme "Experiment" plan): free, ~1B tokens/month cap, ~1 req/s; requires phone verification; free mode may train on data unless opted out (Mistral says a privacy toggle exists; sources conflict on whether opt-in is mandatory). Base `https://api.mistral.ai/v1`. — [mnfst list](https://github.com/mnfst/awesome-free-llm-apis); [Price Per Token summary](https://pricepertoken.com/endpoints/mistral/free) (secondary)
- Ollama Cloud: free plan, 1 concurrent request, unpublished usage caps; OpenAI-compat via `https://ollama.com/v1` (community) / native `https://ollama.com/api`. Third-party sources conflict (session/weekly caps vs monthly starter credits). — [Ollama docs](https://docs.ollama.com/cloud), [DEV article](https://dev.to/amareswer/ollama-cloud-free-vs-pro-usage-limits-pricing-what-you-actually-get-2026-3ieo)
- Others on the mnfst list (no card): LLM7.io (anonymous, 10 RPM), OVHcloud AI Endpoints (2 RPM anonymous), Cohere (20 RPM, 1,000 calls/month, non-commercial), Aion Labs (20K tokens/day), Z.ai/Zhipu (GLM-4.7-Flash, 1 concurrent), ModelScope and SiliconFlow (need China identity verification, so not practical). — [mnfst list](https://github.com/mnfst/awesome-free-llm-apis)

## Any legitimate free daily access to Claude, GPT-class or Gemini-class flagships?

### Takeaway
Only partial. Gemini Flash-class (not Pro) is free daily via Google AI Studio (~20 req/day). OpenAI has a data-sharing complimentary-token program but it needs a paid usage tier. Anthropic offers only a small one-time credit (~$5, region-limited) and no daily free tier. GitHub Models (the former free source of GPT/Claude) is dead.

### Cited Findings
- Gemini free tier: see above (Flash-class, ~20 RPD on 3.5-3.8 Flash; Flash-Lite ~500 RPD). Data used to improve Google products.
- OpenAI complimentary daily tokens for organizations sharing data: Tiers 1-2 up to 250K tokens/day on premium models (gpt-4.5-preview, gpt-4.1, gpt-4o, o1) and 2.5M/day on mini models; Tiers 3-5 up to 1M and 10M. Another summary lists gpt-5 among premium models. Must opt into sharing inputs/outputs. — [cloudcredits.io](https://cloudcredits.io/providers/openai/programs/openai-data-sharing-and-complimentary-tokens-program); [OpenAI Help Center (403 on fetch; figures via search summary)](https://help.openai.com/en/articles/10306912-sharing-feedback-evaluation-and-fine-tuning-data-and-api-inputs-and-outputs-with-openai). Model lists are older-generation; current-status (Sept 2026) not verified on the official page. Tier 1 requires a paid balance (general knowledge), so card/payment needed.
- Anthropic: new API accounts reportedly get $5 free credit, not available in all countries (region list unpublished); pay-as-you-go afterward. Secondary sources only. — [Yangmao](https://yangmao.ai/en/providers/claude-api/) / [Aireiter](https://aireiter.com/blog/claude-api-free-credits-every-way) (search summaries; unverified against Anthropic's site). Programs: Claude for Startups, research credits, student programs.
- Vercel and OpenRouter: no free Claude/GPT flagships found in current free lists.
- I found no source on Puter.js (user-pays model) in this pass.

### Gaps
- Official Anthropic and OpenAI pages not directly verified for Sept 2026.

## Practicality from South Asia without an international credit card

### Takeaway
Most practical: Kilo Gateway (no signup), Google AI Studio, Groq, Cloudflare Workers AI (10K neurons/day), SambaNova Free Tier, NVIDIA build, Mistral (phone verification), OpenRouter free tier (no card, 50/day). Blocked or degraded without a card: Cerebras (verified payment method required), Together, Fireworks, OpenRouter's 1,000/day upgrade, Vercel upgrades, Cloudflare paid-only models, OpenAI program.

### Cited Findings
- Card-free listing and base URLs per the mnfst list: Google, Groq, Mistral, Cloudflare, HF, Kilo, LLM7, NVIDIA, OpenRouter, Ollama Cloud all "no card". — [mnfst list](https://github.com/mnfst/awesome-free-llm-apis)
- OpenRouter top-up is by card/Alipay/USDC only; INR/UPI aggregator AICredits.in (third-party, not a free tier; needs minimum ₹100 top-up; UPI via Razorpay; base `https://api.aicredits.in/v1`; 300+ models incl. Anthropic/OpenAI/Google) is a paid alternative. — [MasterPrompting 2026-03-22](https://masterprompting.net/blog/aicredits-vs-openrouter-india) (secondary; company legitimacy not independently vetted)
- Vercel: charges you processing fees; payment methods for India not verified. — [Vercel pricing](https://vercel.com/docs/ai-gateway/pricing)

### Inferences
- A workable card-free stack for a self-hosted gateway: Kilo (anon) + OpenRouter free + Groq + Google Flash + Cloudflare + SambaNova + NVIDIA + Mistral, all OpenAI-compatible (Google and Cloudflare via compat paths).

### Gaps
- Country-level availability (e.g. India, Pakistan, Bangladesh, Nepal, Sri Lanka) for each provider's signup and phone verification was not verified; several may require SMS verification that could fail for some carriers.
- Single caveat on freshness: many "awesome" lists are stale (GitHub Models, Cerebras, SambaNova claims above). Prefer official pages.
