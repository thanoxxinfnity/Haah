# First-party AI lab API free / daily-allowance tiers (state as of late September 2026)

All pages accessed 2026-09-29 (via fetch/search tools). No sign-ups were made and no keys were used. Source-quality legend used below: PRIMARY = official vendor doc fetched directly; SECONDARY = third-party blog/aggregator (often SEO/affiliate, sometimes contradictory; treat as unverified); a "yangmao/aicredits/pricepertoken/freellm"-type site is SECONDARY.

## Google Gemini API / AI Studio free tier

### Takeaway
Google is the only major lab with a genuine no-card, recurring free tier that reaches current-generation models, but since ~April 2026 it is Flash / Flash-Lite class only (Pro models are paid-only), and free-tier prompts may be used to improve Google products. Exact per-model limits are no longer printed in the docs (they are shown per-project in the AI Studio dashboard), and secondary sources disagree, so treat every number as unverified.

### Cited Findings
- Models with free tier per the official pricing page (fetched 2026-09-29): Gemini 3.8 Flash, 3.7 Flash, 3.6 Flash, 3.5 Flash, 3.5 Flash-Lite, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, 3 Flash Preview, Live/TTS variants, Robotics ER 2 Preview. Paid-only: Gemini 3.1 Pro Preview, Gemini Omni Flash, 3.1 Flash Image, Veo 3.1, Lyria, Embedding 2, 2.5 Computer Use Preview. — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) (PRIMARY, via a summarizing fetch; the list should be re-checked on the page itself)
- Data use: on the free tier "content is used to improve our products"; on the paid tier it is explicitly not used. — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) (PRIMARY)
- The rate-limits doc does not list numbers; it says limits depend on usage tier, are viewable in AI Studio (aistudio.google.com/rate-limit), are applied per project not per API key, and daily quotas reset at midnight Pacific time. — [Rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) (PRIMARY)
- Claimed limits, SECONDARY and conflicting: "As of September 2026, 3.8/3.7/3.6/3.5 Flash ~20 free requests/day; 3.5 Flash-Lite and 3.1 Flash-Lite 500/day; Pro models no longer free since 1 April 2026" — [search summary of aggregator sites, e.g. scriptbyai/tinkerllm/pecollective results](https://www.scriptbyai.com/gemini-api-free-tier-limits/); other aggregators still quote older figures (Flash ~15 RPM / ~1,500 RPD; 2.5 Pro 5 RPM / 25-50 RPD) — [tinkerllm](https://tinkerllm.com/blog/gemini-api-free-tier-limits-rate-quotas/), [aipromptshub](https://aipromptshub.co/blog/gemini-api-free-tier-rate-limits) (these look like stale 2025 numbers; the 2.5 Pro figure conflicts with the official pricing page above listing 2.5 Pro as free, so the "Pro not free since April 2026" claim itself is only partly consistent with the page: 2.5 Pro is still listed free, 3.x Pro is not).
- No credit card needed for free tier: create key in AI Studio with a Google account. — [search summary of aggregator sites](https://aicredits.in/gemini-api-india) (SECONDARY)
- OpenAI-compatible endpoint exists: base URL `https://generativelanguage.googleapis.com/v1beta/openai/`; supports chat/streaming, function calling, structured outputs, embeddings, batch, `reasoning_effort`; still labelled beta. — [OpenAI compatibility](https://ai.google.dev/gemini-api/docs/openai) (PRIMARY)
- Paid upgrade: since 23 March 2026 new billing accounts must use Prepay; doc says minimum purchase $5 (or regional equivalent), max $5,000, credits expire 12 months after purchase, non-refundable except when switching to Postpay; purchase through the AI Studio billing page. A search summary said $10 minimum — conflicts with the doc's $5; go with the doc. Tier 1 = $250/month cap once billing is linked; Tier 2 after $100 paid + 3 days. — [Billing](https://ai.google.dev/gemini-api/docs/billing) (PRIMARY)
- India-specific: one aggregator claims paid Gemini plans accept UPI and Indian cards and bill in INR; this is about consumer/app-store plans and an INR-billing reseller ("AICredits"), not confirmed for API prepay. — [aicredits.in](https://aicredits.in/gemini-api-india), [indiasbestaitools](https://www.indiasbestaitools.com/tools/gemini-india/) (SECONDARY, unverified for API)
- Regions: docs say "available in many regions"; India is understood to be available but I did not find the official regional list. — [Billing](https://ai.google.dev/gemini-api/docs/billing) (PRIMARY, vague)

### Inferences
- For a hobbyist in South Asia, Gemini free tier (Flash/Flash-Lite) is the most practical zero-cost option: no card, OpenAI-compatible, current-gen models. Expect ~tens to a few hundred requests/day on the best Flash models and much more on Flash-Lite; check the AI Studio dashboard for the real numbers.
- Free-tier data is training-eligible, so no private/customer data.

### Gaps
- Exact current per-model RPM/TPM/RPD free numbers (only in the logged-in AI Studio dashboard; docs page didn't list them).
- Official list of unsupported regions for the free tier; whether Pakistan/India accounts can fund Prepay with local cards/UPI.
- Whether "Pro not free since April 2026" is an official announcement (not found in primary source).

## OpenAI

### Takeaway
OpenAI has no free API tier and (per secondary sources) has discontinued the $5/$18 signup trial credits. The only free route is an opt-in data-sharing program giving complimentary daily tokens to eligible organizations on shared traffic; the eligibility is narrow and the exact quotas are inconsistently reported.

### Cited Findings
- Program: turn on "Share inputs and outputs with OpenAI" under Settings > Data Controls > Sharing; "some organizations" may receive complimentary daily tokens on shared traffic; you can see eligibility on the data-sharing settings page; OpenAI says it will give 30 days' notice before ending the program. — [OpenAI Help Center article](https://help.openai.com/en/articles/10306912-sharing-feedback-evaluation-and-fine-tuning-data-and-api-inputs-and-outputs-with-openai) (PRIMARY URL; my direct fetch returned HTTP 403, so the content was seen only via search-result summary)
- Quota figures conflict: (a) 250K tokens/day for flagship models (GPT-5.5, GPT-5.2) and 2.5M/day for mini/nano, up to 10M/day at usage Tiers 3-5 — [search summary of OpenAI-help/aggregator pages](https://help.openai.com/en/articles/10306912-sharing-feedback-evaluation-and-fine-tuning-data-and-api-inputs-and-outputs-with-openai); (b) up to 1M/day on large models (GPT-5 family, o-series, GPT-4.1), up to 10M/day on mini/nano — [pricepertoken](https://pricepertoken.com/endpoints/openai/free) (SECONDARY). Both agree it needs data sharing and is not universal. The 250K/2.5M pair matches the traditional lower-tier structure; not verified as current.
- Signup credits: "The old $5 and $18 trial credits were discontinued in 2025"; "no general free model or guaranteed new-account credit". — [pricepertoken](https://pricepertoken.com/endpoints/openai/free) (SECONDARY)
- Viral "$50,000 free credits for Data Sharing" social posts exist (LinkedIn/X, 2026) — no corroboration in the help center; treat as misleading. — [X post](https://x.com/VaibhavSisinty/status/2062746313620611252), contradicted by [pricepertoken](https://pricepertoken.com/endpoints/openai/free)
- Community thread reports "free credits not working" for data sharing. — [OpenAI Developer Community](https://community.openai.com/t/api-data-sharing-free-credits-not-working/1250558) (title only seen in search)
- India and Pakistan are on OpenAI's supported countries list; payment methods from outside supported countries risk blocking. — [Supported countries](https://developers.openai.com/api/docs/supported-countries) (PRIMARY, fetched), [Help Center on unsupported countries](https://help.openai.com/en/articles/9131992-chatgpt-and-api-services-in-unsupported-countries-and-territories)
- Regular API use requires prepaid credit / card; OpenAI-compatible is native (it is the reference API). — [pricepertoken](https://pricepertoken.com/endpoints/openai/free) (SECONDARY)

### Inferences
- A brand-new hobbyist account very likely gets no free tokens (eligibility requires being an existing paying org, generally); do not plan around it.
- Pakistan users face the practical payment problem (international card needed; PayPal not in Pakistan), independent of OpenAI's country list.

### Gaps
- Could not read the official help article directly (403); current exact quotas/eligibility (min usage tier, which models) unverified.
- Whether any new-account promotional credits exist in Sept 2026 (none found).

## Anthropic (Claude)

### Takeaway
No free tier. A small one-time trial credit (~$5, SMS phone verification, no card, short expiry) is reported by secondary sources but is not stated in Anthropic's own support/docs that I could read, so treat as unverified. Real free access is via programs (startups, open source, students).

### Cited Findings
- Official onboarding: you must "add usage credits to your organization's balance" (prepaid), fill in org/use-case info and enter payment details; the article mentions no free credits. — [Claude Help Center](https://support.claude.com/en/articles/8114531-i-created-a-claude-console-organization-how-do-i-start-using-the-claude-api) (PRIMARY)
- Rate-limit doc: models currently listed include Claude Fable 5.x, Opus 5.5, Opus 5, Sonnet 5.5, Sonnet 5, Haiku 4.5 (and older Opus/Sonnet 4.x); tiers are Start ($500/mo spend cap), Build ($1,000), Scale ($200,000); new orgs "may start in the Evaluation tier" with lower limits. No free tier is listed. — [Rate limits](https://platform.claude.com/docs/en/api/rate-limits) (PRIMARY)
- Reported one-time $5 trial credit: no card, SMS phone verification (VoIP/Google Voice not accepted), expires ~14 days after claiming, usable on Haiku/Sonnet/Opus; "a trial, not an ongoing free tier". — [pricepertoken](https://pricepertoken.com/endpoints/anthropic/free), [mindwiredai](https://mindwiredai.com/2026/05/06/free-claude-api-credits-2026/) (both SECONDARY; mindwired says "Anyone, no requirements")
- Programs (SECONDARY): Startup program/Anthology Fund ~$25K (pre-seed to Series A, incorporated with live site, 2-4 weeks, credits 12 months); Claude for Open Source (~$1,200 value = 6 months Claude Max, 5,000+ GitHub stars or 1M+ monthly npm downloads, applications closed 30 June 2026); "Claude for Student Builders" ~$50 API credits for .edu accounts (single source, pricepertoken). — [mindwiredai](https://mindwiredai.com/2026/05/06/free-claude-api-credits-2026/), [pricepertoken](https://pricepertoken.com/endpoints/anthropic/free)
- Anthropic credit terms: promotional credits expire as stated or one calendar year from issue. — [search summary](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage) (SECONDARY quote of policy)
- Enterprise activation promo ($1,000 usage credits per user activating Claude Code/Cowork) is for Enterprise orgs only. — [Claude Help Center](https://support.claude.com/en/articles/15282265-claude-enterprise-activation-promo-for-claude-code-and-cowork)
- Not OpenAI-compatible natively as primary, but the Claude API offers an OpenAI SDK compatibility layer (not verified in this session); note DeepSeek supports the Anthropic API format (below).

### Inferences
- Free Claude API for a hobbyist is effectively a ~$5 taste at best; Claude Pro/Max subscriptions and Claude Code are separate from API credits.
- Payment: prepaid credit purchase by card; supported-region list not verified.

### Gaps
- No primary confirmation of the $5 trial or its 14-day expiry in Sept 2026.
- Anthropic supported-countries (India/Pakistan) and accepted payment methods not verified.
- Student program details are single-source.

## xAI (Grok)

### Takeaway
xAI has been reported to run a $25 signup credit and a $150/month data-sharing credit program, but sources conflict on whether it is still live; xAI docs I fetched say nothing about free credits. Assume it must be verified in the xAI Console.

### Cited Findings
- xAI rate limits: Tier 0 is free/$0 spend threshold, up to Tier 4 ($5,000); tiers advance on cumulative spend since 1 Jan 2026; limits given as RPS and TPM; models named include grok-4.7 and grok-4.3. — [xAI rate limits](https://docs.x.ai/docs/key-information/consumption-and-rate-limits) (PRIMARY)
- xAI models/pricing page has no mention of free credits, data-sharing program, or OpenAI compatibility. — [xAI models](https://docs.x.ai/docs/models) (PRIMARY)
- Reported: $25 signup credit (no card, expires in 30 days) and $150/month data-sharing credits requiring $5 prior spend, team-level, irrevocable opt-in, "eligible countries" only; article says last verified 29 Sept 2026 but warns "if the offer does not appear in your console... it does not apply". — [aitoolsrecap](https://aitoolsrecap.com/Blog/how-to-get-free-grok-api-key-2026-step-by-step) (SECONDARY)
- Contradicting: "old data-sharing credit program ended in May 2025... treat as ended unless your console shows it". — [yangmao.ai](https://yangmao.ai/en/questions/grok-api-free-credits/) (SECONDARY), contradicted by [aitoolsrecap](https://aitoolsrecap.com/Blog/how-to-get-free-grok-api-key-2026-step-by-step)

### Inferences
- Do not count on xAI free credits; the "$5 spend first" requirement means it is not free to start anyway. xAI's API is widely described as OpenAI-compatible (base `https://api.x.ai/v1`), but I did not verify in this session.

### Gaps
- Current status of both credit programs; eligible country list (India/Pakistan) unknown.
- Primary confirmation of OpenAI-compatible base URL.

## Mistral (La Plateforme "Experiment" plan)

### Takeaway
Mistral has the most generous truly free plan for large models by volume (reported ~1B tokens/month, all models, ~1 req/s), needing only phone verification, but no primary doc was accessible, exact limits are unpublished, and data may be used for training on the free plan.

### Cited Findings
- Reported: free "Experiment" plan, no card, phone verification only, access to all API models (Small, Large, Codestral, Magistral), ~1B tokens/month cap, ~1 request/second; exact limits not published (see Admin Console > Limits); data may be used for model improvement unless opted out. — [search summary of aggregators incl. pricepertoken/costbench](https://pricepertoken.com/endpoints/mistral/free) (SECONDARY)
- Conflicting characterization: costbench describes it as "a time-limited trial, not a forever-free plan" with Devstral Small at $0. — [costbench](https://costbench.com/software/llm-api-providers/mistral-ai/free-plan/) (SECONDARY)
- Official docs fetched (models overview) do not mention a free tier; tier doc URLs I tried returned 404. — [Mistral docs](https://docs.mistral.ai/getting-started/models/models_overview/) (PRIMARY, negative result)

### Inferences
- Likely the best "premium-class for free" option if the ~1B tokens/month claim holds, but rate limit (~1 rps, low TPM) constrains heavy use. OpenAI-style chat endpoint at `https://api.mistral.ai/v1` is widely used (not verified here).

### Gaps
- No primary source for limits, data-use terms, or whether the plan is time-limited; India/Pakistan phone verification acceptance untested.

## DeepSeek

### Takeaway
No permanent free tier; secondary sources report a one-time 5M-token new-account grant (30 days, no card), then pay-as-you-go at very low prices. Payment from South Asia is the main obstacle.

### Cited Findings
- Official pricing (fetched): models `deepseek-flash` (V4.1-Flash, 1M context, vision, concurrency 2,500) and `deepseek-v4-pro` (V4-Pro-0813, 1M context, concurrency 500); prices per 1M tokens: flash input miss $0.15–0.3, output $0.6–1.2; pro input miss $0.66–1.32, output $1.98–3.96 (ranges as shown by page); off-peak 50% (peak 01:00-04:00 and 06:00-10:00 UTC Mon-Fri); supports Anthropic API compatibility and Responses API. The page mentions no free grant. — [DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing) (PRIMARY)
- Reported: 5M free tokens on signup, valid 30 days, no card, after which a payment method/top-up is required. — [pricepertoken](https://pricepertoken.com/endpoints/deepseek/free), [yangmao.ai](https://yangmao.ai/en/deals/deepseek-api-free-tokens-2026/) (SECONDARY; not on the official page)
- Payment claims: official platform mainly accepts Chinese payment methods, international cards can decline; India cards often block international/recurring; Pakistan lacks PayPal. — [novaapi blog](https://novaapi.lbase.com/blog/pay-for-deepseek-api-blocked-countries.html) (SECONDARY, vendor selling a workaround; low reliability, and DeepSeek historically accepts international cards, so treat as unverified)

### Inferences
- Once you can pay, it is the cheapest frontier-ish option; free grant is a trial.
- OpenAI-compatible (base `https://api.deepseek.com`) — standard, not re-verified here.

### Gaps
- Confirmation of 5M-token grant; accepted payment methods and country restrictions from a primary source.

## Alibaba Cloud Model Studio (Qwen)

### Takeaway
New accounts on the international (Singapore) Model Studio reportedly get ~1M free tokens per model for many Qwen models, valid 90 days from activation, Singapore/International only; it is a trial, not recurring.

### Cited Findings
- "Each model (such as qwen-plus, qwen3.6-plus...) has its own independent free quota (typically 1,000,000 tokens)"; valid 90 days from activation/model release/approval (whichever is later); only Singapore-region, International deployment-scope models are eligible. — [Alibaba Cloud free quota doc](https://www.alibabacloud.com/help/en/model-studio/new-free-quota) (PRIMARY; doc does not enumerate which models, so flagship max/plus coverage unconfirmed)
- Secondary: ~70 models x 1M = ~70M tokens total; expires whether or not used; a social post advertises 1M free tokens for 90 days on Qwen3.8-Omni-Flash. — [search summary](https://www.alibabacloud.com/help/en/model-studio/new-free-quota), [X post](https://x.com/pengsonal/status/2100868879170085021) (SECONDARY)
- Model Studio has OpenAI-compatible mode (DashScope compatible endpoint) — standard, not verified here.

### Inferences
- Useful as a short-term way to try many Qwen models. Alibaba Cloud international signup normally asks for a payment method/verification (not verified here for this promo).

### Gaps
- Card/phone requirement, India/Pakistan availability, and exact base URL not verified.

## Moonshot / Kimi

### Takeaway
No free tier: minimum $1 recharge to start, with a $5 voucher after cumulative $5 recharge; Tier 0 limits are low.

### Cited Findings
- "Recharge at least $1 to start using"; at $5 cumulative recharge you get a $5 voucher (vouchers don't count toward tier). Tier 0: concurrency 1, RPM 3, TPM 500,000, TPD 1,500,000; higher tiers at $10/$20/$100/$1,000/$3,000. — [Kimi platform limits](https://platform.kimi.ai/docs/pricing/limits) (PRIMARY; platform.moonshot.ai now redirects to platform.kimi.ai)

### Inferences
- $1 entry is cheap but requires an accepted payment method. Kimi API is OpenAI-compatible (not verified in this session).

### Gaps
- Payment methods accepted internationally; regional restrictions.

## Zhipu / Z.ai (GLM)

### Takeaway
Z.ai offers permanently free Flash models (small/mid-size), not the flagship GLM models, with low concurrency, and a documented OpenAI-compatible endpoint (reported).

### Cited Findings
- Free ($0) models: GLM-4.7-Flash, GLM-4.5-Flash (text), GLM-4.6V-Flash (vision); no rate limits or new-user credits mentioned on the page. — [Z.ai pricing](https://docs.z.ai/guides/overview/pricing) (PRIMARY)
- GLM-4.7-Flash: 30B-A3B MoE, 200K context, released 19 Jan 2026; free-tier concurrency of 1 request; OpenAI SDK base URL `https://api.z.ai/api/paas/v4`; "no credit card required". — [Medium/WaveSpeedAI](https://medium.com/@social_18794/glm-4-7-flash-release-date-free-tier-key-features-2026-17d4b973ef90), [freellmapi](https://freellmapi.co/free-glm-api), [free-llm.com](https://free-llm.com/provider/z-ai) (SECONDARY)

### Inferences
- Good for hobby coding/agents at small-model quality, not premium-class. Data-use terms for the free tier not checked.

### Gaps
- Data-use terms, regional restrictions, sign-up verification requirements.

## Which are useful for a hobbyist (synthesis) and gotchas

### Takeaway
Best zero-cost options: Gemini free tier (Flash/Flash-Lite, no card, OpenAI-compatible) and Mistral Experiment (many models, phone verify); Z.ai for free small GLM. OpenAI and xAI free credits are data-sharing programs with narrow/unclear eligibility; Anthropic and Kimi need paid top-ups; DeepSeek/Alibaba are short trials.

### Cited Findings
- See per-provider sections above; key constraints: Gemini free data used for product improvement ([pricing](https://ai.google.dev/gemini-api/docs/pricing)); OpenAI free tokens require sharing data ([pricepertoken](https://pricepertoken.com/endpoints/openai/free)); xAI data sharing irrevocable ([aitoolsrecap](https://aitoolsrecap.com/Blog/how-to-get-free-grok-api-key-2026-step-by-step)); Kimi $1 minimum ([Kimi](https://platform.kimi.ai/docs/pricing/limits)); Alibaba quota Singapore-only, 90-day expiry ([Alibaba](https://www.alibabacloud.com/help/en/model-studio/new-free-quota)).

### Inferences
- South Asia payment: no card needed for Gemini free, Mistral (phone), Z.ai Flash. For paid: Gemini Prepay may be the easiest (regional-equivalent pricing; UPI reported only by secondary sources), OpenAI/Anthropic need an international card, DeepSeek/Kimi payment routes are uncertain. Indian cards often have international transactions off by default (secondary claim), Pakistani users lack PayPal.
- Beware aggregator/affiliate pages (yangmao.ai, aicredits, creditforstartups, founderpass etc.) — several contradict each other and primary docs.

### Gaps
- Nothing in this set was verified by actually testing keys (out of scope by constraint). Free-tier numbers change frequently; all should be re-checked in each provider's console before relying.
