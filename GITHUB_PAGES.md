# GitHub Pages deployment

The `main` branch deploys automatically through `.github/workflows/deploy-pages.yml`. The site is built with the `/Para/` base path, copied into the Pages artifact, and includes a `404.html` SPA fallback so case-study URLs continue to resolve on refresh.

After the first successful workflow run, enable **Settings → Pages → Source: GitHub Actions** if GitHub has not enabled Pages automatically.
