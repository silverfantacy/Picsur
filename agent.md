# AGENTS.md

> Picsur: An open-source, self-hostable image hosting service (similar to Imgur).

## 🏗️ Project Structure & Stack

- **Monorepo**: Managed by `pnpm` (v9+).
- **Frontend**: Angular 18 (SPA), SCSS, RxJS, Zod v4.
- **Backend**: NestJS 11 (Fastify), TypeORM (PostgreSQL), Passport (JWT/API Key).
- **Shared**: TypeScript workspace for DTOs, Entities, and Validators.

## 🛠️ Tooling & Commands

- **Install Dependencies**: `pnpm install`
- **Build All**: `pnpm build` (Root script)
- **Shared Library**:
  - Build: `pnpm --filter picsur-shared build` (Must run before other apps if shared code changes)
- **Frontend**:
  - Dev: `ng serve`
  - Build: `pnpm --filter picsur-frontend build`
- **Backend**:
  - Dev: `pnpm --filter picsur-backend start:dev`
  - Build: `pnpm --filter picsur-backend build`

## 📐 Code Style & Patterns

### Explicit Type Validation
- **Zod-First**: Use `zod` schemas for all data validation.
- **Generics**: When using generics with Zod objects, use `z.ZodObject<any>` instead of `z.AnyZodObject` (Zod v4 requirement).
- **DTOs**: Define all DTOs in `shared/src/dto` to ensure contract safety between frontend and backend.

### Authentication
- **Backend Strategies**:
  - JWT (Bearer)
  - API Key (`Api-Key` header)
- **Frontend Client**: `api.service.ts` handles auth headers automatically.

### Angular (Frontend)
- **Service-Based**: Logic should reside in services, not components.
- **Strict Typing**: Avoid `any` where possible; use shared DTOs.
- **RxJS**: Use observables for async streams; manage subscriptions using `async` pipe or explicit unsubscribe logic.

## ⚠️ Critical Context

- **Node.js Compatibility**: Frontend requires Node v20.19+ for Angular 21, so it is currently downgraded to **Angular 18** to support Node v20.17 environments.
- **Monorepo Build Order**: `shared` -> `backend` / `frontend`.
- **Zod Version**: Project is unified on **Zod v4**. Be careful with deprecated v3 types.
