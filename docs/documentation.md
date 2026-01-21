# SOS Project Documentation
# Disclaimer: Documentation is written by me and later cleaned up structurly, grammatically and professionally by Claude AI (Sonnet 4.5) to ensure readers understand. 

## Date: 1/13/2026
## Project Overview

**SOS Project** is a personal finance management application built with Next.js, TypeScript, and Prisma ORM. The application provides a foundation for tracking financial accounts, transactions, budgets, and categorizing expenses with a hierarchical category system.

**Tech Stack:**
- **Framework:** Next.js 16.1.1 (React 19.2.3)
- **Language:** TypeScript 5
- **Database:** PostgreSQL
- **ORM:** Prisma 7.2.0 with PostgreSQL adapter
- **Styling:** Tailwind CSS 4
- **Runtime:** Node.js

---

## Database Schema

The application uses Prisma ORM to manage a PostgreSQL database with five core models:

### 1. User Model
Represents users of the application.

**Fields:**
- `id` (String, Primary Key, cuid()) - Globally unique identifier
- `email` (String, Unique) - User's email address
- `emailVerified` (DateTime, Optional) - Email verification timestamp (required for Auth.js)
- `username` (String, Unique, Optional) - Unique username
- `name` (String, Optional) - User's display name
- `passwordHash` (String, Optional) - Hashed password for credential authentication
- `image` (String, Optional) - Profile image URL (for OAuth providers)
- `createdAt` (DateTime, Default: now())

**Why cuid() instead of autoincrement?**
- **Global Uniqueness:** CUIDs are globally unique across distributed systems, unlike sequential integers
- **Security:** Sequential IDs expose information about record count and creation order, making enumeration attacks easier
- **Distributed Systems:** CUIDs can be generated client-side without database roundtrips
- **Auth.js Compatibility:** Modern authentication libraries (Auth.js, Clerk) require string-based IDs
- **Scalability:** No single point of failure for ID generation in distributed databases
- **Collision-Free:** Cryptographically random with negligible collision probability

**Note:** The change from integer to string IDs is a one-time migration. All foreign keys referencing User must also be updated to String type.

**Relations:**
- One-to-many with Account
- One-to-many with Category
- One-to-many with Transaction
- One-to-many with Budget

### 2. Account Model
Represents financial accounts (checking, savings, credit cards, etc.).

**Fields:**
- `id` (Int, Primary Key, Auto-increment)
- `userId` (String, Foreign Key → User) - References User.id
- `accountName` (String) - Name of the account (e.g., "Chase Checking", "Discover Credit Card")
- `type` (String) - Account type (e.g., "checking", "savings", "credit", "cash")
- `balance` (Decimal) - Current account balance
- `createdAt` (DateTime, Default: now())

**Relations:**
- Many-to-one with User
- One-to-many with Transaction

### 3. Category Model
Represents expense/income categories with hierarchical support.

**Fields:**
- `id` (Int, Primary Key, Auto-increment)
- `categoryName` (String) - Name of the category (e.g., "Food", "Rent", "Travel")
- `userId` (String, Foreign Key → User) - References User.id
- `parentId` (Int, Optional, Foreign Key → Category) - Enables parent-child relationships

**Relations:**
- Many-to-one with User
- Self-referential: One-to-many with itself (parent-children hierarchy)
- One-to-many with Transaction
- One-to-many with Budget

**Hierarchical Structure:**
The Category model supports recursive relationships, allowing creation of category hierarchies:
- Top-level categories have `parentId = null`
- Child categories reference their parent via `parentId`
- Example structure:
  ```
  Major Expenses (parent)
  ├── Rent (child)
  └── Tuition Fee (child)
  ```

### 4. Transaction Model
Represents individual financial transactions.

**Fields:**
- `id` (Int, Primary Key, Auto-increment)
- `userId` (String, Foreign Key → User) - References User.id
- `accountId` (Int, Foreign Key → Account)
- `categoryId` (Int, Foreign Key → Category)
- `amount` (Decimal) - Transaction amount
- `type` (String) - Transaction type ("income" or "expense")
- `note` (String, Optional) - Additional notes about the transaction
- `occurredAt` (DateTime, Default: now()) - When the transaction occurred
- `createdAt` (DateTime, Default: now()) - When the record was created

**Relations:**
- Many-to-one with User
- Many-to-one with Account
- Many-to-one with Category

### 5. Budget Model
Represents budget limits for specific categories.

**Fields:**
- `id` (Int, Primary Key, Auto-increment)
- `userId` (String, Foreign Key → User) - References User.id
- `categoryId` (Int, Foreign Key → Category)
- `amountLimit` (Decimal) - Budget limit amount
- `startDate` (DateTime, Default: now()) - Budget period start date
- `endDate` (DateTime, Default: now()) - Budget period end date

**Relations:**
- Many-to-one with User
- Many-to-one with Category

---

## Project Structure

```
sos-project/
├── app/
│   └── generated/
│       └── prisma/          # Auto-generated Prisma client files
│           ├── client.ts
│           ├── browser.ts
│           ├── models.ts
│           └── models/      # Individual model type definitions
├── prisma/
│   ├── schema.prisma        # Prisma schema definition
│   ├── seed.ts              # Database seeding script
│   └── migrations/          # Database migration files
│       ├── migration_lock.toml
│       └── 20260114040249_init/
│           └── migration.sql
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout component
│       ├── page.tsx         # Home page component
│       └── globals.css      # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## Configuration

### Prisma Configuration

**Generator Settings** ([schema.prisma](prisma/schema.prisma)):
```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}
```
- Prisma Client is generated to `app/generated/prisma`
- Run `npx prisma generate` after schema changes

**Database Connection:**
- Uses PostgreSQL with `@prisma/adapter-pg`
- Connection string configured via `DATABASE_URL` environment variable

### TypeScript Configuration

Key compiler options ([tsconfig.json](tsconfig.json)):
- Target: ES2017
- Module: ESNext
- Strict mode enabled
- Path aliases: `@/*` → `./src/*`

---

## Database Seeding

The project includes a seed script ([prisma/seed.ts](prisma/seed.ts)) that populates the database with initial test data:

**Seed Data:**
- Creates a sample user:
  - ID: Generated cuid (e.g., "clp1q2r3s0000abcde12345")
  - Email: stephenlau849@gmail.com
  - Username: stephenlyx
  - Name: Stephen Lau
  
- Creates a hierarchical category structure:
  - "Major Expenses" (parent category)
    - "Rent" (child)
    - "Tuition Fee" (child)

**Note:** The seed script has been updated to work with string-based User IDs (cuid) instead of integer IDs.

**Running the Seed:**
```bash
npx tsx prisma/seed.ts
```

---

## Available Scripts

Defined in [package.json](package.json):

- `npm run dev` - Start development server (runs on http://localhost:3000)
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Prisma Commands:**
- `npx prisma generate` - Generate Prisma Client after schema changes
- `npx prisma migrate dev` - Create and apply database migrations
- `npx prisma studio` - Open Prisma Studio for database visualization
- `npx tsx prisma/seed.ts` - Seed the database with initial data

---

## Development Setup

### Prerequisites
- Node.js (v20 or higher recommended)
- PostgreSQL database
- npm or yarn

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
   ```

3. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Seed the database (optional):**
   ```bash
   npx tsx prisma/seed.ts
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Open application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Why Prisma ORM?

As documented in the project README, Prisma was chosen for the following reasons:

1. **Type Safety:** Provides a fully type-safe query builder that catches errors at compile-time
2. **Automated Migrations:** Simplifies database schema changes with migration system
3. **Intuitive Data Modeling:** Declarative schema definition that's easy to understand and maintain
4. **Reduced Boilerplate:** Less code needed compared to raw SQL queries
5. **Better Developer Experience:** Reduces bugs, cognitive load, and development time

---

## Database Migrations

### Migration History

**Migration 1:** `20260114040249_init`
- Initial database schema creation
- Created all five core tables (User, Account, Category, Transaction, Budget)
- Established foreign key relationships
- Added unique constraints on User email and username
- Set up self-referential relationship for Category hierarchy

**Migration 2:** `20260114050809_init`
- Second initialization migration (updates/refinements)

### Managing Migrations

**Create a new migration:**
```bash
npx prisma migrate dev --name description_of_changes
```

**Check migration status:**
```bash
npx prisma migrate status
```

**Reset database (development only):**
```bash
npx prisma migrate reset
```

---

## Frontend Implementation

### Current UI

The application currently displays a default Next.js starter page ([src/app/page.tsx](src/app/page.tsx)) with:
- Next.js logo
- Getting started instructions
- Links to Vercel deployment and Next.js documentation
- Styled with Tailwind CSS
- Dark mode support

### Layout Configuration

Root layout ([src/app/layout.tsx](src/app/layout.tsx)):
- Uses Geist Sans and Geist Mono fonts from Google Fonts
- Metadata configuration
- Global CSS imports

### Styling

- **Framework:** Tailwind CSS 4
- **Configuration:** PostCSS with @tailwindcss/postcss plugin
- **Global Styles:** [src/app/globals.css](src/app/globals.css)
- **Theme:** Supports light and dark modes

---

## Key Features Implemented

**Database Schema:**
- Complete data models for financial management
- User authentication structure (password hashing)
- Account management
- Hierarchical category system
- Transaction tracking
- Budget management

**Database Infrastructure:**
- PostgreSQL connection via Prisma
- Migration system set up
- Database seeding capability
- Type-safe database client generation

**Development Environment:**
- Next.js application framework
- TypeScript configuration
- Tailwind CSS styling system
- ESLint for code quality

---

## Notes and Best Practices

### Prisma Conventions

As documented in the schema comments:

- **@id:** Marks a field as the primary key
- **@default(autoincrement()):** Auto-generates integer values (like SQL SERIAL) - used for non-user tables
- **@default(cuid()):** Generates collision-resistant unique identifiers - used for User table
- **@unique:** Ensures no duplicate values in the column
- **?** suffix: Marks a field as optional (nullable)
- **[]** suffix: Relation field (doesn't create a DB column)
- **@@** attributes: Apply to entire model (e.g., composite primary keys)

**ID Strategy:**
- **User table:** Uses `String` with `cuid()` for global uniqueness, security, and Auth.js compatibility
- **Other tables:** Use `Int` with `autoincrement()` for simplicity and performance
- **Foreign keys:** Must match the type of the referenced primary key (e.g., `userId: String` to match `User.id`)

### Relation Naming
- Prisma convention uses lowercase plural for relation fields
- Example: `account Account[]` instead of `accounts Account[]`

---

## Environment Variables

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database`
  - Used by Prisma for database connections

---

## Generated Files

**Important:** The following directories contain auto-generated code:
- `app/generated/prisma/` - Generated by `npx prisma generate`
- `.next/` - Generated by Next.js build process

These should not be manually edited and are typically included in `.gitignore`.

---

## Future Considerations

The current implementation provides a solid foundation. The database schema supports but doesn't yet implement:
- User authentication/authorization flows
- API routes for CRUD operations
- Frontend UI for managing accounts, transactions, budgets
- Data visualization and reporting
- Budget tracking and alerts
- Multi-user support and data isolation

---

*Last Updated: January 14, 2026*


## Date: 1/17/2026

## Database Connection and Frontend Integration

This section documents the challenges encountered while connecting to the Prisma database and displaying data on the frontend, along with the solutions implemented for Prisma 7 compatibility.

---

### Issue 1: Incorrect Prisma Generator Provider

**Problem:**
The initial Prisma schema configuration used an incorrect generator provider:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

This non-standard provider (`prisma-client` instead of `prisma-client-js`) generated a client that required constructor options, causing the following error when attempting to instantiate:

```
PrismaClientInitializationError: `PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`
```

**Root Cause:**
The `"prisma-client"` provider is not the standard Prisma generator. The correct provider for JavaScript/TypeScript projects is `"prisma-client-js"`.

**Solution:**
Updated the generator configuration to use the standard provider:

```prisma
generator client {
  provider = "prisma-client-js"
}
```

Removed the custom output path to use the default `node_modules/@prisma/client` location. Regenerated the client with:

```bash
npx prisma generate
```

The `src/generated/prisma` folder was deleted as it was no longer needed with the standard configuration.

---

### Issue 2: Import Path and Typo Errors

**Problem:**
Multiple errors occurred when attempting to query categories:

1. **Incorrect import path:**
   ```typescript
   import { PrismaClient } from "@prisma/client/extension"
   ```
   Error: `Module '"@prisma/client"' has no exported member 'PrismaClient'`

2. **Model name typo:**
   ```typescript
   const categories = await prisma.categroy.findMany()
   ```
   TypeScript couldn't find a model called "categroy", causing it to fall back to `any` type.

3. **Type inference failure:**
   The `category` parameter in the `.map()` function had an implicit `any` type:
   ```typescript
   categories.map((category) => (  // Error: Parameter 'category' implicitly has an 'any' type
       <li key={category.id}>{category.categoryName}</li>
   ))
   ```

**Root Cause:**
- The import path included an incorrect `/extension` suffix
- Typo in the model name prevented Prisma from providing proper type inference
- Without correct types, TypeScript couldn't infer the category object structure

**Solution:**
1. Corrected the import statement:
   ```typescript
   import { PrismaClient } from "@prisma/client"
   ```

2. Fixed the model name typo:
   ```typescript
   const categories = await prisma.category.findMany({
       select: {
           id: true,
           categoryName: true,
           parentId: true,
       },
   })
   ```

With these corrections, TypeScript properly inferred the type of `category` as:
```typescript
{
    id: number;
    categoryName: string;
    parentId: number | null;
}
```

---

### Issue 3: Prisma 7 Configuration Changes

**Problem:**
Even after fixing the generator and import issues, the application threw an initialization error:

```
PrismaClientInitializationError: `PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`
```

**Root Cause:**
Prisma 7 introduced significant architectural changes compared to earlier versions:

1. **Configuration File:** Prisma 7 uses `prisma.config.ts` for configuration instead of environment variables in `schema.prisma`
2. **Database Adapters:** PostgreSQL connections require the `@prisma/adapter-pg` package
3. **Datasource URL:** The database URL is no longer specified directly in `schema.prisma` but in `prisma.config.ts`

The schema initially had:
```prisma
datasource db {
  provider = "postgresql"
  // Missing url = env("DATABASE_URL")
}
```

**Solution:**

Prisma 7 uses a dedicated configuration file (`prisma.config.ts`) for database connection settings:

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: 'tsx prisma/seed.ts'
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

The `.env` file contains the PostgreSQL connection string:
```env
DATABASE_URL="postgres://[username]:[password]@db.prisma.io:5432/postgres?sslmode=require"
```

For Prisma 7 with PostgreSQL in Next.js applications, the standard instantiation works:

```typescript
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
```

The client automatically loads configuration from `prisma.config.ts`, which reads the `DATABASE_URL` from the environment variables.

**Note:** For advanced use cases requiring direct connection pool management, Prisma 7 supports the PostgreSQL adapter pattern:

```typescript
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
```

However, this is typically unnecessary for standard Next.js applications as the default configuration handles connection management automatically.

---

### Final Working Implementation

**File:** `src/app/budget/page.tsx`

```typescript
import DisplayBalance from "@/component/DisplayBalance"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function Budget() {
    const categories = await prisma.category.findMany({
        select: {
            id: true, 
            categoryName: true,
            parentId: true,
        },
    })

    return (
        <main>
            <DisplayBalance />
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.categoryName}
                    </li>
                ))}
            </ul>
        </main>
    )
}
```

**Summary:**
1. Used standard `prisma-client-js` generator
2. Corrected import path from `@prisma/client`
3. Fixed model name typo (`category` instead of `categroy`)
4. Configured database connection via `prisma.config.ts` (Prisma 7 standard)
5. TypeScript now properly infers category types
6. Database queries execute successfully

---
