# LLM quiz integration

## Source ownership

LLMQ owns the questionnaire, browser implementation, scoring, strings, local image export and optional submission Worker. The parent Astro/Starlight blog imports the pinned submodule's source; it does not copy this repository's implementation or standalone `dist/`. This integration starts at `v3.0.0` (`4bc98a2183ca67fa958d224e55ba11c8853885fb`), independently of v3.1 development.

## Public module boundary

- `src/module.ts` exports pure `moduleMeta`: `id: 'llmq'`, languages `en` and `zh-CN`, and localized title/description derived from `quizStrings` title/subtitle. It imports no Astro component, CSS, browser logic or host source and performs no network/storage access.
- `src/components/llmq/Quiz.astro` requires `language: 'en' | 'zh-CN'` and `pagePath: string`. The host passes the actual localized absolute pathname, which is serialized onto the quiz root and used by text and PNG sharing with the current origin. The browser no longer derives routing from language or module configuration.
- `src/styles/llmq.css` remains scoped to the quiz and consumes inherited `--sl-*` tokens. Standalone `src/styles/shell.css` is not imported by the production component.
- `CONFIG` retains scoring, debug and submission-service configuration, not publication status or a base path. No module preview banner remains.

## Host responsibilities

The blog's `src/lib/fun/catalog.ts` registers metadata, stable slug `llm-quiz`, order and one `draft`/`preview`/`published` state. The host's shared Fun page owns title, description, Starlight shell, preview notice, robots metadata, Pagefind and interactive-region exclusion. Cards, generated routes, locale navigation and sitemap use the same catalog. Stable public URLs remain `/fun/llm-quiz/` and `/zh/fun/llm-quiz/`.

Local route wrappers use the standalone shell with explicit `noindex,nofollow` and pass their fixed bilingual paths. They remain a development harness, not a second site deployment. The host owns its theme, header, sidebar and footer.

## Unchanged data and service boundary

Question banks, algorithm, answer/result codes, package version, session keys, Worker source, service identity and `SUBMIT_ENDPOINT` are unchanged by this integration. Answers and notes remain browser-session data until explicit submission consent. Counts and submissions retain the existing endpoint and production CORS restrictions. Do not contact private storage or issue production requests during integration checks; use isolated local service fixtures or intercepted browser requests. Host builds never deploy or bootstrap the Worker.

## Integration verification

Run module checks and the parent blog's quality command after both module submodule pins are available. Exercise the bilingual host pages, human flow, resume/back, agent prompt/reply import and text/PNG sharing; verify links use the supplied `pagePath`, published introductions are indexed, and interactive controls/results are ignored by Pagefind. Change the host state to preview/draft only in an isolated check to verify route/card/sitemap/robots policy. No new wording or source-text snapshot test is needed for this boundary.
