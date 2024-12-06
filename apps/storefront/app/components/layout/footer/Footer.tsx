import { convertToFormData } from '@libs/util/forms/objectToFormData';
import { useFetcher } from '@remix-run/react';
import { Container } from '@app/components/common/container/Container';
import { Select } from '@app/components/common/forms/inputs/Select';
import { URLAwareNavLink } from '@app/components/common/link/URLAwareNavLink';
import { useRegion } from '@app/hooks/useRegion';
import { useRegions } from '@app/hooks/useRegions';
import { useRootLoaderData } from '@app/hooks/useRootLoaderData';
import { useSiteDetails } from '@app/hooks/useSiteDetails';
import clsx from 'clsx';
import { useMemo } from 'react';
import { LogoStoreName } from '@app/components/LogoStoreName/LogoStoreName';
import { NewsletterSubscription } from '@app/components/newsletter/Newsletter';
import { RegionActions } from '@app/routes/api.region';
import { StripeSecurityImage } from '../../images/StripeSecurityImage';
import { SocialIcons } from './SocialIcons';

export const Footer = () => {
  const { footerNavigationItems, settings } = useSiteDetails();
  const rootData = useRootLoaderData();
  const hasProducts = rootData?.hasPublishedProducts;
  const fetcher = useFetcher();
  const { regions } = useRegions();
  const { region } = useRegion();

  const regionOptions = useMemo(() => {
    return regions.map((region) => ({
      label: `${region.name} (${region.currency_code})`,
      value: region.id,
    }));
  }, [regions]);

  const onRegionChange = (regionId: string) => {
    fetcher.submit(
      convertToFormData({
        regionId,
        subaction: RegionActions.CHANGE_REGION,
      }),
      { method: 'post', action: '/api/region' },
    );
  };

  return (
    <footer className="bg-primary-700 py-12 text-primary-50">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h4 className="font-display text-xl">Tales of Murder</h4>
              <p className="text-sm text-primary-100">
                Discover the dark allure of vintage murder mystery fiction. Our carefully curated collection 
                brings you the finest in psychological thrillers, detective stories, and true crime 
                inspired narratives.
              </p>
            </div>
            <LogoStoreName />
          </div>

          <nav className="flex flex-col gap-8">
            <div>
              <h5 className="font-display text-xl mb-4">Shop</h5>
              <div className="flex flex-col gap-4">
                <URLAwareNavLink
                  {...{
                    id: 'shop-all',
                    label: 'Shop All',
                    url: '/products',
                    new_tab: false
                  }}
                  className="text-primary-50 hover:text-primary-100 transition-colors block text-base font-medium"
                  prefetch="viewport"
                >
                  Shop All
                </URLAwareNavLink>

                <div className="flex flex-col gap-2 pl-2">
                  {footerNavigationItems?.filter(item => item.id !== 1).map(({ id, new_tab, ...navItemProps }) => (
                    <URLAwareNavLink
                      key={id}
                      {...navItemProps}
                      newTab={new_tab}
                      className="text-primary-50 hover:text-primary-100 transition-colors block text-sm"
                      prefetch="viewport"
                    >
                      {navItemProps.label}
                    </URLAwareNavLink>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex flex-col gap-5">
            <NewsletterSubscription className="mb-4" />
            <SocialIcons siteSettings={settings} />
          </div>
        </div>

        <div className="mt-6 mb-8 border-y border-primary-600/50">
          <div className="text-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-0">
              <URLAwareNavLink {...{ id: 'home', label: 'Home', url: '/', new_tab: false }}
                className="text-primary-50 hover:text-primary-100 transition-colors text-sm md:after:content-['|'] md:after:mx-2 md:after:text-primary-400">
                Home
              </URLAwareNavLink>
              <URLAwareNavLink {...{ id: 'about', label: 'About', url: '/about-us', new_tab: false }}
                className="text-primary-50 hover:text-primary-100 transition-colors text-sm md:after:content-['|'] md:after:mx-2 md:after:text-primary-400">
                About
              </URLAwareNavLink>
              <URLAwareNavLink {...{ id: 'contact', label: 'Contact', url: '/contact', new_tab: false }}
                className="text-primary-50 hover:text-primary-100 transition-colors text-sm md:after:content-['|'] md:after:mx-2 md:after:text-primary-400">
                Contact
              </URLAwareNavLink>
              <URLAwareNavLink {...{ id: 'faq', label: 'FAQ', url: '/faq', new_tab: false }}
                className="text-primary-50 hover:text-primary-100 transition-colors text-sm md:after:content-['|'] md:after:mx-2 md:after:text-primary-400">
                FAQ
              </URLAwareNavLink>
              <URLAwareNavLink {...{ id: 'terms', label: 'Terms', url: '/terms', new_tab: false }}
                className="text-primary-50 hover:text-primary-100 transition-colors text-sm md:after:content-['|'] md:after:mx-2 md:after:text-primary-400">
                Terms
              </URLAwareNavLink>
              <URLAwareNavLink {...{ id: 'privacy', label: 'Privacy Policy', url: '/privacy', new_tab: false }}
                className="text-primary-50 hover:text-primary-100 transition-colors text-sm whitespace-nowrap">
                Privacy Policy
              </URLAwareNavLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col max-md:items-center gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 ">
              <Select
                className="!text-base border-1 border-primary-50 text-primary-50 bg-transparent !shadow-none"
                options={regionOptions}
                defaultValue={region?.id}
                onChange={(e) => {
                  onRegionChange(e.target.value);
                }}
              />
            </div>

            <span className="text-sm text-primary-100">
              © {new Date().getFullYear()} Tales of Murder. All rights reserved.
            </span>
          </div>
          <div className="mt-1 flex flex-col justify-end text-xs sm:mt-0">
            {hasProducts && (
              <StripeSecurityImage 
                className="mt-2 opacity-100 [&_path]:fill-white [&_text]:fill-white" 
              />
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};
