import { sdk, sdkCache } from '@libs/util/server/client.server';
import { HttpTypes } from '@medusajs/types';
import { getSelectedRegion } from './data/regions.server';
import cachified from '@epic-web/cachified';
import { MILLIS } from './cache-builder.server';

export const fetchProducts = async (
  request: Request,
  { currency_code, ...query }: HttpTypes.StoreProductParams = {},
) => {
  const region = await getSelectedRegion(request.headers);

  return await cachified({
    key: `products-${JSON.stringify(query)}`,
    cache: sdkCache,
    staleWhileRevalidate: MILLIS.ONE_HOUR,
    ttl: MILLIS.TEN_SECONDS,
    async getFreshValue() {
      return await sdk.store.product.list({
        ...query,
        region_id: region.id,
      });
    },
  });
};
