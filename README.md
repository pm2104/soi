# Supervisors On India — Under Construction

Placeholder "launching soon" site for **soiglobal.in**, built with Next.js
(App Router) and ready to deploy to **Google Cloud Run**.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build & run the container locally (optional sanity check)

```bash
docker build -t soi-under-construction .
docker run -p 8080:8080 soi-under-construction
```

Open http://localhost:8080

## Deploy to Cloud Run

From the project root, with the [gcloud CLI](https://cloud.google.com/sdk)
installed and authenticated:

```bash
gcloud run deploy soi-under-construction \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```

`--source .` builds the Dockerfile in this repo using Cloud Build, pushes
the image, and deploys it — no separate `docker push` step needed. Pick
whichever `--region` is closest to your users (`asia-south1` = Mumbai).

Once it's live, Cloud Run gives you a `*.run.app` URL. To serve it from
**soiglobal.in**:

1. In Cloud Run, go to the service → **Manage custom domains** → **Add
   mapping**, and map `soiglobal.in` (and `www.soiglobal.in` if wanted) to
   this service.
2. Add the DNS records Cloud Run gives you (usually an `A`/`AAAA` or
   `CNAME` pair) at your domain registrar for `soiglobal.in`.
3. Wait for DNS propagation and certificate provisioning (can take up to a
   few hours).

## Notes

- The app listens on the port Cloud Run provides via the `PORT` env var
  (defaults to `8080`) — no changes needed.
- `next.config.mjs` uses `output: "standalone"` so the Docker image only
  ships the minimal server + required files, keeping the image small and
  the cold start fast.
- To replace this page later with the full site, just build out more
  routes under `app/` — the Docker/Cloud Run setup won't need to change.
