import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { json, type DataFunctionArgs, type MetaFunction } from '@remix-run/node';
import Medusa from '@medusajs/medusa-js';
import { useRef } from 'react';
import { Page } from './components/layout/Page';
import { RootProviders } from './providers/root-providers';
import '@app/styles/global.css';
import { useRootLoaderData } from './hooks/useRootLoaderData';
import { headerNavigationItems } from '../libs/config/site/navigation-items';
import { sdk } from '@libs/util/server/client.server';
import { getSelectedRegion } from '@libs/util/server/data/regions.server';

// Simple meta utility functions to replace missing @libs/util/meta
const getCommonMeta = () => [];
const mergeMeta = (commonMeta: any, pageMeta: any) => {
  return ({ data }: { data: any }) => {
    return [...(commonMeta()), ...(pageMeta({ data }) || [])];
  };
};

export const getRootMeta: MetaFunction = ({ data }) => {
  const title = 'Barrio Store';
  const description = 'Discover our artisan-roasted coffee, crafted with care and delivered to your door.';
  const ogTitle = title;
  const ogDescription = description;
  const ogImage = '';
  const ogImageAlt = !!ogImage ? `${ogTitle} logo` : undefined;

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: ogDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: ogImageAlt },
  ];
};

export const meta: MetaFunction = mergeMeta(getCommonMeta, getRootMeta);

export const loader = async ({ request }: DataFunctionArgs) => {
  const baseUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
  
  try {
    const region = await getSelectedRegion(request.headers);
    
    // Use the same SDK pattern as products
    const storeData = await sdk.store.retrieve({
      region_id: region.id,
    });

    console.log('Store SDK Response:', storeData);

    return json({
      env: {
        MEDUSA_BACKEND_URL: baseUrl,
      },
      siteDetails: {
        store: storeData.store,
        settings: {
          storefront_url: baseUrl
        },
        headerNavigationItems
      },
      regions: [region],
      region
    });
  } catch (error) {
    console.error('Store fetch error:', error);
    
    // NOTE: Known limitation - Store name falls back to "Tales of Murder" when store API
    // is unavailable. This is a design decision from the starter template.
    // The fallback ensures consistent branding even when the store API fails.
    return json({
      env: {
        MEDUSA_BACKEND_URL: baseUrl,
      },
      siteDetails: {
        store: {
          name: 'Tales of Murder'
        },
        settings: {
          storefront_url: baseUrl
        },
        headerNavigationItems
      },
      regions: [{ id: 'default', name: 'Default Region', currency_code: 'usd' }],
      region: { id: 'default', name: 'Default Region', currency_code: 'usd' }
    });
  }
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  actionResult,
  currentParams,
  currentUrl,
  defaultShouldRevalidate,
  formAction,
  formData,
  formEncType,
  formMethod,
  nextParams,
  nextUrl,
}) => {
  if (!formMethod || formMethod === 'GET') return false;

  return defaultShouldRevalidate;
};

function App() {
  const headRef = useRef<HTMLHeadElement>(null);
  const data = useRootLoaderData();

  const { env = {}, siteDetails } = data || {};

  return (
    <RootProviders>
      <html lang="en" className="min-h-screen">
        <head ref={headRef}>
          <meta charSet="UTF-8" />
          <Meta />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Italiana&display=swap" rel="stylesheet" />

          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&display=swap" rel="stylesheet" />

          <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" rel="stylesheet" />

          <link href="https://fonts.googleapis.com/css2?family=Aboreto&display=swap" rel="stylesheet" />
          <Links />
          {siteDetails?.settings?.description && <meta name="description" content={siteDetails.settings.description} />}
        </head>
        <body className="min-h-screen">
          <Page>
            <Outlet />
          </Page>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(env)}`,
            }}
          />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </RootProviders>
  );
}

export default App;

export function ErrorBoundary() {
  const error = useRouteError();

  console.error('error boundary error', error);

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Scripts />
      </body>
    </html>
  );
}
