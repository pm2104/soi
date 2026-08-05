# Supervisors On India — Under Construction

Placeholder "launching soon" site for **soiglobal.in**, built with Next.js
(App Router) as a static export, deployed to **Firebase Hosting** via
GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build & preview the static export (optional sanity check)

```bash
npm run build   # writes the static site to ./out
npm start        # serves ./out locally via `serve`
```

## Deploy

Deployment is automated by `.github/workflows/deploy.yml`: every push to
`main` builds the static export, then authenticates to Google Cloud using
a **service account JSON key** stored as a GitHub secret, and deploys to
Firebase Hosting.

To deploy manually instead (needs `gcloud`/`firebase` auth set up locally):

```bash
npm run build
npx firebase-tools deploy --only hosting --project soiglobalone-1c2c7
```

### One-time setup checklist

- [ ] Create a service account in the `soiglobalone-1c2c7` project
      (IAM & Admin → Service Accounts → Create Service Account) and grant
      it the **Firebase Admin** and **Firebase Hosting Admin** roles.
- [ ] Generate a JSON key for that service account (Keys tab → Add Key →
      Create new key → JSON).
- [ ] Add the entire JSON file contents as a GitHub repo secret named
      `FIREBASE_SERVICE_ACCOUNT` (Settings → Secrets and variables →
      Actions → New repository secret). **Never commit this file or paste
      it anywhere other than the GitHub secret field** — delete the
      downloaded copy once it's saved as a secret.
- [ ] Confirm the Firebase **project ID** in `.firebaserc` and in
      `.github/workflows/deploy.yml` matches your actual project
      (currently `soiglobalone-1c2c7`).
- [ ] Confirm Hosting is initialized for the project (Firebase console →
      Hosting → Get started, if you haven't already).
- [ ] Once deploying successfully, add `soiglobal.in` as a **custom
      domain** in Firebase Hosting (Hosting → Add custom domain) and
      update the DNS records at your registrar as instructed there.

## Notes

- `next.config.mjs` uses `output: "export"` — this only works because the
  site is fully static (no server components with dynamic data, no API
  routes). If you later need server-rendering, dynamic routes, or an API,
  you'll need either Firebase's Next.js framework integration (which
  deploys Cloud Functions/Cloud Run under the hood) or to go back to the
  Cloud Run + Docker setup this project started with.
- We use a service account key rather than Workload Identity Federation
  because `firebase-tools` currently has an open bug
  (firebase/firebase-tools#10726) where it fails to recognize WIF-issued
  credentials for its own project lookups, even though the same
  credentials work fine for other Google Cloud APIs. Worth revisiting WIF
  once that's fixed upstream, since key-based auth is long-lived and
  should be rotated periodically.
