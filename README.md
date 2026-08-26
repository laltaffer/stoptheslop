# Stop the Slop

**Live at [stoptheslop.pages.dev](https://stoptheslop.pages.dev)** (stoptheslop.com pending DNS).

A curated, marked-up library of the tools, guides, and standards people actually use to
keep AI slop out of design, writing, code, and images. Every entry is read, judged, and
dated by a person, then stamped with a plain verdict:

- **Use it.** Genuinely good.
- **Yes, but.** Useful, with a caveat named in the note.
- **Kill.** Did not survive a close read.

## Contributing

Corrections, dead links, and nominations: [open an issue](https://github.com/laltaffer/stoptheslop/issues).
Every entry is a markdown file in `src/entries/` with a one-paragraph editorial note —
opinions, not summaries.

## Stack

Astro (static) on Cloudflare Pages. No JavaScript ships to the client.

```sh
npm install
npm run dev          # local dev
npm run build        # build to dist/
npm run check-links  # verify every entry URL still answers (run before deploy)
npx wrangler pages deploy dist --project-name=stoptheslop --branch=main
```
