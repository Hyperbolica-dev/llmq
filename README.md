# llmq

Standalone bilingual Astro application for the recreational LLM Quiz. Package version **3.0.0** is the approved v3.0 baseline extracted from the original blog's committed source **`b529f55`**. Quiz logic, questionnaire banks, scoring, answer encoding, local PNG sharing, tests and Worker source are retained from that baseline. The new app shell has no Starlight, parent-blog, database or CMS dependency.

Development of the quiz now belongs independently in this repository. The original blog consumes a **pinned Git submodule commit**; changes here do not automatically update the blog or production. The `v3.0.0` tag freezes this baseline; v3.1 design and development live on the separate `v3.1` branch. Do not silently reinterpret v3 answer codes or overwrite the frozen release when developing a new questionnaire version.

## Run locally

Use **Node.js 22.13 or newer** and npm. A committed lockfile pins the installation; CI uses the same reproducible command:

```sh
npm ci
npm run dev
```

The development server defaults to port **4322**. Open:

- `/` — bilingual entry point
- `/fun/llm-quiz/` — English
- `/zh/fun/llm-quiz/` — Simplified Chinese

```sh
npm run quiz:data  # regenerate and validate reviewed public questionnaire banks
npm test          # questionnaire, scoring, codes, session and local Worker tests
npm run lint      # established ESLint rules for Astro, TypeScript and modules
npm run build     # regenerate public banks and build static dist/
npm run preview   # preview the built site
npm run quality   # Astro check, lint, tests and production build
```

Tests use Node's built-in runner and `node:sqlite`; experimental-feature warnings depend on Node version. No test requires production Cloudflare access. The quality workflow only checks the app: it does not publish a site or deploy a Worker.

## Stable integration boundaries

- `src/module.ts`: pure `moduleMeta` (`id: 'llmq'`, supported languages and title/description derived from `quizStrings`), safe for host configuration imports without Astro, CSS or browser APIs.
- `src/components/llmq/Quiz.astro`: the reusable quiz component with required `language` (`en` or `zh-CN`) and required `pagePath` (the host's localized absolute pathname). Text sharing and PNG exports use this path with the current origin; the module does not infer locale prefixes.
- `src/lib/llmq/`: browser logic, strings, local model icons and public generated banks.
- `src/styles/llmq.css`: scoped quiz styling using inherited `--sl-*` design tokens; publication banners belong to the host.
- `src/styles/shell.css`: standalone light/dark tokens and responsive shell styles; the blog supplies its own existing Starlight tokens instead.
- `src/pages/fun/llm-quiz/index.astro` and `src/pages/zh/fun/llm-quiz/index.astro`: stable routes; preserve both URLs when integrating.
- `scripts/build-questions.mjs` and `scripts/validate-questions.mjs`: generate banks from the reviewed questionnaire Markdown under `docs/llmq/`.
- `worker/`: existing submission-service implementation and operator documentation, **not a new service to create**.

The parent blog should pin this repository as a submodule and import the component through that checked-out path, preserving the `components/llmq`, `lib/llmq` and `styles/llmq.css` relative structure. Keep the blog's route wrappers and theme outside the submodule. Advance the pinned commit deliberately after reviewing the relevant release; do not independently edit a second quiz source copy. The standalone app imports no files from the parent blog.

The host owns publication status, cards, generated routes, sitemap, Pagefind, robots metadata and preview notices. The module has no publication switch or base-path configuration. Local route wrappers pass their fixed paths explicitly and use `noindex,nofollow`; they are development harnesses, not a second publication pipeline. `CONFIG` retains scoring/debug/service settings, including the unchanged production `SUBMIT_ENDPOINT`. The host integration branch starts from `v3.0.0`; it does not incorporate v3.1 questionnaire development.

## Production service: do not replace or re-bootstrap

The existing deployed Worker remains `https://submit.hyperbolica-dev-tools.workers.dev/`. Its endpoint, Worker name, KV namespace ID, Durable Object class/migration and `global-v1` object identity are intentionally unchanged. No replacement Worker, KV namespace or Durable Object should be created just to run this frontend. Never casually deploy the bundled Worker or repeat the one-time ledger bootstrap: these are owner-controlled operations against retained private data. See [Worker operations](worker/README.md).

Production CORS authorizes only `https://hyperbolica-dev.github.io`. Local development and a newly hosted standalone origin are **not authorized** to submit or read origin-restricted counts; the quiz handles unavailable counts without inventing totals. Do not broaden CORS for local development, send disposable production submissions, or use production data to smoke-test. Human completion, prompt generation, reply import, code sharing and local PNG generation remain client-side. Use an explicitly isolated service and storage only if the owner separately authorizes submission-service testing.

## Public-data safety

**This is a public source repository, not a submission dataset.** Never add raw exports, private responses, nicknames, age/tags, memory annotations, feedback, submission notes, bearer tokens, account credentials, `.env`, `.dev.vars`, `.wrangler`, logs or private storage snapshots. Aggregate model profiles and reviewed public question banks already in `src/lib/llmq/data/` are intentional public assets. Private data collection and calibration datasets live outside this repository. `.gitignore` is only a guardrail: manually review every staged file and diff before publishing. Report an accidental disclosure privately to the repository owner; do not paste sensitive records into issues.

## Documentation and licensing

The extracted `docs/llmq/` documents preserve the approved questionnaire, algorithm, calibration protocol and historical editorial context. `integration-notes.md` and `PUBLISH.md` describe the current source-module boundary; archived requests and editorial returns may describe superseded publication switches. Current standalone commands and boundaries are documented above.

No new project-wide license has been selected. Public source visibility is not a grant of unrestricted reuse. The existing model-icon license and attribution remain in [`src/lib/llmq/icons/LICENSE`](src/lib/llmq/icons/LICENSE); that license applies to those assets, not automatically to the whole project. See [contribution guidance](CONTRIBUTING.md).
