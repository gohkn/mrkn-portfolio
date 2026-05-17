# Setup & Deploy Guide — Mr KN Portfolio (Angular 21)

Step-by-step from zero to live site, plus Docker and SonarQube.

---

## Part 1 — Local Setup

### 1. Install prerequisites

- **Node.js 20.19+** — https://nodejs.org (LTS)
- **Git** — https://git-scm.com
- **Docker Desktop** (optional, for container builds) — https://docker.com

Verify:
```bash
node --version    # v20.19.0 or higher
npm --version     # v10.0.0 or higher
git --version
docker --version  # optional
```

### 2. Get the code

Unzip the project, e.g. to `~/projects/mr-kn-portfolio`.

### 3. Install dependencies

```bash
cd mr-kn-portfolio
npm install
```

Takes 1–3 minutes. Downloads Angular 21, Material, dev tools.

### 4. Run the dev server

```bash
npm start
```

Open http://localhost:4200. Hot-reload works as you edit.

### 5. Run the quality gates locally

```bash
npm run lint              # ESLint
npm run format:check      # Prettier
npm run test:ci           # Headless tests with coverage
npm run audit             # npm audit
```

All four should pass clean.

---

## Part 2 — Push to GitHub

### 1. Create the repo

- Go to https://github.com/new
- Name: **`mr-kn-portfolio`** (must match for default base-href, or update `package.json`)
- Public (required for free GitHub Pages)
- Don't add any default files

### 2. Push

```bash
cd mr-kn-portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/mr-kn-portfolio.git
git push -u origin main
```

### 3. Enable GitHub Pages with Actions

- Repo **Settings → Pages**
- **Source**: **GitHub Actions**
- Save

That's it. The workflow at `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

Watch progress under **Actions**. First build: ~3–4 minutes.

Live URL: `https://<your-username>.github.io/mr-kn-portfolio/`

---

## Part 3 — Docker

### Build and run locally

```bash
docker compose up --build
```

Open http://localhost:8080.

### Build only

```bash
docker build -t mr-kn-portfolio:latest .
```

The image is ~50 MB (multi-stage build, Alpine-based runtime).

### Inspect security posture

```bash
# Confirm running as non-root
docker run --rm mr-kn-portfolio:latest whoami      # nginx

# Scan for vulnerabilities
docker run --rm aquasec/trivy:latest image mr-kn-portfolio:latest
```

### Deploy to a container host

The image listens on `8080` (no privileged port needed) and can be pushed to any registry:

```bash
# Example: Azure Container Registry
docker tag mr-kn-portfolio:latest myregistry.azurecr.io/mr-kn-portfolio:1.0.0
docker push myregistry.azurecr.io/mr-kn-portfolio:1.0.0

# Or Docker Hub, GHCR, GCR, ECR — same pattern
```

Then deploy from your registry to:
- **Azure Container Apps** — set ingress to external, target port 8080
- **Google Cloud Run** — `gcloud run deploy --image=... --port=8080`
- **AWS App Runner** — point at the image, port 8080
- **Kubernetes** — standard `Deployment` + `Service`

---

## Part 4 — SonarQube

### Option A: SonarCloud (hosted, free for public repos)

1. Sign up at https://sonarcloud.io with your GitHub account.
2. Import the `mr-kn-portfolio` repo.
3. Get the token from **My Account → Security**.
4. In GitHub repo **Settings → Secrets and variables → Actions**, add:
   - `SONAR_TOKEN` = your token
   - `SONAR_HOST_URL` = `https://sonarcloud.io`
5. Update `sonar-project.properties` to add your organisation key:
   ```
   sonar.organization=<your-sonarcloud-org>
   ```
6. Push — the `sonarqube` job in `.github/workflows/ci.yml` will analyse.

### Option B: Self-hosted SonarQube

If you have SonarQube running (typical enterprise setup):

1. Create the project in SonarQube with key `mr-kn-portfolio`.
2. Generate a token under your profile.
3. Add `SONAR_TOKEN` and `SONAR_HOST_URL` (your server URL) as GitHub secrets.

### Local analysis

```bash
npm run test:ci
# Install SonarScanner CLI from https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/
sonar-scanner \
  -Dsonar.host.url=https://your-sonar.example.com \
  -Dsonar.token=$SONAR_TOKEN
```

---

## Part 5 — Updating Content

| What to change | File |
|---|---|
| Career timeline | `src/app/core/data/eras.data.ts` |
| Capabilities | `src/app/core/data/capabilities.data.ts` |
| Stats, contact links | `src/app/core/data/site-config.data.ts` |
| Logo text "MR / KN" | `src/app/shared/components/header/header.component.html` |
| Character illustration | replace `public/character.png` and `public/character.webp` |
| Resume PDF | put PDF in `public/`, update href in header + contact |
| Site title / description | `src/index.html` |

After edits:
```bash
git add .
git commit -m "Update content"
git push
```

GitHub Actions deploys automatically. Docker image needs rebuilding (`docker compose up --build`).

---

## Part 6 — Wiring Up the Contact Form

The form currently shows a snackbar message. For a real endpoint on a static site, use **Formspree**:

1. Sign up at https://formspree.io (free: 50 submissions/month).
2. Create a form, copy your endpoint, e.g. `https://formspree.io/f/abc123xyz`.
3. In `src/app/features/contact/contact.component.ts`, replace the body of `onSubmit()`:

```typescript
onSubmit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    this.snackBar.open('Please complete the required fields.', 'OK', {
      duration: SNACKBAR_DURATION_MS,
    });
    return;
  }

  fetch('https://formspree.io/f/abc123xyz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(this.form.getRawValue()),
  })
    .then((response) => {
      if (response.ok) {
        this.snackBar.open("Sent! I'll get back to you soon.", 'OK', {
          duration: SNACKBAR_DURATION_MS,
        });
        this.form.reset();
      } else {
        this.snackBar.open('Could not send. Email me directly.', 'OK', {
          duration: SNACKBAR_DURATION_MS,
        });
      }
    })
    .catch(() => {
      this.snackBar.open('Network error. Try again later.', 'OK', {
        duration: SNACKBAR_DURATION_MS,
      });
    });
}
```

If you do this, also update the CSP in `src/index.html` and `nginx/default.conf` to allow the Formspree origin:
```
connect-src 'self' https://formspree.io;
```

---

## Troubleshooting

**Blank page on GitHub Pages**
- Check `base-href` in `package.json` matches your repo name.

**Refresh on `/story` gives 404**
- The deploy workflow already copies `index.html` to `404.html`. If you removed that step, add it back.

**Docker build fails on `npm ci`**
- Ensure `package-lock.json` is committed.

**SonarQube reports 0% coverage**
- Make sure `npm run test:ci` ran before the scanner. Coverage lives in `coverage/mr-kn-portfolio/lcov.info`.

**Tests fail with "Cannot find module '@core/...'"**
- Make sure `tsconfig.json` has the `paths` block intact, and `tsconfig.spec.json` extends it.

---

## Next Steps

- **Custom domain**: add `CNAME` file to `public/` with your domain, configure DNS at your registrar.
- **HSTS**: uncomment the HSTS header in `nginx/default.conf` once you're serving HTTPS at the edge.
- **Analytics**: add Plausible or GoatCounter to `index.html` (update CSP `script-src` and `connect-src`).
- **Dark mode**: add a toggle that swaps the `:root` CSS variables.
