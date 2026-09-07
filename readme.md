
# Linktree MacarroniLove

This is a static CMS application. The public pages are HTML shells, the page content lives in `content/*.md`, and Git is the database: each CMS save creates a commit in the configured repository.

## Content workflow

1. Deploy the repository to Netlify. The Git Gateway backend requires the CMS to run from the Netlify site, not GitHub Pages.
2. In Netlify, enable **Identity** and then enable **Git Gateway** under Identity settings.
3. Under Identity registration, choose **Invite only** and invite the GitHub email address that should edit the site.
4. Open the Netlify site's `/admin/` URL, complete the invitation, sign in, edit a page, and publish. The CMS commits the Markdown change to Git.

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

