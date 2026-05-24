import type { Page } from '../router';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

const BASE = 'https://thelinkadvertizing.com';
const OG_IMAGE = `${BASE}/the-link-og.jpg`; // place a 1200x630 share image in /public

export const siteMeta = {
  name: 'The Link Advertising',
  baseUrl: BASE,
  ogImage: OG_IMAGE,
};

export const pageMeta: Record<Page, PageMeta> = {
  home: {
    title: 'The Link Advertising | Global Creative & Technology Agency',
    description:
      'Where bold creative thinking meets autonomous technology. A creative and tech agency spanning 4 sub-continents, rooted in the Middle East & Saudi Arabia.',
    path: '/',
  },
  about: {
    title: 'About | The Link Advertising',
    description:
      'Ten years of creative and technology excellence. Learn about The Link — a global agency marrying brand storytelling with autonomous systems across 4 sub-continents.',
    path: '/about',
  },
  portfolio: {
    title: 'Portfolio | The Link Advertising',
    description:
      'Selected work from The Link: campaigns for Red Bull, Volkswagen, Almarai, AlBaik, Jaguar and more — creative, print, and POS across 4 sub-continents.',
    path: '/portfolio',
  },
  'agentic-ai': {
    title: 'Agentic AI Solutions | The Link Advertising',
    description:
      'Autonomous digital workers that run your operations 24/7. Custom-built agentic AI for sales, support, procurement, finance, logistics and growth.',
    path: '/agentic-ai',
  },
  services: {
    title: 'Services | The Link Advertising',
    description:
      'Creative campaigns, branding, web & UI/UX, AI-powered creative, print, POS, outdoor and digital — with specialist expertise in Middle Eastern and Saudi markets.',
    path: '/services',
  },
  'rent-creative': {
    title: 'Rent a Creative | The Link Advertising',
    description:
      'Access 3,000+ vetted creatives worldwide — designers, editors, animators, developers and marketers — ready to scale with you, in your timezone.',
    path: '/rent-creative',
  },
  contact: {
    title: 'Contact | The Link Advertising',
    description:
      'Start your next project with The Link. Offices serving South Asia, the Middle East, and Saudi Arabia. Let’s build something unforgettable.',
    path: '/contact',
  },
};
