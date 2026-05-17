# Mr KN — Full-Stack Engineer Portfolio

Personal portfolio site built with **Angular 21**, **Angular Material 21**, and a hardened **Nginx** Docker image. Deployable to GitHub Pages or any container host.

## Tech Stack

- **Angular 21** (zoneless change detection, signals, native control flow, standalone components)
- **Angular Material 21** (M3 theme)
- **TypeScript 5.8** in strict mode
- **SCSS** for component styles
- **Karma + Jasmine** for unit tests with SonarQube-compatible coverage output
- **ESLint + Prettier** for code quality
- **Nginx 1.27** (unprivileged Alpine) for production hosting
- **GitHub Actions** for CI/CD, vulnerability scanning, and SonarQube analysis

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── data/           # Content (eras, capabilities, site config)
│   │   ├── models/         # TypeScript interfaces and types
│   │   └── services/       # IconRegistryService (safe SVG mapping)
│   ├── shared/
│   │   └── components/     # Header, BottomNav, Character, EraCard, Icon
│   ├── features/
│   │   ├── home/           # / route
│   │   ├── story/          # /story route
│   │   ├── capabilities/   # /capabilities route
│   │   └── contact/        # /contact route
│   ├── app.component.*     # Root shell
│   ├── app.config.ts       # Zoneless + router config
│   └── app.routes.ts       # Lazy-loaded routes
├── styles.scss             # Global tokens + Material theme
└── index.html              # CSP meta tag included
nginx/
├── nginx.conf              # Main server config
└── default.conf            # Site config with security headers
public/                     # Static assets (favicon, character.png/webp)
.github/workflows/          # CI + GitHub Pages deploy
```

## Code Quality & Security Features

- **Zoneless** — no Zone.js, faster, modern Angular default
- **Signals everywhere** — `input.required()`, `signal()`, `computed()`
- **No `bypassSecurityTrustHtml`** — icons rendered via a typed registry, not `[innerHTML]`
- **No `any`** — ESLint blocks it; SonarQube would flag it anyway
- **Strict TypeScript** — `noUncheckedIndexedAccess`, `noImplicitReturns`, `noUnusedLocals`, etc.
- **Path aliases** — `@core/*`, `@shared/*`, `@features/*` for clean imports
- **Unit tests** — every component and service has a `.spec.ts`
- **SonarQube ready** — `sonar-project.properties` + Karma reporter output `lcov.info` and `sonar-report.xml`
- **Content Security Policy** — strict CSP both in `index.html` meta and Nginx headers (defence in depth)
- **Security headers** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`
- **Rate limiting** — Nginx rate limit zone (10 req/s per IP)
- **Non-root container** — `nginxinc/nginx-unprivileged` runs as UID 101
- **Read-only filesystem** in `docker-compose.yml` (writable tmpfs only for `/tmp`, `/var/cache/nginx`)
- **Capability drop** — all Linux capabilities dropped at runtime
- **no-new-privileges** at the container security_opt level
- **Trivy** vulnerability scan in CI pipeline
- **npm audit** gate in CI (fail on high+ severity)

## Local Development

### Prerequisites

- Node.js 20.19+
- npm 10+

### Run

```bash
npm install
npm start                     # http://localhost:4200
```

### Quality scripts

```bash
npm run lint                  # ESLint check
npm run format                # Prettier format
npm run format:check          # Prettier check (CI)
npm run test                  # Karma watch mode
npm run test:ci               # Headless, with coverage + Sonar report
npm run audit                 # npm audit (fails on high+)
```

## Building

```bash
npm run build                 # Default (production)
npm run build:gh              # For GitHub Pages (base-href=/mr-kn-portfolio/)
npm run build:docker          # For Docker (base-href=/)
```

## Docker

### Build & run locally

```bash
docker compose up --build
```

Open http://localhost:8080

### Standalone build

```bash
docker build -t mr-kn-portfolio:latest .
docker run --rm -p 8080:8080 \
  --read-only \
  --tmpfs /tmp:size=64m \
  --tmpfs /var/cache/nginx:size=32m \
  --tmpfs /var/run:size=4m \
  --cap-drop=ALL \
  --security-opt no-new-privileges:true \
  mr-kn-portfolio:latest
```

The image is ~50 MB (Alpine-based nginx).

### Hosting options

The Docker image is portable to any container runtime — Azure Container Apps, Google Cloud Run, AWS App Runner, Kubernetes, Docker Swarm, etc. For a static-only deploy, GitHub Pages is simpler (see below).

## Deploying to GitHub Pages

This repo includes a workflow at `.github/workflows/deploy.yml` that auto-deploys on push to `main`.

### One-time setup

1. Create a GitHub repo named **`mr-kn-portfolio`** (or any name — update `base-href` in `package.json` accordingly).
2. Push this code to `main`.
3. In repo **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Push to `main` again — the workflow builds, applies the SPA fallback, and publishes.

Live URL: `https://<your-username>.github.io/mr-kn-portfolio/`

## SonarQube Setup

The project is preconfigured for SonarQube:

- `sonar-project.properties` defines the project key, sources, coverage paths.
- `karma.conf.js` outputs `lcov.info` and `sonar-report.xml` to `coverage/mr-kn-portfolio/`.
- `.github/workflows/ci.yml` runs `SonarSource/sonarqube-scan-action`.

To enable in CI, add two repo secrets:
- `SONAR_TOKEN` — your SonarQube/SonarCloud token
- `SONAR_HOST_URL` — your SonarQube server URL (e.g. `https://sonarcloud.io`)

Locally:

```bash
npm run test:ci
# Then run the SonarScanner CLI pointing at sonar-project.properties
```

## Editing Content

Content is decoupled from templates — edit these files:

| What | Where |
|---|---|
| Career timeline (eras) | `src/app/core/data/eras.data.ts` |
| Capability cards | `src/app/core/data/capabilities.data.ts` |
| Stats, contact links, site meta | `src/app/core/data/site-config.data.ts` |
| Logo text "MR / KN" | `src/app/shared/components/header/header.component.html` |
| Character image | replace `public/character.png` and `public/character.webp` |
| Resume PDF | drop in `public/`, link from header and contact |

## License

MIT for code. Content © Mr KN.
