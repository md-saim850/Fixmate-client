# FixMate client — agent notes

Next.js 15 App Router client for the FixMate repair marketplace. TypeScript (strict), React 19, Tailwind 3, shadcn/ui config. This directory is its own git repo.

## Commands

- Install: `npm install`; dev: `npm run dev` → http://localhost:3000; build: `npm run build`.
- Typecheck: `npx tsc --noEmit`. The baseline is **not clean** (auth custom fields, `Service.image`, empty `dashboard/page.tsx`), so don't chase unrelated errors.
- No test suite or test script exists.
- `npm run lint` is `next lint`, but no ESLint config is checked in, so it prompts to scaffold one. Don't treat it as a working gate without setting that up.

## Environment and services

- `.env.local` is required and gitignored. The README mentions `.env.example`, but it does not exist. Keys used: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_API_KEY` (plus `IMGBB_API_KEY` for the unused server upload route).
- Auth is Better Auth running inside this app at `/api/auth/[...all]`, storing users directly in MongoDB. The database name is hardcoded as `fixmatedb` in `src/lib/auth.ts`; the sibling API uses `DB_NAME`. Keep them aligned.
- `NEXT_PUBLIC_API_URL` must include `/api` (default `http://localhost:4000/api`). It points at `../fixmate-server` (Express 5; no npm scripts, start with `node index.js`; CORS allows only `localhost:3000`/`3001`).
- The client calls `/payments/*`, which `../fixmate-server` does not implement, so those requests 404. `src/lib/admin-api.ts` likewise defines `/admin/*` helpers that are not implemented server-side; admin pages currently render empty states.

## Auth

- Server components use `getToken()` from `@/lib/getToken` (server-only; reads `headers()`).
- Client components use `getClientToken()` from `@/lib/get-client-token` (calls `authClient.token()`).
- API requests authenticate with `Authorization: Bearer <token>`.
- The Better Auth JWT plugin issues EdDSA tokens; the API verifies them via `${BETTER_AUTH_URL}/api/auth/jwks` with issuer/audience equal to `BETTER_AUTH_URL`. Both apps need the same URL.
- Signup requires custom user fields `role`, `phone`, `area` (`bio`/`avatar` optional); `role` defaults to `customer`. They are missing from the generated session type, hence the existing casts/type errors.
- `src/lib/auth-client.ts` defines two clients: configured `authClient` (jwt plugin) and separate named exports `signIn`/`signUp`/`useSession`/`signOut`. Keep the distinction; `authClient.token()` is the JWT source.
- `BETTER_AUTH_URL` is not a `NEXT_PUBLIC_*` variable, so it is undefined in the browser bundle; the auth client falls back to same-origin, which is correct because auth routes live in this app.

## API and data conventions

- Most data fetching uses raw `fetch`, usually with `cache: "no-store"`. `src/lib/api.ts` (`apiRequest`) exists but is unused.
- Responses are wrapped: list endpoints return `{ services }`, detail returns `{ service }`.
- `Service.image` is declared `string` in `src/types/service.ts`, but the API returns an array and UI code uses `service.image[0]`. Treat it as `string[]` when writing types.
- Browser image uploads go directly to ImgBB via `src/lib/uploadImage.js` using `NEXT_PUBLIC_IMGBB_API_KEY` (visible in the bundle). `/api/upload-image` is an unused server-side alternative requiring `IMGBB_API_KEY`.
- `next.config.ts` allows `next/image` only from `i.ibb.co`; add remote patterns before rendering images from other hosts.

## UI and routing

- App Router lives in `src/app`; alias `@/*` maps to `src/*`.
- `/dashboard/{customer,technician,admin}` are role areas. `src/app/dashboard/layout.tsx` enforces login and a valid role; admins bypass `DashboardShell` and get their own sidebar/layout in `src/app/dashboard/admin/layout.tsx`. There is no middleware.
- `src/app/dashboard/page.tsx` is a zero-byte placeholder; don't delete it as an unused file.
- Use the custom `.container-shell` and `.section-space` utilities from `src/app/globals.css`; pages depend on them instead of ad-hoc max-width wrappers.
- shadcn/ui is configured (new-york style, `@/components/ui`, `cn()` in `src/lib/utils.ts`), but `src/components/ui` does not exist yet; add components with the shadcn CLI.
- Tailwind defines a `brand-*` palette and `shadow-soft`, though existing pages mostly use the green/emerald scales.
