import { useSiteDetails } from '@app/hooks/useSiteDetails';
import { LogoStoreName } from '@app/components/LogoStoreName/LogoStoreName';
import { URLAwareNavLink } from '@app/components/common/link';

export const Header = () => {
  const { store, headerNavigationItems } = useSiteDetails();

  return (
    <header className="sticky top-0 z-40 bg-[#3F432C] opacity-75 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Left side - Store Name */}
        <div className="flex-shrink-0">
          <LogoStoreName primary className="text-white" />
        </div>

        {/* Right side - Navigation */}
        <nav className="flex items-center space-x-6">
          {headerNavigationItems?.map(({ id, new_tab, ...navItemProps }) => (
            <URLAwareNavLink
              key={id}
              {...navItemProps}
              newTab={new_tab}
              className={({ isActive }) =>
                `text-base font-normal ${
                  isActive ? 'text-primary-700' : 'text-white hover:text-primary-200'
                }`
              }
              prefetch="viewport"
            >
              {navItemProps.label}
            </URLAwareNavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
