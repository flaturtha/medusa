import { useRootLoaderData } from './useRootLoaderData';

export const useSiteDetails = () => {
  const data = useRootLoaderData();
  console.log('Site Details:', data.siteDetails);
  return data.siteDetails || {};
};
