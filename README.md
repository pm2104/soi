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
`main` builds the static export and deploys it to Firebase Hosting using
Workload Identity Federation (no service-account JSON key stored in the
repo).

To deploy manually instead:

```bash
npm run build
npx firebase-tools deploy --only hosting --project project-6b0af032-2d30-40c5-be5
```

### One-time setup checklist

- [ ] Confirm the Firebase **project ID** in `.firebaserc` and in
      `.github/workflows/deploy.yml` matches your actual project (it's
      currently set to `project-6b0af032-2d30-40c5-be5`, inferred from the
      service account email — double-check this in the Firebase console).
- [ ] Grant the deploy service account
      (`soi-471@project-6b0af032-2d30-40c5-be5.iam.gserviceaccount.com`)
      the **Firebase Hosting Admin** role (`roles/firebasehosting.admin`)
      on the project, so the workflow is allowed to publish.
- [ ] Confirm the Workload Identity Pool/provider
      (`github-pool` / `github-provider`) has an attribute condition
      restricting it to this GitHub repo (e.g. `assertion.repository ==
      'your-org/your-repo'`), so only this repo can mint tokens for that
      service account.
- [ ] Once mapped, add `soiglobal.in` as a **custom domain** in Firebase
      Hosting (Hosting → Add custom domain) and update the DNS records at
      your registrar as instructed there.

## Notes

- `next.config.mjs` uses `output: "export"` — this only works because the
  site is fully static (no server components with dynamic data, no API
  routes). If you later need server-rendering, dynamic routes, or an API,
  you'll need either Firebase's Next.js framework integration (which
  deploys Cloud Functions/Cloud Run under the hood) or to go back to the
  Cloud Run + Docker setup this project started with.
- The workflow uses `google-github-actions/auth@v2` with Workload Identity
  Federation, then `firebase-tools`, which picks up the resulting
  Application Default Credentials automatically — no `FIREBASE_TOKEN` or
  key file needed. 
