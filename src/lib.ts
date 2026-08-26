import { getCollection, render } from 'astro:content';

export const CATEGORIES = [
  { slug: 'design', label: 'Design', color: '#8A53FF', text: '#FFFFFF' },
  { slug: 'copy', label: 'Copy', color: '#FFD80C', text: '#0F0E0C' },
  { slug: 'code', label: 'Code', color: '#3CCB09', text: '#0F0E0C' },
  { slug: 'images', label: 'Images', color: '#F8C1BA', text: '#0F0E0C' },
  { slug: 'meta', label: 'Meta', color: '#0500A3', text: '#FFFFFF' },
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
