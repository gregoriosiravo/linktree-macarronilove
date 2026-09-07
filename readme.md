
# Linktree MacarroniLove

This is a Nuxt application with TinaCMS. The page content lives in `content/pages/*.md`, and Git is the database: each Tina save creates a commit in the configured repository.

## Run in 10 minutes

Requirements: Docker Desktop on development machines, or Docker Engine plus Compose on the Raspberry Pi.

For a live-preview development environment:

```text
docker compose -f docker-compose.dev.yml up
```

Open `http://localhost:3000/` for Nuxt and `http://localhost:3000/admin/` for TinaCMS. Markdown changes are watched by Nuxt Content and reflected in the preview.

For the production container:

```text
docker compose up -d --build
```

The app is available on port `3000`. The same image works on Raspberry Pi ARM64 because it uses the official multi-architecture Node Alpine image.

## Content workflow

1. Set `TINA_CLIENT_ID`, `TINA_TOKEN`, and `GITHUB_BRANCH` in the environment used for production Tina builds.
2. Run the production Compose command above.
3. Protect `/admin/` with your private network, reverse proxy authentication, or VPN before exposing it publicly.

Tina Cloud is not required for local editing. For remote GitHub-backed editing, Tina needs a free Tina client/token setup or another server-side Git authentication layer. Do not commit credentials.

The four existing pages are now editable here:

- `content/pages/home.md`
- `content/pages/cardlist.md`
- `content/pages/coupons.md`
- `content/pages/primeday.md`


