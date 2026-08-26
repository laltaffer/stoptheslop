import { getCollection, render } from 'astro:content';

export const CATEGORIES = [
  { slug: 'design', label: 'Design', mark: 'des.' },
  { slug: 'copy', label: 'Copy', mark: 'copy' },
  { slug: 'code', label: 'Code', mark: 'code' },
  { slug: 'images', label: 'Images', mark: 'img.' },
  { slug: 'meta', label: 'Meta', mark: 'meta' },
] as const;

export const VERDICTS = {
  stet: { mark: 'stet.', gloss: 'Let it stand. Use it.' },
  'ok-wc': { mark: 'ok w/c', gloss: 'Useful. Read the caveat.' },
  kill: { mark: 'kill.', gloss: 'Did not survive a close read.' },
} as const;

const verdictOrder = { stet: 0, 'ok-wc': 1, kill: 2 } as const;

export async function loadEntries() {
  const raw = await getCollection('entries');
  const prepared = await Promise.all(
    raw.map(async (e) => {
      const { Content } = await render(e);
      return { ...e.data, id: e.id, Content };
    })
  );
  prepared.sort(
    (a, b) =>
      verdictOrder[a.verdict] - verdictOrder[b.verdict] || a.title.localeCompare(b.title)
  );
  return prepared;
}

export function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
}
