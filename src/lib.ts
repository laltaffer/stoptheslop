import { getCollection, render } from 'astro:content';

export const CATEGORIES = [
  { slug: 'design', label: 'Design', color: '#FF1654', text: '#F3FFBD', count: '#F3FFBD' },
  { slug: 'copy', label: 'Copy', color: '#247BA0', text: '#F3FFBD', count: '#F3FFBD' },
  { slug: 'code', label: 'Code', color: '#70C1B3', text: '#0F0E0C', count: '#0F0E0C' },
  { slug: 'images', label: 'Images', color: '#B2DBBF', text: '#247BA0', count: '#0F0E0C' },
  { slug: 'meta', label: 'Meta', color: '#0F0E0C', text: '#F3FFBD', count: '#F3FFBD' },
] as const;

export async function loadEntries() {
  const raw = await getCollection('entries');
  const prepared = await Promise.all(
    raw.map(async (e) => {
      const { Content } = await render(e);
      return { ...e.data, id: e.id, Content };
    })
  );
  prepared.sort((a, b) => a.title.localeCompare(b.title));
  return prepared;
}

export function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
}
