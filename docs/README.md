**SOS Expense Tracker**

Simple personal expense tracking app built with Next.js, TypeScript, Prisma and NextAuth.

**Description**
- **Purpose:** Track accounts, transactions, categories and budgets for individual users.
- **Auth:** Email/password (credentials) + Google OAuth via NextAuth.
- **DB:** PostgreSQL via Prisma.

**Features**
- **User accounts:** Sign up / sign in with credentials or Google.
- **Accounts:** Create bank/account records with balances.
- **Transactions:** Record income/expenses, link to categories and accounts.
- **Budgets:** Track budget limits and spent amounts.
- **Reports:** Simple charts and summaries in the dashboard.
- **Inline Editing:** Users can inline edit items added for convinience. 

**Tech Stack**
- **Frontend:** Next.js 16 (app router) + React 19 + TypeScript
- **Auth:** NextAuth (JWT sessions) with `@auth/prisma-adapter`
- **ORM:** Prisma (`postgresql` datasource)
- **DB driver:** `pg` (Postgres)
- **Charts / UI:** Shadcn, Tailwind, Lucide icons

**Quick Start (local)**
1. **Prerequisites:**
   - Node.js (v18+ recommended)
   - PostgreSQL (local or hosted)

2. Clone and install:

```bash
npm install
```

3. Create a `.env` file at project root with the required environment variables (example below).

4. Initialize / migrate the database (development):

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

**Important Environment Variables**
- **`DATABASE_URL`**: Postgres connection string (example: `postgresql://user:pass@host:5432/dbname`)
- **`NEXTAUTH_SECRET`**: Random secret for NextAuth (use `openssl rand -hex 32`)
- **`GOOGLE_CLIENT_ID`** and **`GOOGLE_CLIENT_SECRET`**: For Google OAuth provider
- (Optional) **`NEXTAUTH_URL`**: Root URL for NextAuth if running behind a proxy

**Test Account (if users want to see the features without creating an account)**
```
- Username: test1@gmail.com
- Password: password1234
```

**Prisma / Database**
- **Migrations:** Migrations are stored in `prisma/migrations`. Use `npx prisma migrate dev` for local development and `npx prisma migrate deploy` for production.
- **Studio:** Run `npx prisma studio` to inspect data in a browser.

**Useful NPM Scripts**
- **`dev`**: `npm run dev` — start Next.js dev server
- **`build`**: `npm run build` — runs `prisma generate` then `next build`
- **`start`**: `npm run start` — run the production server
- **`lint`**: `npm run lint` — run ESLint

**Project Layout (key files)**
- **`src/app`**: Next.js app routes, pages and API routes
- **`src/auth.ts`**: NextAuth configuration and providers
- **`src/lib/prisma.tsx`**: Prisma client wrapper
- **`src/components`**: UI components and dashboard pieces
- **`prisma/schema.prisma`**: Prisma schema (`postgresql` datasource)

**Deployment Notes**
- Ensure `DATABASE_URL` and `NEXTAUTH_SECRET` are set in your host (Vercel, Railway, Render, etc.).
- Run Prisma migrations on deploy (`npx prisma migrate deploy`) or use your CI to apply them.

**Contributing**
- Open a PR for improvements or bug fixes. If adding DB changes, include a migration and update the schema.