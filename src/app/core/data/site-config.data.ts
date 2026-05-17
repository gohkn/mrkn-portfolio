import { ContactLink, StatItem } from '../models/era.model';

/**
 * Single source of truth for content that appears across multiple components.
 * Edit values here without touching templates.
 */

export const SITE_STATS: readonly StatItem[] = [
  { value: '10', suffix: '+', label: 'Years Shipping Code' },
  { value: '3', label: 'Industries: Banking · Transit · Enterprise' },
  { value: '∞', label: 'Pipelines at 2 AM' },
] as const;

export const CONTACT_LINKS: readonly ContactLink[] = [
  { position: '01', label: 'hello@example.com', href: 'mailto:hello@example.com' },
  {
    position: '02',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gohkhaining',
    external: true,
  },
  { position: '03', label: 'GitHub', href: 'https://github.com/mrkn', external: true },
  { position: '04', label: 'Download CV', href: '#' },
] as const;

export const SITE_META = {
  name: 'Mr KN',
  role: 'Senior Full-Stack Engineer',
  tagline: 'Banking-grade software · Angular · .NET · Cloud',
  location: 'Putra Heights, Selangor, MY',
  yearsExperience: 10,
} as const;
