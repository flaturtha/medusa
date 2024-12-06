import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ProductTemplate } from '@app/templates/ProductTemplate';
import { getProductContent } from '../services/sanity.server';
import { useStorefront } from '@app/hooks/useStorefront';
import { sanityClient } from '@app/utils/sanityClient';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.handle) {
    throw new Response("Not Found", { status: 404 });
  }

  // Get Medusa product data using the storefront client
  const { products } = await useStorefront().products.list({
    handle: params.handle,
    expand: 'variants,variants.prices'
  });
  
  const product = products[0];
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  console.log("Medusa product details:", {
    handle: params.handle,
    title: product.title,
    id: product.id,
    rawProduct: JSON.stringify(product, null, 2)
  });

  // Get Sanity content using the same handle
  const fullText = await getProductContent(params.handle);
  
  console.log("Product route loader:", {
    handle: params.handle,
    medusaProduct: {
      title: product.title,
      handle: product.handle,
      id: product.id
    },
    sanityContent: {
      exists: !!fullText,
      length: fullText?.length,
      sample: fullText?.[0]?.text
    }
  });

  // Fetch Sanity metadata
  const productMetadata = await sanityClient.fetch(`
    *[_type == "product" && medusaId == $medusaId][0]{
      "editions": editions[]{
        "edition": edition,
        description,
        "features": features[]
      }
    }
  `, { medusaId: product.id });

  return json({
    product,
    fullText: fullText || [],
    productMetadata
  });
};

export default function ProductRoute() {
  const { product, fullText, productMetadata } = useLoaderData<typeof loader>();
  return <ProductTemplate product={product} fullText={fullText} productMetadata={productMetadata} />;
} 