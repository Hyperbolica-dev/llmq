# Contributing

This repository owns independent development of llmq. The original blog integrates a pinned submodule commit rather than a separate editable quiz copy. Preserve the stable English `/fun/llm-quiz/` and Chinese `/zh/fun/llm-quiz/` routes and the reusable component/lib/style structure.

## Changes and checks

Use Node.js 22.13+ and `npm ci` with the committed lockfile. Run `npm run quality` before proposing a change; it runs Astro check, lint, tests and a static build. Manually exercise both languages, human completion and Back/reload, agent prompt generation and reply import, result-code round trips, and PNG download. Do not authorize or send production submissions as part of these checks.

Questionnaire Markdown in `docs/llmq/` owns public question text and metadata; regenerate the public JSON banks with `npm run quiz:data` and include the resulting changes. Keep both languages aligned on IDs, positions and metadata. Interface copy belongs in the existing string modules. Preserve v3 scoring and encoding semantics for the frozen 3.0 release; versioned questionnaire changes need explicit review rather than silently remapping existing codes. Design proposals do not themselves mean a new version has shipped.

Avoid importing the original blog, Starlight or CMS machinery into this standalone app. Reuse existing quiz modules and testing patterns. Keep changes focused and document permanent interface or workflow changes in the existing relevant documentation.

## No private data in public contributions

Do not commit, attach to issues or paste into pull requests raw submissions, private calibration exports, personal tags/nicknames, feedback, notes, memory metadata, credentials, tokens, provider state or private logs. Keep datasets outside the repository. Use only explicitly synthetic, non-identifying fixtures for test changes. Review staged paths and their contents; ignore patterns are not a privacy scanner. Report an accidental exposure privately to the owner.

The existing production Worker and retained storage are not development infrastructure. Do not change production CORS, binding identities, secrets, bootstrap state or deployment settings to make a local test pass. Any separate isolated Worker testing requires owner authorization. CI never deploys a Worker.

## Licensing

No new project-wide license has been selected. Do not add a license or imply unrestricted reuse on the owner's behalf. Preserve the existing model-icon license and attribution at `src/lib/llmq/icons/LICENSE` and clarify any third-party provenance introduced by a proposed change.
