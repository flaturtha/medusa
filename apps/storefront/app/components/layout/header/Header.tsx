import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon';
import { useCart } from '@app/hooks/useCart';
import { useRootLoaderData } from '@app/hooks/useRootLoaderData';
import { useSiteDetails } from '@app/hooks/useSiteDetails';
import { IconButton } from '@app/components/common/buttons';
import { Container } from '@app/components/common/container/Container';
import { URLAwareNavLink } from '@app/components/common/link';
import clsx from 'clsx';
import { type FC, useState, useEffect } from 'react';
import { HeaderSideNav } from './HeaderSideNav';
import { useActiveSection } from './useActiveSection';
import { LogoStoreName } from '@app/components/LogoStoreName/LogoStoreName';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigation, type OurNavigationItem } from '@app/hooks/useNavigation';

export type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState(0);
  const { cart, toggleCartDrawer } = useCart();
  const { navigationItems } = useNavigation();
  const { activeSection } = useActiveSection(navigationItems);
  const rootLoader = useRootLoaderData();
  const hasProducts = rootLoader?.hasPublishedProducts;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.min(1, Math.max(0.75, 1 - (scrollY / 25)));

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur text-primary-50 shadow-md transition-all duration-150 ease-in-out"
      style={{ 
        backgroundColor: `rgb(28, 28, 30, ${opacity})`
      }}
    >
      <nav aria-label="Top">
        <div className="bg-transparent">
          <Container>
            {hasProducts && (
              <div className="-mb-2 flex w-full items-center justify-end gap-4 pt-2 sm:hidden">
                {!!cart && (
                  <IconButton
                    aria-label="open shopping cart"
                    className="text-primary-50 hover:text-primary-100 transition-colors sm:mr-0.5"
                    icon={(iconProps) => (
                      <div className="relative">
                        <ShoppingBagIcon
                          {...iconProps}
                          className={clsx(iconProps.className, 'hover:text-primary-100')}
                        />
                        {cart.items && cart.items.length > 0 && (
                          <span className="absolute -top-1 left-full -ml-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-bold text-primary-50">
                            <span>
                              {cart.items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                              <span className="sr-only">items in cart, view bag</span>
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                    onClick={() => toggleCartDrawer(true)}
                  />
                )}
              </div>
            )}

            <div className={clsx(
              'h-[var(--mkt-header-height)] flex sm:h-[var(--mkt-header-height-desktop)] flex-nowrap items-center justify-between gap-2 py-2',
            )}>
              <LogoStoreName className="xs:h-14 h-8" primary />
              <div className="flex flex-wrap-reverse items-center gap-x-6 sm:justify-end">
                <div className="hidden h-full gap-6 md:flex">
                  <div className="group relative">
                    <URLAwareNavLink
                      {...{
                        id: 'shop',
                        label: 'SHOP',
                        url: '/products',
                        new_tab: false
                      }}
                      className={({ isActive }) =>
                        clsx('flex items-center whitespace-nowrap text-base font-normal py-2.5', {
                          'text-primary-50 hover:text-primary-100 transition-colors': !isActive,
                          'text-primary-100 border-b-primary-100 border-b-2': isActive,
                        })
                      }
                    >
                      SHOP
                      <span className="ml-1">▾</span>
                    </URLAwareNavLink>
                    
                    <div className="absolute left-0 hidden pt-2 group-hover:block">
                      <div className="bg-primary-700/95 backdrop-blur rounded-b shadow-lg py-2 min-w-[200px]">
                        <URLAwareNavLink
                          {...{
                            id: 'collections',
                            label: 'BROWSE COLLECTIONS',
                            url: '/collections',
                            new_tab: false
                          }}
                          className="block px-4 py-2 text-primary-50 hover:text-primary-100 hover:bg-primary-600/50 transition-colors"
                        >
                          BROWSE COLLECTIONS
                        </URLAwareNavLink>
                        <URLAwareNavLink
                          {...{
                            id: 'featured',
                            label: 'FEATURED TITLES',
                            url: '/featured',
                            new_tab: false
                          }}
                          className="block px-4 py-2 text-primary-50 hover:text-primary-100 hover:bg-primary-600/50 transition-colors"
                        >
                          FEATURED TITLES
                        </URLAwareNavLink>
                      </div>
                    </div>
                  </div>

                  <URLAwareNavLink
                    {...{
                      id: 'mission',
                      label: 'OUR MISSION',
                      url: '/about-us',
                      new_tab: false
                    }}
                    className={({ isActive }) =>
                      clsx('flex items-center whitespace-nowrap text-base font-normal py-2.5', {
                        'text-primary-50 hover:text-primary-100 transition-colors': !isActive,
                        'text-primary-100 border-b-primary-100 border-b-2': isActive,
                      })
                    }
                  >
                    OUR MISSION
                  </URLAwareNavLink>

                  <URLAwareNavLink
                    {...{
                      id: 'murderwiki',
                      label: 'MURDERWIKI',
                      url: '/murderwiki',
                      new_tab: false
                    }}
                    className={({ isActive }) =>
                      clsx('flex items-center whitespace-nowrap text-base font-normal py-2.5', {
                        'text-primary-50 hover:text-primary-100 transition-colors': !isActive,
                        'text-primary-100 border-b-primary-100 border-b-2': isActive,
                      })
                    }
                  >
                    MURDERWIKI
                  </URLAwareNavLink>

                  <URLAwareNavLink
                    {...{
                      id: 'free-novel',
                      label: 'GET A FREE NOVEL',
                      url: '/free-novel',
                      new_tab: false
                    }}
                    className={({ isActive }) =>
                      clsx('flex items-center whitespace-nowrap text-base font-normal py-2.5', {
                        'text-primary-50 hover:text-primary-100 transition-colors px-6 rounded bg-primary-600 hover:bg-primary-600/90 shadow-md': !isActive,
                        'text-primary-100 border-b-primary-100 border-b-2': isActive,
                      })
                    }
                  >
                    GET A FREE NOVEL
                  </URLAwareNavLink>
                </div>

                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-x-3 text-sm">
                    {!!cart && hasProducts && (
                      <IconButton
                        aria-label="open shopping cart"
                        className="text-primary-50 hover:text-primary-100 transition-colors hidden sm:mr-0.5 sm:inline-flex"
                        icon={(iconProps) => (
                          <div className="relative">
                            <ShoppingBagIcon
                              {...iconProps}
                              className={clsx(iconProps.className, 'hover:text-primary-100')}
                            />
                            {cart.items && cart.items.length > 0 && (
                              <span className="absolute -top-1 left-full -ml-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-bold text-primary-50">
                                <span>
                                  {cart.items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                                  <span className="sr-only">items in cart, view bag</span>
                                </span>
                              </span>
                            )}
                          </div>
                        )}
                        onClick={() => toggleCartDrawer(true)}
                      />
                    )}
                    <IconButton
                      aria-label="open navigation menu"
                      onClick={() => setSideNavOpen(true)}
                      className="text-primary-50 hover:text-primary-100 transition-colors sm:inline-flex md:hidden"
                      icon={Bars3Icon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </nav>
      <HeaderSideNav activeSection={activeSection} open={sideNavOpen} setOpen={setSideNavOpen} />
    </header>
  );
};
