import { HERO_VARIANTS } from '../../../components/home/HeroVariants';

// Every hero design in the lab: the sync heroes (blinds is the live one), then the still ones.
export const LAB_HEROES = [
  { id: 'sync', name: 'Sync', note: 'Interactive order-sync demo over a dot grid that ripples when an order lands.' },
  { id: 'sync-blinds', name: 'Sync + blinds (live)', note: 'The same demo over white vertical blinds blowing in the wind, golden sun behind.' },
  ...Object.entries(HERO_VARIANTS).map(([id, { name, note }]) => ({ id, name, note })),
];
