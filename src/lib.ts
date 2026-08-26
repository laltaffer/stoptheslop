import { getCollection, render } from 'astro:content';

export const CATEGORIES = [
  { slug: 'design', label: 'Design' },
  { slug: 'copy', label: 'Copy' },
  { slug: 'code', label: 'Code' },
  { slug: 'images', label: 'Images' },
  { slug: 'meta', label: 'Meta' },
] as const;

export const VERDICTS = {
  go: { label: 'GO', gloss: 'Good. Use it.' },
  caution: { label: 'CAUTION', gloss: 'Useful, but read the note first.' },
  stop: { label: 'STOP', gloss: 'Save yourself the trip.' },
} as const;

const verdictOrder = { go: 0, caution: 1, stop: 2 } as const;

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
