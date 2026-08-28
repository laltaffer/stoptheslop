// Re-verification ritual: every entry URL must answer. Run before any deploy.
// Usage: npm run check-links
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = new URL('../src/entries', import.meta.url).pathname;
const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
const UA = 'Mozilla/5.0 (Macintosh) StopTheSlop-link-check/1.0 (+https://stoptheslop.design)';
let failures = 0;

for (const f of files) {
  const src = await readFile(join(dir, f), 'utf8');
  const url = src.match(/^url:\s*(\S+)/m)?.[1];
  if (!url) { console.log(`?? ${f}: no url`); failures++; continue; }
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(15000) });
    // Some hosts bot-block with 403 but serve browsers fine; flag, don't fail.
    const ok = res.ok || res.status === 403;
    console.log(`${res.ok ? 'ok ' : res.status === 403 ? '403' : 'FAIL'} ${res.status} ${f}`);
    if (!ok) failures++;
  } catch (e) {
    console.log(`FAIL err ${f} (${e.message})`);
    failures++;
  }
}
console.log(failures ? `\n${failures} failure(s) — fix or remove before deploy.` : '\nAll links answer.');
process.exit(failures ? 1 : 0);
