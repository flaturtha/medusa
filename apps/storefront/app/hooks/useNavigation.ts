import type { NavigationItem, NavigationItemLocation } from '../../libs/types';

// Our type with string IDs
export interface OurNavigationItem {
  id: string;
  label: string;
  url: string;
  new_tab: boolean;
  location: NavigationItemLocation;
  sort_order: number;
  submenu?: OurNavigationItem[];
  highlight?: boolean;
}

const staticNavItems: OurNavigationItem[] = [
  {
    id: 'shop',
    label: 'SHOP',
    url: '/products',
    new_tab: false,
    location: 'main',
    sort_order: 0,
    submenu: [
      {
        id: 'collections',
        label: 'BROWSE COLLECTIONS',
        url: '/collections',
        new_tab: false,
        location: 'submenu',
        sort_order: 0,
      },
      {
        id: 'featured',
        label: 'FEATURED TITLES',
        url: '/featured',
        new_tab: false,
        location: 'submenu',
        sort_order: 1,
      },
    ],
  },
  {
    id: 'mission',
    label: 'OUR MISSION',
    url: '/our-mission',
    new_tab: false,
    location: 'main',
    sort_order: 1,
  },
  {
    id: 'murderwiki',
    label: 'MURDERWIKI',
    url: '/murderwiki',
    new_tab: false,
    location: 'main',
    sort_order: 2,
  },
  {
    id: 'free-novel',
    label: 'GET A FREE NOVEL',
    url: '/free-novel',
    new_tab: false,
    location: 'main',
    sort_order: 3,
    highlight: true,
  },
];

// Convert our navigation items to Medusa's format
function convertToMedusaFormat(items: OurNavigationItem[]): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    id: parseInt(item.id, 10),
    submenu: item.submenu ? convertToMedusaFormat(item.submenu) : undefined,
  }));
}

export function useNavigation() {
  return {
    navigationItems: convertToMedusaFormat(staticNavItems),
  };
} 