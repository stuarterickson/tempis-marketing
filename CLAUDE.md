# Backbeat Golf website — rules for every agent

This is the Backbeat Golf marketing site (backbeatgolf.com), owned by the Chief Marketing Officer project. Several agent sessions work on it, each in its own copy. Vercel limits deploys per day, so the site is built and deployed **once per batch of work, not once per agent**.

## How changes move

- **`main` deploys. Nothing else does.** `vercel.json` turns off deploys for every other branch.
- **`site-queue` is the shared holding branch.** All website work goes there first. It never deploys, so pushing to it is free and is how agents see each other's work.
- **Start from the queue.** Before changing anything: `git fetch origin` and work on top of `origin/site-queue` (it already contains `main`). Never start from a stale copy.
- **Finish into the queue.** When your change is built and checked (below), commit only your own files and push to `site-queue`. If the push is refused because someone else pushed first, `git pull --rebase origin site-queue`, rebuild, and push again. Never force-push.
- **Never push to `main` yourself, and never merge to it on your own.** When a batch is ready, ask Stuart in one line: "Okay to push the website?" Only after he says yes (his own words, e.g. "push"), merge `site-queue` into `main` (fast-forward) and push `main` once. That one push is the one deploy.
- Don't create other branches for site work. Leave branches you didn't make alone.

## Before you push to site-queue

- `npm run build` and `npm run lint` pass.
- Look at what you changed in a real browser at 375, 768 and 1280 wide (Playwright / Chromium screenshots), and fix anything off.
- Commit messages say what changed for the reader of the site, and end with the session's attribution lines.

## Brand

Follow the Backbeat Golf brand book in the Chief Marketing Officer project (`Brand/Backbeat Golf Brand Book.md`). The logo files in `public/brand/` are outlined artwork: use them as they are, never retype or redraw them.
