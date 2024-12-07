import { useRootLoaderData } from './useRootLoaderData';
import { NavigationItem } from '../../libs/types';

export const useActiveSection = (headerNavigationItems: NavigationItem[] | undefined) => {
  if (!headerNavigationItems?.length) return { activeSection: null };

  const activeSection = headerNavigationItems
    .filter((item) => item?.url?.includes('#'))
    .find((item) => {
      const section = item.url.split('#')[1]?.split('?')[0];
      return section && window.location.hash.includes(section);
    })?.url?.split('#')[1]?.split('?')[0];

  return { activeSection };
}; 