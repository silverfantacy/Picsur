# AGENTS.md

> Picsur: An open-source, self-hostable image hosting service (similar to Imgur).

## 🏗️ Project Structure & Stack

- **Version**: 0.5.7
- **Monorepo**: Managed by `pnpm` (v9+).
- **Frontend**: Angular 18 (SPA), SCSS, RxJS, Zod v4.
- **Backend**: NestJS 11 (Fastify), TypeORM (PostgreSQL), Passport (JWT/API Key).
- **Shared**: TypeScript workspace for DTOs, Entities, and Validators.

## 🛠️ Tooling & Commands

- **Install Dependencies**: `pnpm install`
- **Build All**: `pnpm build`
- **Docker Build**: `docker build -t picsur .` (Uses multi-stage optimization)
- **Shared Library**:
  - Build: `pnpm --filter picsur-shared build` (Must run before other apps)

## 📐 Code Style & Patterns

### Explicit Type Validation
- **Zod-First**: Use `zod` schemas for all data validation.
- **Generics**: Use `z.ZodObject<any>` (Zod v4).
- **DTOs**: Define in `shared/src/dto` for frontend/backend contract safety.

### Authentication
- **Strategies**: JWT (Bearer) and API Key (`Api-Key` header).
- **Client**: `api.service.ts` handles headers automatically.

## 🚀 Infrastructure & Deployment

### Docker Optimization
- **Base Image**: Switched to `node:20-bookworm-slim` for better `libvips` performance (glibc vs musl).
- **Performance Tuning**: `UV_THREADPOOL_SIZE=4` is recommended for balancing image processing performance and stability on lower-tier servers.
- **Environment**: 
  - `PICSUR_HOST=0.0.0.0`
  - `PICSUR_PORT=8080` (Standard for Zeabur/Container environments)

### SPA Routing (Zeabur / Static Hosting)
- **Requirement**: Ensure all non-file requests are routed to `index.html`.
- **Config**: Use `renderPath: '/*'` or equivalent fallback for static file serving.

## ⚠️ Critical Context

- **Node.js Compatibility**: Currently target **Node v20** and **Angular 18** to maintain compatibility across common deployment environments.
- **Monorepo Build Order**: `shared` -> `backend` / `frontend`.
- **Image Processing**: Rely on `libvips-dev` and `sharp`. Ensure system dependencies are installed in the Docker runtime.
