# CareerOS API

Production-shaped, hackathon-friendly Express + TypeScript API for the CareerOS student placement platform. It always runs in **demo-memory mode** without Postgres or an AI key, so the complete student journey is immediately demonstrable. A full Prisma/PostgreSQL schema and seed script are included for persistence.

## Stack

Express, TypeScript, Prisma/PostgreSQL, JWT, bcrypt, Zod, Helmet, CORS, Morgan. AI behavior is deterministic mock mode unless an AI provider is added to the service layer.

## Run demo mode

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API starts on `http://localhost:5000`. In demo-memory mode, no database is needed.

Demo credentials: `alex@careeros.demo` / `password123`.

## Enable PostgreSQL

Set `DATABASE_URL` in `.env`, then run:

```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

The seed creates Alex Johnson, a realistic skill profile, five companies, and an initial catalog. The current demo API uses the in-memory repository intentionally, which preserves immediate usability if Postgres is unavailable; `prisma/schema.prisma` provides the production persistence contract.

## API overview

All successful responses are `{ "success": true, "data": ... }`; errors are `{ "success": false, "message": ..., "errors": [] }`. Except for `/health` and auth, endpoints require `Authorization: Bearer <token>`.

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Passport | `/api/profile`, `/api/profile/skills`, `/api/profile/projects`, `/api/profile/connections` |
| Skills & roadmap | `GET /api/skills/tree`, `POST /api/analysis/skill-gap`, `GET /api/roadmap` |
| Learning | `GET /api/learning/skills/:skillId`, completion and assessment endpoints |
| Companies | `/api/companies`, `/api/companies/fit`, `/api/target-company` |
| Missions | `/api/missions/today`, `/api/missions/generate`, task completion, wellbeing |
| Intelligence | `/api/interviews`, `/api/resumes`, `/api/readiness`, `/api/career/*`, `/api/dashboard` |

## Scoring

Company fit uses weighted role-skill attainment (60%) plus projects (15%), communication (10%), interview performance (10%), and resume strength (5%). Results are `BEST_FIT` at 80+, `STRETCH` at 60–79, and `FUTURE_TARGET` below 60.

Placement readiness weights DSA 20%, Core CS 20%, Projects 15%, Communication 15%, Resume 10%, and Interview 20%. Learning actions, assessment scores, missions, interview attempts, and resume analysis update the signals.

## Mock AI

The deterministic AI-ready layer generates recommendations, plans, answer feedback, and resume guidance from submitted data. Resume suggestions never add invented experience or skills; they only identify relevant terms that are absent.
