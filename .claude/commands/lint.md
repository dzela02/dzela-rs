---
description: Run ESLint across all workspaces and report violations
---

Run `pnpm lint` from the monorepo root. List every violation with rule name, file, and line. Group by severity (error vs warning). If the user passes `--fix`, run `pnpm lint:fix` instead. Do not auto-fix without being asked.
