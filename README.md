# FixMate Client

Frontend application built with Next.js App Router, TypeScript, Tailwind CSS, Better Auth, and shadcn/ui-ready configuration.

## Run locally
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local` and configure MongoDB, Better Auth secret, and API URL.
3. Install dependencies: `npm install`
4. Start: `npm run dev`

The app runs at http://localhost:3000.

The client expects the FixMate API to run at `NEXT_PUBLIC_API_URL` (default: http://localhost:4000/api).
