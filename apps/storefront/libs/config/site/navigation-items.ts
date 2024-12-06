import { NavigationCollection } from '@libs/types';

export const headerNavigationItems: NavigationCollection = [
  {
    id: 1,
    label: 'View our Blends',
    url: '/categories/blends',
    sort_order: 0,
    location: 'main',
    new_tab: false,
  },
  {
    id: 3,
    label: 'Our Story',
    url: '/about-us',
    sort_order: 1,
    location: 'main',
    new_tab: false,
  },
  {
    id: 2,
    label: 'Shop All',
    url: '/products',
    sort_order: 1,
    location: 'main',
    new_tab: false,
  },
];

export const footerNavigationItems: NavigationCollection = [
  {
    id: 1,
    label: 'Shop All',
    url: '/products',
    location: 'footer',
    sort_order: 1,
    new_tab: false,
  },
  {
    id: 2,
    label: 'Pioneers',
    url: '/collections/pioneers',
    location: 'footer',
    sort_order: 2,
    new_tab: false,
  },
  {
    id: 3,
    label: 'Vintage True Crime',
    url: '/collections/vintage-true-crime',
    location: 'footer',
    sort_order: 3,
    new_tab: false,
  },
  {
    id: 4,
    label: 'Old Cap Collier Library',
    url: '/collections/old-cap-collier',
    location: 'footer',
    sort_order: 4,
    new_tab: false,
  },
  {
    id: 5,
    label: 'The Sax Rohmer Collection',
    url: '/collections/sax-rohmer',
    location: 'footer',
    sort_order: 5,
    new_tab: false,
  },
  {
    id: 6,
    label: "Brady's Secret Service",
    url: '/collections/bradys-secret-service',
    location: 'footer',
    sort_order: 6,
    new_tab: false,
  },
];
