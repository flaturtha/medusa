import { useSiteDetails } from '@app/hooks/useSiteDetails';
import { URLAwareNavLink } from '@app/components/common/link';
import { NavigationItem } from '@app/libs/types';

export const Navigation = () => {
  const { headerNavigationItems } = useSiteDetails();

  if (!headerNavigationItems) return null;

  return (
    <nav className="flex items-center space-x-6">
      {headerNavigationItems.map(({ id, new_tab, ...navItemProps }: NavigationItem) => (
        <URLAwareNavLink
          key={id}
          {...navItemProps}
          newTab={new_tab}
          className={({ isActive }) =>
            `text-base font-normal ${
              isActive ? 'text-primary-700' : 'text-gray-700 hover:text-primary-600'
            }`
          }
          prefetch="viewport"
        >
          {navItemProps.label}
        </URLAwareNavLink>
      ))}
    </nav>
  );
}; 