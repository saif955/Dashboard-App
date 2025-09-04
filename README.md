# Dashboard App (Next.js + Tailwind + shadcn/ui)

A modern users dashboard built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion. It fetches users from JSONPlaceholder, shows a responsive list with search and pagination, and provides a detailed user view with a route-level loading skeleton.

## Tech Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS (utility-first styling)
- shadcn/ui (headless Radix + Tailwind components)
- Framer Motion (micro-interactions)
- ESLint (Next.js rules)

## Live

- Production: <YOUR_VERCEL_URL>
- Repo: <YOUR_REPO_URL>

## Features

- Users list (responsive) with columns: Name, Email, Phone, Company
- Search filter (name or email)
- Client-side pagination (5 / 10 / 15 per page)
- Row is clickable; name has a hover underline
- Details page: Personal, Address (with geo), Company
- Route-level loading UI for details (`/users/[id]/loading.tsx`)
- Favicon via `app/icon.png` or `app/favicon.ico`

## Getting Started (Local)

1. Install

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Open

- http://localhost:3000 (or the port shown)

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run start` – Start production server (after build)
- `npm run lint` – Lint

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout
    page.tsx            # Landing page
    users/
      page.tsx          # Users list (search + pagination)
      [id]/
        page.tsx        # User details page
        loading.tsx     # Route-level skeleton while fetching
  components/
    UserCard.tsx        # (kept for reuse; index uses list rows)
  lib/
    users.ts            # fetchUser(s) with full typed model
```

## Data Model (from JSONPlaceholder)

```ts
export interface Geo {
  lat: string;
  lng: string;
}
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
```

## Key Implementation Notes

- App Router async route params (Next 15): `params` is a Promise, so details page awaits it:

```ts
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

- List uses client-side pagination and memoized filtering
- Headers mirror row widths for perfect alignment
- Accessible keyboard/focus: rows are `<Link>` wrappers; name styled as a link

## Styling & UX

- Tailwind utilities for layout and spacing
- Subtle row hover (`hover:bg-gray-200`)
- Animated button/link transitions with Framer Motion
- Mobile: email shown under name; desktop: email has its own column

## Deployment (Vercel)

Option A – CLI

```bash
npm i -g vercel
vercel            # first deploy (link/create project)
vercel --prod     # production deploy
```

Option B – GitHub

- Import repo in Vercel → Framework auto-detects Next.js → Deploy

Build settings (auto):

- Build: `next build`
- Dev: `next dev --port $PORT`
- Install: npm / pnpm / yarn / bun
- Output: Next.js default

## Favicon

- Add `src/app/icon.png` (512x512) or `src/app/favicon.ico`. Next will use it automatically.

## Environment

- No environment variables required
- External API: `https://jsonplaceholder.typicode.com/users`

## Future Enhancements

- Column sorting (name, email, company)
- Server-side pagination/infinite scroll
- Data caching (React Cache/Next data cache) and revalidation
- Error boundaries and retry UI
- Unit tests (Vitest/RTL) and E2E tests (Playwright)

## Author

- Your Name – <email@example.com> – <LinkedIn or Portfolio>

---

If you encounter issues building on Vercel, ensure no raw `<a>` tags are used for internal navigation (use `next/link`).
