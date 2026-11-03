import { HERO_VARIANTS } from '../../../components/home/HeroVariants';

// Every hero design in the lab: the sync heroes (the dot grid is the live one), then the still ones.
export const LAB_HEROES = [
  { id: 'sync', name: 'Sync (live)', note: 'Interactive order-sync demo over a dot grid that ripples when an order lands.' },
  { id: 'sync-blinds', name: 'Sync + blinds', note: 'The same demo over white vertical blinds blowing in the wind, golden sun behind.' },
  { id: 'sync-window', name: 'Sync + office window', note: 'The same demo beside an office window: venetian blinds, a skyline in your local daylight, light bars across the wall.' },
  ...Object.entries(HERO_VARIANTS).map(([id, { name, note }]) => ({ id, name, note })),
];
