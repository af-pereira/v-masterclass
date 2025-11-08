## VMasterclass — Copilot / AI agent instructions

This file gives targeted, discoverable guidance for an AI coding agent to be productive in this repository.

High-level architecture
- Single-page app built with Vue 3 + Vite. Entry: `src/main.ts` mounts `App.vue` and registers Pinia and the router.
- Routing: `src/router/index.ts` uses `createRouter` + `createWebHistory`. Routes live in `src/views/` and the About page is lazy-loaded via dynamic import.
- State: Pinia stores are in `src/stores/`. Stores use the setup-style `defineStore(..., () => { ... })` and return refs/computed/functions (see `src/stores/counter.ts`).
- Assets & styles: global CSS in `src/assets/main.css` and `src/assets/base.css`.

Key developer workflows (commands)
- Install: `npm install`
- Dev server / hot-reload: `npm run dev` (runs Vite)
- Build for production: `npm run build` — this runs `vue-tsc` type-checking then `vite build` (see `package.json` script which uses `run-p` to run `type-check` and `build-only`).
- Type-check only: `npm run type-check` (uses `vue-tsc --build`)
- Lint & auto-fix: `npm run lint` (runs `eslint . --fix --cache`)
- Format: `npm run format` (Prettier on `src/`)

Project-specific notes and conventions
- TypeScript + Vue SFCs: project uses `vue-tsc` for type checking. Prefer `vue-tsc` over `tsc` for `.vue` files.
- Editor: The README recommends VS Code + Volar. Use Volar for correct Vue+TS intellisense.
- Aliases: `@` is aliased to `./src` in `vite.config.ts` — import like `import Foo from '@/components/Foo.vue'`.
- Nonstandard helper: build uses `run-p` via dev dependency `npm-run-all2` (see `devDependencies`). If a CI environment lacks `run-p`, use the `build-only` + `type-check` scripts directly.

Code patterns to follow (examples)
- Pinia store (setup-style): `src/stores/counter.ts` — define reactive refs, computed, and functions and return them.
- Router lazy-loading: `src/router/index.ts` demonstrates code-splitting by returning `() => import('../views/AboutView.vue')` for the About route.
- Components and views: keep page-level components in `src/views/` and reusable UI in `src/components/` (icons live under `src/components/icons/`).

What to change and why (guidance for PRs)
- Small visual or UI fixes: update components under `src/components` or `src/views`. Keep styling changes scoped to component CSS when possible.
- Adding a new route: add a view under `src/views/` and register in `src/router/index.ts`; prefer lazy-loading for non-trivial pages.
- Adding state: add a Pinia store under `src/stores/` using the established setup-style pattern and import it in components with `useXStore()`.

Files to inspect for context
- `package.json` — scripts and devDependencies (vite, vue-tsc, eslint, npm-run-all2)
- `vite.config.ts` — Vite plugins and `@` alias
- `src/main.ts` — app bootstrap, Pinia and router registration
- `src/router/index.ts`, `src/stores/*.ts`, `src/views/*`, `src/components/*`

Edge cases and gotchas discovered
- Build script relies on `run-p` from `npm-run-all2`. If CI fails to find `run-p`, run `npm run type-check` then `npm run build-only` instead.
- `vue-tsc` is required for accurate type checks of `.vue` SFCs. Running `tsc` alone will be insufficient.

If unclear or missing information
- Ask which CI is used and whether `run-p` is supported. If CI uses a different Node version, note `engines.node` in `package.json` (Node 20+ recommended).

End: after making changes, run `npm run dev` to smoke-test and `npm run type-check` + `npm run lint` before opening a PR.
