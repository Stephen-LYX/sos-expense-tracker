# Troubleshooting Guide
# Problems I ran into and how it was resolved 

## Error: GET / 404 - Root Page Not Found

**Date:** January 14, 2026

### Problem #1
When running `npm run dev` and accessing `http://localhost:3000`, the application returned:
```
GET / 404 in 290 ms
```

Despite having a valid `page.tsx` file in `src/app/page.tsx`, the root route was not being found.

### Root Cause
Next.js was looking for the App Router directory in the wrong location. The project had **two** folders that could serve as the App Router:
- `app/` (in project root) - contained only generated Prisma client files
- `src/app/` (inside src folder) - contained the actual page.tsx and layout.tsx

Next.js prioritizes the root-level `app/` folder over `src/app/`. Since the root `app/` folder only contained Prisma generated files and no `page.tsx`, Next.js couldn't find the root route.

### Diagnosis Steps
1. Verified that `src/app/page.tsx` existed and had valid content
2. Checked `src/app/layout.tsx` for errors (none found)
3. Cleared `.next` build cache (didn't resolve the issue)
4. Listed root directory contents and discovered conflicting `app/` folder
5. Traced the `app/` folder to Prisma client generation configuration

### Solution
1. **Updated Prisma Schema** - Changed the Prisma client output path in `prisma/schema.prisma`:
   ```prisma
   generator client {
     provider = "prisma-client"
     output   = "../src/generated/prisma"  // Changed from "../app/generated/prisma"
   }
   ```

2. **Removed Conflicting Folder** - Deleted the `app/` folder that only contained generated files:
   ```powershell
   Remove-Item -Recurse -Force app
   ```

3. **Regenerated Prisma Client** - Generated the Prisma client in the new location:
   ```bash
   npx prisma generate
   ```

4. **Restarted Dev Server** - Restarted `npm run dev`

### Result
Application now returns `GET / 200` and displays correctly at `http://localhost:3000`

### Key Takeaways
- Next.js App Router looks for routes in `app/` first, then falls back to `src/app/`
- Never place generated files in folders that conflict with framework conventions
- When using Prisma, ensure the `output` path in the generator config doesn't create framework conflicts
- The `src/generated/` folder is a better location for generated code

### Prevention
- Keep generated files separate from application code
- Use naming conventions that clearly indicate generated content
- Document custom output paths in project README
