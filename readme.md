
# Linktree MacarroniLove

This is a static CMS application. The public pages are HTML shells, the page content lives in `content/*.md`, and Git is the database: each CMS save creates a commit in the configured repository.

## Content workflow

1. Deploy the repository to GitHub Pages.
2. Create a GitHub OAuth App with the callback URL supplied by your OAuth proxy.
3. Deploy a small OAuth proxy outside GitHub Pages, then set `backend.base_url` and `backend.auth_endpoint` in `admin/config.yml`. Never put the OAuth client secret in this repository.
4. Open the GitHub Pages `/admin/` URL, sign in with GitHub, edit a page, and publish. The CMS commits the Markdown change to Git.

GitHub Pages is static hosting, so it cannot run Netlify Identity or Git Gateway itself. The public site and CMS UI can stay on GitHub Pages, but the OAuth proxy must run on a service that supports server-side code.

The four existing pages are now editable here:

- `content/home.md`
- `content/cardlist.md`
- `content/coupons.md`
- `content/primeday.md`

## Local preview

Because browsers block `fetch()` from local `file://` pages, serve the folder with any static web server before testing. For example, with Python installed:

```text
python -m http.server 8080
```

Then open `http://localhost:8080/`. The CMS itself is available at `http://localhost:8080/admin/` once its Git provider is configured.

