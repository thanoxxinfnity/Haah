# Legitimate credit programs, promotions and subscription-linked allowances for premium Claude / GPT / Gemini usage (state as of late September 2026)

Access date for all sources below: 2026-09-29 (fetched or searched that day). "Secondary" = blog/aggregator, not an official page. Nothing was signed up for and no keys were used.

Conventions: [P] = primary/official page read directly. [S] = secondary/aggregator or search-snippet only. Items I could not verify are in Gaps.

## 1. Which programs give actual API credits for Claude/GPT/Gemini that a solo developer can realistically get?

### Takeaway
Almost all "real API credit" programs (Anthropic, OpenAI, Google for Startups, Microsoft Founders Hub) are gated on being an incorporated startup, VC/partner referral, or a specific country/student status. The only no-payment, no-company, API-key-usable free allowances that appear to remain for a solo hobbyist are (a) the Gemini API free tier (Flash-class models only, rate-limited, data used for training), (b) Vertex AI Express Mode (90 days, Gmail account, Gemini only), (c) AWS's up-to-$200 new-account credits (usable on Claude via Bedrock, but needs a card), and (d) OpenAI's data-sharing complimentary tokens (only once you have a paid balance). Anthropic's and OpenAI's own APIs have no free trial; minimum purchase is about $5.

### Cited Findings

**Anthropic**
- Claude for Startups: credits apply only to the first-party Claude API via Claude Console; cannot be used on AWS Bedrock, Google Vertex AI or other third-party platforms. For credits, applicant must have received equity funding from an institutional investor, be founded within the last four years, and not have previously received Anthropic startup credits; VC backing is not required just to apply; needs Claude Console account, company email, website, project description; page states no dollar amounts and no expiry — [Claude for startups](https://claude.com/programs/startups) [P], accessed 2026-09-29.
- Secondary sources claim amounts of roughly $5,000 for a direct application up to $100,000 for VC-nominated startups, plus priority rate limits — [Security Boulevard, Aug 2026](https://securityboulevard.com/2026/08/anthropic-claude-for-startups-the-complete-guide-to-credits-tiers-and-eligibility-2026/) [S]. The official page does not confirm these figures; treat as unverified.
- Claude for Open Source: 6 months of free Claude Max 20x (a subscription, not API credits); eligibility on the official page is any one of: maintainer of packages with 500+ dependent repos / 100+ dependent packages / 200,000+ monthly downloads; listed committer on major projects (CPython, Rust, Node.js, Apache, CNCF, Kubernetes, Linux kernel, Django, Rails); 100+ merged PRs into repos you do not own in last 12 months; repos with 20+ unique external contributors in 12 months; OpenSSF criticality score 0.4+; those not meeting criteria are encouraged to apply describing ecosystem impact. Complimentary sub ends after 6 months and billing resumes unless cancelled — [Claude for Open Source](https://claude.com/contact-sales/claude-for-oss) [P]. An earlier (Feb 2026) secondary description (5,000+ stars / 1M npm downloads, 10,000 recipient cap, no API credits) differs from the current page's criteria — [Simon Willison, 2026-02-27](https://simonwillison.net/2026/Feb/27/claude-max-oss-six-months/) and [Verdent](https://www.verdent.ai/guides/claude-max-20x-open-source) [S]; criteria appear to have been loosened/changed, use the official page.
- Anthropic API has no real free trial: the pricing docs FAQ says "New users receive a small amount of free credits to test the API" — [Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) [P], but this FAQ line looks stale/generic and conflicts with other sources that report a minimum initial top-up of $5; treat free trial credit as unverified.
- Prepaid credits expire one year from purchase, are non-refundable, and expiry cannot be extended — [How do I pay for my Claude API usage?](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage) [P]. Minimum initial top-up of $5 is stated by search-snippet sources only, not on that page — [Relay.app blog / help-center snippets](https://www.relay.app/blog/how-to-buy-credits-for-the-anthropic-claude-api) [S].

**OpenAI**
- New API accounts: no free trial credits; $5 minimum purchase; credits non-refundable, expire after one year — [Klymentiev, OpenAI free credits (Sept 2026)](https://klymentiev.com/blog/openai-free-credits) [S].
- Complimentary daily tokens for organizations that opt in to share API inputs/outputs with OpenAI: Tier 1–2 up to 250K tokens/day on larger models and 2.5M/day on smaller models; Tier 3–5 up to 1M/day larger and 10M/day smaller; applies only to shared traffic/projects; OpenAI promises 30 days' notice before ending; enrol via Organization settings > Data Sharing — [OpenAI Developer Community thread](https://community.openai.com/t/good-news-extended-free-tokens-on-traffic-shared-with-openai/1241322) and search snippet of [OpenAI Help Center article](https://help.openai.com/en/articles/10306912-sharing-feedback-evaluation-and-fine-tuning-data-and-api-inputs-and-outputs-with-openai) (direct fetch returned HTTP 403) [S]. Klymentiev lists it as "Open" as of Sept 2026 and requires a positive balance [S]. Note that the tier system requires paid spend first (inference from tier definitions; not verified against the help page).
- OpenAI for Startups: referral via partner VCs/accelerators; amounts undisclosed publicly; Ramp customers up to $2,500 API credits; Researcher Access Program up to $1,000; Cybersecurity Grant $10K increments; Codex for Open Source (API credits + 6 months ChatGPT Pro); Codex for Students = $100 ChatGPT credits for verified US/Canada university students only and not API credits; OpenAI Grove closed — [Klymentiev](https://klymentiev.com/blog/openai-free-credits) [S].
- ChatGPT Go free for 12 months in India (launched 4 Nov 2025; TechCrunch reported it 27 Oct 2025); needs card or UPI at sign-up, auto-renews at normal price; no published closing date; this is a ChatGPT consumer subscription, not API credit — [TechCrunch](https://techcrunch.com/2025/10/27/openai-offers-free-chatgpt-go-for-one-year-to-all-users-in-india) [P-ish, headline only seen via search], details via [CodeForGeek](https://codeforgeek.com/free-gpt-5-india/) [S]. I could not confirm this offer is still open in Sept 2026.

**Google / Gemini**
- Gemini API free tier (AI Studio key, no card): official rate-limit doc says free tier is available to users with an "Active project or free trial", specific RPM/TPM/RPD limits are only shown inside AI Studio, "specified rate limits are not guaranteed"; upgrade Free→Tier 1 requires linking an active billing account; Tier 2 needs $100+ cumulative spend and 3+ days; Tier 3 needs $1,000+ and 30+ days (page last updated 2 Sept 2026) — [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) [P].
- Official pricing page: most current Gemini models list a free tier ("Free input & output tokens"); free-tier content is "used to improve our products", paid tier is not. Paid prices per 1M tokens: Gemini 3.8 Flash $0.75 in / $3.75 out through 31 Dec 2026 ($1.50/$7.50 after); Gemini 3.5 Flash $1.50/$9.00; 3.5 Flash-Lite $0.30/$2.50; Gemini 3.1 Pro Preview $2.00 (<=200k) / $12.00; Batch = 50% off — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) [P].
- Secondary: free access to Pro-tier models ended 1 April 2026; free tier is Flash/Flash-Lite only; Google cut free quotas 50–80% in Dec 2025 and no longer publishes fixed per-model daily numbers — [PE Collective](https://pecollective.com/tools/gemini-free-tier-guide/) and [Klymentiev, Gemini free credits](https://klymentiev.com/blog/gemini-free-credits) [S]. The pricing page fetch did not list a free tier for Gemini 3.1 Pro Preview explicitly, consistent with this but not proof.
- Vertex AI / Google Cloud "express mode": new Google Cloud users with a @gmail.com account can try Gemini Enterprise Agent Platform (formerly Vertex AI) free for up to 90 days within fixed quotas with no billing info; disappears if you already use Google Cloud or enable billing; can add payment later for more quota — search summary of [Google Cloud express mode FAQs](https://cloud.google.com/resources/cloud-express-faqs) (page fetch was truncated) and [Klymentiev](https://klymentiev.com/blog/gemini-free-credits) [S]. Also referenced in the official Gemini CLI quota page: "Vertex AI (Express Mode): 90 days before you need to enable billing" — [Gemini CLI quotas](https://geminicli.com/docs/resources/quota-and-pricing/) [P-ish, community-run docs site for the CLI].
- Google for Startups Cloud Program: secondary reports tiers of Start (up to $2,000, startups <=24 months old, no prior Google Cloud credits, valid 12 months), Scale (up to $200,000) and AI-focused (up to $350,000); Google's own pages did not load in my fetch (truncated) — [Klymentiev](https://klymentiev.com/blog/gemini-free-credits), [CloudKompas](https://cloudkompas.com/blog/google-cloud-for-startups-2026-credits-guide) [S]. Unverified as current.
- Google AI student offer (announced ~23 Sept 2026, India coverage per Indian outlet): Google AI Plus free for 12 months; AI Pro at up to 74% off (Rs 489/month) for 4 years; requires age 18+, SheerID student verification, personal Google account and a valid payment method; redeem by 31 Dec 2026; auto-renews. It is a consumer Gemini subscription (includes Colab 200 compute units/month on AI Pro); no Gemini API access mentioned — [Business Today, 2026-09-23](https://www.businesstoday.in/amp/technology/news/story/google-offers-free-ai-plus-and-ai-pro-to-university-students-heres-how-to-claim-it-557112-2026-09-23) [S].
- Jio + Google: 18 months of Google AI Pro free for Jio users 18+ on an unlimited 5G plan of Rs 349+ (claim in MyJio app with Gmail ID; once per mobile number; "limited-time", no end date shown) — [Jio Gemini offer page](https://www.jio.com/google-gemini-offer/) [P]. Consumer subscription, not API credit.

**Microsoft / Azure**
- Microsoft for Startups Founders Hub: without an investor, $1,000 for 90 days then $4,000 for 180 days after business verification; with investor/accelerator referral typically ~$100,000 — [Klymentiev, OpenAI free credits](https://klymentiev.com/blog/openai-free-credits) [S]. Azure OpenAI models are Azure-billed; Claude models in Foundry are third-party marketplace items and are NOT covered by startup credits (users reported being billed) — [Microsoft Q&A accepted answer](https://learn.microsoft.com/en-us/answers/questions/5646685/are-anthropic-claude-models-on-azure-ai-foundry-el) [P, community Q&A on Microsoft Learn, not a formal policy page].
- Azure for Students: $100 for 12 months, no card, renewable yearly for verified students — [Credit for Startups](https://creditforstartups.com/students/azure-for-students) [S]. Whether Azure OpenAI access is actually granted to student subscriptions was not verified.
- Anthropic's own Claude in Microsoft Foundry and Claude Platform on AWS bill via marketplace in Claude Consumption Units, postpaid only, no prepaid credits — [Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) [P].

**AWS**
- AWS Free Tier for accounts created after 15 July 2025: up to $200 credits ($100 on sign-up + $100 for using services such as EC2 and Amazon Bedrock); the free account plan expires 6 months after sign-up or when credits are used up; new customers only; regions all except GovCloud and China; card requirement not stated on the page — [AWS What's New, July 2025](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/) [P]. Secondary sources say credits work on Anthropic Claude via Bedrock and that first-time use of Anthropic models needs a use-case form — [Towards AI](https://pub.towardsai.net/aws-gives-200-in-free-credits-to-every-new-user-all-of-it-works-on-claude-8438293aebdd?gi=9a47a9bfbf26), [Cloudforecast/search results](https://www.cloudforecast.io/blog/aws-bedrock-pricing/) [S]. Secondary caveat: coverage depends on whether the charge appears as Bedrock usage or as AWS Marketplace usage [S]. Confirm on the Bedrock console before relying on it.

**GitHub**
- GitHub Student Developer Pack: Copilot Pro was removed from the Pack in April 2026 (secondary); since 12–13 March 2026 verified students are on a "Copilot Student" plan with 200 monthly AI credits (1 credit = $0.01 per GitHub; so about $2) and unlimited code completions; access is via Auto model selection only; Claude Opus/Sonnet, GPT-5.3-Codex, GPT-5.4 are no longer manually selectable — [GitHub community discussion #189268](https://github.com/orgs/community/discussions/189268) [P], [GitHub changelog 2026-03-13](https://github.blog/changelog/2026-03-13-updates-to-github-copilot-for-students/) [P], [GitHub docs, usage-based billing for individuals](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals) [P].
- GitHub Models (free rate-limited playground + inference API using a GitHub token) was fully retired on 30 July 2026, including the API and BYOK; not available to any customer — [GitHub changelog 2026-07-30](https://github.blog/changelog/2026-07-30-github-models-is-now-retired/) [P]. This removes what used to be the easiest free GPT/Claude-family API for hobbyists; older blog posts recommending it are stale.

### Inferences
- For a solo hobbyist with no company, realistic no-cost API paths are Gemini API free tier and Vertex Express Mode (both Google, both Gemini-only, both weaker than flagship Pro). Free Claude and GPT API access effectively requires either the AWS $200 credit (Claude on Bedrock) or paying a small prepaid balance.
- Startup programs (Anthropic, OpenAI, Google, Microsoft) require a company web presence and/or investor referral; a hobbyist would be at most a long shot for Microsoft's no-investor $1K+$4K tier and Google's Start tier.
- Consumer-subscription promos (Jio-Google AI Pro, Google student AI Pro, ChatGPT Go India, Claude for OSS Max) are valuable but do not produce API keys.

### Gaps
- Exact current Anthropic startup credit amounts (official page silent; only secondary numbers).
- Whether OpenAI's complimentary-token program is still running in Sept 2026 (help article returned 403; only community/secondary evidence) and whether it is available to accounts in India.
- Google for Startups current tier amounts and India eligibility (official pages truncated on fetch).
- Whether ChatGPT Go free-in-India offer remains open in Sept 2026.
- Whether Azure for Students subscriptions can deploy Azure OpenAI models.

---

## 2. Which "free daily allowance" offers are locked to a specific tool (CLI/IDE), and are there ToS limits on using them via a custom gateway/API endpoint?

### Takeaway
All of the free/subscription-linked allowances (Claude Code via Pro/Max, Codex via ChatGPT plan, Copilot, Antigravity CLI) are tied to the vendor's own client and OAuth login; they cannot be exposed as a general API key. Anthropic and Google have explicitly banned/enforced against routing subscription auth through third-party tools or proxies; Gemini's once-generous free CLI tier was shut for individuals on 18 June 2026.

### Cited Findings

**Gemini CLI / Antigravity CLI**
- On 18 June 2026 Google stopped serving Gemini CLI to free, Google AI Pro and Ultra accounts and Gemini Code Assist for individuals (free tier); enterprise Code Assist Standard/Enterprise licences and paid Gemini / Gemini Enterprise Agent Platform API keys continue to work; Antigravity CLI "is available to everyone" — [Google Developers Blog](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) [P]. The blog page as fetched gave no pricing for Antigravity.
- The Gemini CLI docs site (geminicli.com) still lists Google-account 1,000 requests/user/day, API key 250/day Flash only, Vertex express 90 days, and says Gemini CLI "was replaced by Antigravity CLI on June 18th, 2026" — [Gemini CLI quotas](https://geminicli.com/docs/resources/quota-and-pricing/) [P-ish]. The 1,000/day figure conflicts with the Developers Blog announcement for individuals; that row appears to be stale/enterprise-only. Treat the 1,000/day free individual quota as gone.
- Community testing: free Antigravity ceiling is "low tens of requests per day" (~20 agent requests/day as of Sept 2026, per aggregator), with a weekly agent quota; Google has published no official daily number — [Tembo](https://www.tembo.io/blog/gemini-cli-pricing), [CloudZero](https://www.cloudzero.com/blog/google-antigravity-pricing/) [S]. CloudZero notes conflicting Google documentation on whether Claude Sonnet/Opus 4.6 and gpt-oss-120b are available on the free tier (pricing card says yes, plans doc says Ultra-only) [S].
- Gemini API free key "doesn't authenticate Gemini CLI for individuals anymore, so it helps you build apps, not run the CLI for free" — [Tembo](https://www.tembo.io/blog/gemini-cli-pricing) [S].
- ToS/enforcement: Google suspended paying AI Ultra ($250/month) Antigravity subscribers in Feb 2026 for using their Antigravity OAuth credentials in third-party agent tools (OpenClaw/OpenCode); Antigravity's Varun Mohan said "It is not intended to use the Antigravity backend as a proxy for other products" — [MLQ News](https://mlq.ai/news/google-enforces-tos-bans-on-paid-antigravity-subscribers-using-openclaw-tool/), [The Register, 2026-02-23](https://www.theregister.com/2026/02/23/google_antigravity_compute_burden/), [Google AI Developers Forum appeal threads](https://discuss.ai.google.dev/t/appeal-for-antigravity-account-suspension-403-terms-of-service/174572) [S]. A 3 Sept 2026 aggregator item indicates this is continuing/recurring — [Enterprise DNA](https://enterprisedna.co/resources/ai-pulse/ai-pulse-2026-09-03-google-suspends-paying-antigravity-subscribers-for-using-thi/) [S].

**Claude Code / Claude subscriptions**
- Anthropic statement (quoted by secondary sources): "Using OAuth tokens obtained through Claude Free, Pro, or Max accounts in any other product, tool, or service, including the Agent SDK, is not permitted and constitutes a violation of the Consumer Terms of Service." Server-side rejection of subscription OAuth outside Claude Code began 9 Jan 2026; on 4 April 2026 Pro/Max/Team subscriptions stopped covering third-party harnesses (OpenClaw, OpenCode, etc.); running Anthropic's own Claude Code is fine; everything else needs a Console API key or a cloud provider — [Winbuzzer, 2026-02-19](https://winbuzzer.com/2026/02/19/anthropic-bans-claude-subscription-oauth-in-third-party-apps-xcxwbn/), [OpenClaw.report](https://openclaw.report/ecosystem/anthropic-bans-oauth-tokens-third-party-tools), [KERSAI](https://kersai.com/anthropic-killed-third-party-claude-access-heres-every-workaround-that-still-works/) [S]. I did not retrieve Anthropic's own legal/compliance page; verify against Anthropic's Claude Code legal docs before relying on the exact wording.
- Claude for Open Source (Max 20x) is a subscription; it falls under the same restriction (individual, in-product use) — inference from the two findings above.

**OpenAI Codex**
- Codex is included on ChatGPT Free and Go plans; sign in with ChatGPT and usage follows the plan allowance; free usage is limited and best treated as occasional/trial — [OpenAI Help Center: Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) (direct fetch 403; content via search summary) [S], [Inventive HQ](https://inventivehq.com/blog/codex-subscription-options-guide) [S]. Whether ChatGPT-sign-in tokens may be used by third-party tools/forks was an open question on [openai/codex discussion #8338](https://github.com/openai/codex/discussions/8338); I found no definitive OpenAI statement. API-key use of Codex CLI is billed at standard API rates.

**GitHub Copilot**
- Copilot Free: 2,000 code completions/month, limited chat/agent mode, no card; Free and Student have an AI-credit allowance with models via auto selection only; the docs do not quantify the Free credit amount — [GitHub docs, usage-based billing for individuals](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals) [P], [No Code MBA](https://www.nocode.mba/articles/github-copilot-pricing) [S].
- Since 1 June 2026 all Copilot plans are billed via GitHub AI Credits (1 credit = $0.01), metered by tokens at each model's rate; Pro $10/mo with 1,500 credits (1,000 base + 500 flex), Pro+ $39 with 7,000, Max $100 with 20,000 (docs table). The GitHub blog says Pro includes "$10 in monthly AI Credits" and Pro+ "$39" — conflicts with the docs' 1,500/7,000 figures (possibly base vs. base+flex/promotional; not resolved) — [GitHub Blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) [P] vs. [GitHub docs](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals) [P]. Opus-family models removed from Pro (Pro+ only) per secondary sources [S].
- Copilot is not exposed as a generic OpenAI-compatible API key; it works inside GitHub's clients (chat, CLI, cloud agents). The docs page did not address use outside GitHub tools. No official ToS text checked on proxying Copilot; reverse-proxies of Copilot tokens are widely reported to risk account action but I did not find a primary source (Gap).

### Inferences
- None of these allowances can be plugged into a custom gateway legitimately. Google and Anthropic have both taken enforcement action; treat that as the default for Copilot/Codex too until an official statement says otherwise.
- The only vendor-sanctioned "free" endpoints that accept a standard API key from an app are the Gemini API free tier and Vertex Express Mode.

### Gaps
- Official OpenAI policy on third-party use of ChatGPT-plan Codex tokens.
- Official Copilot ToS language on proxying/reselling.
- Official Antigravity free-tier quota and model list (Google publishes none; aggregators disagree).
- Anthropic's own primary text for the OAuth restriction (only quoted by secondaries).

---

## 3. Cloud free credits (Google Cloud, AWS Bedrock, Azure): amounts, requirements, payment barriers

### Takeaway
Google's $300 trial (90 days) needs a card and now excludes both the Gemini API in AI Studio (accounts created after 2 March 2026) and third-party partner models such as Claude on Vertex; it still covers Gemini on Vertex. AWS gives up to $200 for 6 months that can offset Bedrock/Claude. Azure's Founders Hub credits do not cover Claude. Card requirements are the main barrier in South Asia.

### Cited Findings
- Google Cloud Free Trial: $300 Welcome credit, 90 days; must never have been a paying user of Google Cloud/Maps/Firebase; requires a valid credit card or payment method, identity verification, and possible bank-account verification depending on country; the authorization is a hold, not a charge; the $300 cannot be used for Gemini API costs in AI Studio or for generative AI partner models offered as managed APIs (model-as-a-service, i.e. Claude on Vertex) — [Google Cloud Free Trial docs](https://docs.cloud.google.com/free/docs/free-cloud-features) [P]. The AI Studio exclusion date of 2 March 2026 comes from [Klymentiev](https://klymentiev.com/blog/gemini-free-credits) [S].
- The trial still covers Gemini on Vertex — [Klymentiev](https://klymentiev.com/blog/gemini-free-credits) and [Tahoor newsletter](https://tahoor.beehiiv.com/p/google-cloud-300-credit-vertex-ai-rebrand-2026) [S].
- Vertex Express Mode: see section 1 (90 days, Gmail, no billing account, Gemini APIs within fixed quotas).
- AWS: up to $200 credits; 6 months; see section 1 — [AWS](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/) [P]. Bedrock has no permanent free tier; Claude on Bedrock is priced the same as the direct API per secondary sources [S]. Regional/multi-region endpoints carry a 10% premium over global endpoints; on Bedrock/Google Cloud pricing is set by the cloud — [Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) [P].
- Startup credits from Anthropic cannot be used on Bedrock/Vertex (see section 1). Google startup credits reportedly do not cover third-party Claude on Vertex either — [ApexGear/Klymentiev search summaries](https://apexgear.blog/is-google-vertex-ai-free) [S].
- Azure: Founders Hub credits exclude Claude in Foundry (see section 1). GitHub Models (an Azure-backed free path) is retired (30 July 2026); GitHub points users to Microsoft Foundry — [GitHub changelog](https://github.blog/changelog/2026-07-30-github-models-is-now-retired/) [P].
- India payment: Anthropic direct bills USD only, no INR, no UPI; requires an international credit/debit card or app-store billing for consumer plans — [Social Samosa](https://www.socialsamosa.com/news-2/anthropic-india-pricing-claude-ai-subscriptions-12162246), [AICredits blog](https://aicredits.in/blog/claude-api-india-pay-in-inr), [Xflow](https://www.xflowpay.com/blog/how-to-pay-for-claude) [S]. (Social Samosa concerns India pricing for subscriptions; I did not read the article text.)
- ChatGPT Go India promo required card or UPI at sign-up (see section 1).
- India is a supported Bedrock country per a secondary source; wrong billing-address country triggers geo-errors — [Cloudforecast](https://www.cloudforecast.io/blog/aws-bedrock-pricing/) [S].

### Inferences
- For an Indian or Pakistani hobbyist the real gate is an internationally enabled card (Visa/Mastercard with e-commerce/international transactions on). Gmail-only Vertex Express Mode and the Gemini API free tier are the only cloud-adjacent options with no payment method.
- Card availability in Pakistan is generally harder than India (inference from general knowledge, no source found in this research).

### Gaps
- No source verifying whether AWS sign-up accepts Indian/Pakistani debit cards, RuPay, or handles RBI recurring-payment rules; nothing on UPI at Google Cloud/AWS for account verification.
- Pakistan-specific availability of every program (Google Cloud, AWS, Anthropic, OpenAI billing) was not researched; only India-related items were found.
- Exact Express Mode quotas and model list (FAQ page truncated).

---

## 4. Cheapest official pay-as-you-go routes (fallback)

### Takeaway
Direct APIs are prepaid with about a $5 minimum (Anthropic, OpenAI). Mid-tier models are now cheap: Claude Sonnet 5.5 at $2/$10 per MTok ($1/$5 in batch), GPT-6-sol at $2/$10, Gemini 3.8 Flash at $0.75/$3.75 through 31 Dec 2026. Batch gives 50% off everywhere; caching cuts input to about 10%.

### Cited Findings
**Anthropic** ([Claude pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) [P]; per MTok input/output):
- Claude Fable 5.1 $10/$50; Opus 5.5 $4/$20; Opus 5 / 4.8 / 4.7 / 4.6 / 4.5 $5/$25; Sonnet 5.5 $2/$10; Sonnet 5 $2/$10 (introductory pricing announced through 31 Aug 2026 has been made standard; the $3/$15 increase will not happen); Sonnet 4.6/4.5 $3/$15; Haiku 4.5 $1/$5.
- Batch API: 50% off input and output (e.g. Sonnet 5.5 $1/$5, Opus 5.5 $2/$10, Haiku 4.5 $0.50/$2.50). Prompt caching: 5-min write 1.25x, 1-hour write 2x, cache read 0.1x (0.05x on Opus 5.5, 0.025x on Fable 5.1/Mythos 5.1); multipliers stack with batch. Fast mode is premium-priced and not batchable. 1M context at standard price for 4.6+ models. Claude 4.7+ tokenizer yields ~30% more tokens for the same text. Web search $10/1,000 searches; code execution 1,550 free hours/month/org.
- Mythos models are limited-access (Project Glasswing), not generally purchasable.
- Prepaid credits, expire 1 year, non-refundable; $5 minimum (secondary) — [Claude help](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage) [P].

**OpenAI** ([OpenAI pricing](https://developers.openai.com/api/docs/pricing) [P]; per 1M tokens in/out):
- gpt-6-astra $10/$50; gpt-6-sol $2/$10; gpt-6-luna $0.10/$0.50; gpt-5.6-sol $4/$20; gpt-5.6-terra $2/$12; gpt-5.6-luna $0.20/$1.20; gpt-5.5 $5/$30; gpt-5.4 $2.50/$15; gpt-5.1 $1.25/$10; gpt-5.4-mini $0.75/$4.50; gpt-5.4-nano $0.20/$1.25; gpt-5-mini $0.25/$2; gpt-5-nano $0.05/$0.40.
- Batch 50% off; cached input ~90% off (gpt-6-sol cached $0.20 vs $2.00); long-context doubles the price on eligible models.
- $5 minimum purchase, non-refundable, expires after 1 year — [Klymentiev](https://klymentiev.com/blog/openai-free-credits) [S].

**Google** ([Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) [P]): Gemini 3.8 Flash $0.75/$3.75 (promo through 31 Dec 2026; $1.50/$7.50 after); Gemini 3.5 Flash $1.50/$9.00; Flash-Lite $0.30/$2.50; 3.1 Pro Preview $2.00/$12.00 (<=200k); Batch 50% off (3.8 Flash batch $0.375/$1.875); context caching on paid tier with storage around $0.50-1.00 per 1M tokens/hour. Paid tier requires a linked billing account.

**Intermediaries for INR/UPI**: AICredits (aicredits.in) is a third-party gateway offering a Rs 10 minimum top-up via UPI/net banking/domestic debit cards with a 5% platform fee plus a 5% forex buffer (its own Claude example figures are for an older model) — [AICredits blog](https://aicredits.in/blog/claude-api-india-pay-in-inr) [S; vendor's own marketing]. This is a commercial reseller, not an official Anthropic/OpenAI route; I did not evaluate its reliability or terms.

### Inferences
- A typical $5 top-up buys about 2.5M Sonnet 5.5 input tokens or 500k output tokens at list price; with batch + caching the same $5 goes 2-10x further for suitable workloads.
- Cheapest capable options for a tight budget: Gemini 3.5 Flash-Lite / 3.8 Flash, GPT-6-luna / gpt-5-nano, Claude Haiku 4.5, or Sonnet 5.5 in batch.

### Gaps
- Anthropic $5 minimum and Indian card acceptance not on the official page I could read.
- OpenAI minimum purchase and tax/GST handling not verified on an official page (help.openai.com returned 403).
- I did not verify OpenAI's mini/nano suitability as "flagship-class"; listed for cost only.

---

## 5. Ranked summary: most practical legitimate options for a hobbyist in South Asia (India likely; Pakistan less verified)

### Takeaway
Rank by (a) usable via a standard API key, (b) needs no company, (c) needs no/least payment method. Best zero-cost is Gemini API free tier + Vertex Express Mode (Gemini only). Best for Claude/GPT flagship on a small budget is a $5 prepaid Anthropic/OpenAI top-up (card needed), or AWS's $200 new-account credit for Claude on Bedrock (card needed). Tool-locked subscription promos add value inside the vendor's own tools only.

### Cited Findings / Ranking (with basis)
1. **Gemini API free tier (AI Studio key)** — no card, real API key, Flash-class only, limits shown only in AI Studio and volatile, data used to improve Google products — [Rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), [Pricing](https://ai.google.dev/gemini-api/docs/pricing) [P]; Pro-tier free access ended 1 Apr 2026 [S].
2. **Vertex AI Express Mode** — Gmail account, no billing, 90 days, Gemini only, fixed quotas — [Klymentiev](https://klymentiev.com/blog/gemini-free-credits) [S], [Gemini CLI quotas](https://geminicli.com/docs/resources/quota-and-pricing/) [P-ish].
3. **AWS new-account credits (up to $200, 6 months)** — Claude via Bedrock through a standard AWS SDK/API key from an app; needs a card and the first-use Anthropic use-case form (secondary) — [AWS](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/) [P].
4. **Google Cloud $300 trial** — Gemini on Vertex only (not AI Studio, not Claude), 90 days, card required — [Google Cloud docs](https://docs.cloud.google.com/free/docs/free-cloud-features) [P].
5. **OpenAI data-sharing complimentary tokens** — 250K–1M flagship / 2.5M–10M small tokens per day, but only after you have paid balance/tier and accept sharing traffic with OpenAI — [OpenAI community](https://community.openai.com/t/good-news-extended-free-tokens-on-traffic-shared-with-openai/1241322) [S].
6. **Small prepaid top-up on Anthropic/OpenAI** (about $5; card, USD; 1-year expiry) with Batch + caching — see section 4.
7. **Tool-locked consumer promos** (not API-usable): Jio-Google AI Pro 18 months (Jio Rs 349+ plan), Google AI Plus free 12 months for verified students until 31 Dec 2026, ChatGPT Go 12 months free in India (if still open), Claude Max 20x for OSS maintainers, GitHub Copilot Free/Student (200 credits/month, Auto only), Codex on ChatGPT Free/Go, Antigravity CLI free (~tens of requests/day).
8. **Company/investor-gated** (unlikely for a solo hobbyist): Anthropic and OpenAI startup programs, Google for Startups Cloud, Microsoft Founders Hub (its no-investor $1K+$4K path may be reachable but excludes Claude).
- **Dead or removed since 2025 (do not rely on old posts):** GitHub Models free API (retired 30 Jul 2026); Gemini CLI free individual tier (ended 18 Jun 2026); Copilot Pro in Student Pack (removed, April 2026, secondary); Claude subscription use in third-party harnesses (blocked 2026).

### Inferences
- If the user has any international-enabled card, the best value path for Claude is: AWS $200 credits via Bedrock first, then Anthropic direct $5 top-up; for GPT: $5 top-up plus data-sharing tokens; for Gemini: free tier first.
- If the user has no international card at all, options narrow to Gemini free tier, Vertex Express Mode, the consumer promos above (some also need a payment method, e.g. Google student offer, ChatGPT Go), or a paid INR reseller such as AICredits (unofficial).

### Gaps
- Nothing verified for Pakistan specifically (availability of student offers, Jio-style telco deals, card issuance).
- Real-world limits of the Gemini free tier as of Sept 2026 (Google publishes only in-console).
- Terms of service for reselling gateways were not reviewed.
