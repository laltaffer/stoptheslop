# Stop the Slop

**Live at [stoptheslop.design](https://stoptheslop.design)** (and stoptheslop.pages.dev).

A working library of the tools,
guides, and standards that keep AI slop out of design, writing, code, and images.
Every entry is read, used, or run by a person, gets a short plain-language note
(never a rehash of the thing's own marketing), and carries a checked date. No scores,
no rankings: we collect, you decide.

## Contributing

Something missing, dead, or wrong? [Open an issue](https://github.com/laltaffer/stoptheslop/issues).
Every entry is a markdown file in `src/entries/`.

## Stack

Astro (static) on Cloudflare Pages. ~2KB of hand-written JavaScript (the blob toy and scroll reveals), no framework. The blob is AI-generated;
every word is a person's.

```sh
npm install
npm run dev          # local dev
npm run build        # build to dist/
npm run check-links  # verify every entry URL still answers (run before deploy)
npx wrangler pages deploy dist --project-name=stoptheslop --branch=main
```
