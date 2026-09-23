import { OG_SIZE, ogCard } from '../lib/ogImage';

export const alt = 'Casa Dev: Oracle NetSuite integration and custom front-end engineering';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({ eyebrow: 'Nitya Hoyos · Casa Dev', title: 'NetSuite, connected to the front ends your customers actually use.' });
}
