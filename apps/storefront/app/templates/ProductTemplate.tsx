import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import { useCart } from '@app/hooks/useCart';
import { useRegion } from '@app/hooks/useRegion';
import { ProductImageGallery } from '@app/components/product/ProductImageGallery';
import { ProductPrice } from '@app/components/product/ProductPrice';
import { ProductPriceRange } from '@app/components/product/ProductPriceRange';
import { Breadcrumb, Breadcrumbs } from '@app/components/common/breadcrumbs/Breadcrumbs';
import { Button } from '@app/components/common/buttons/Button';
import { SubmitButton } from '@app/components/common/buttons/SubmitButton';
import { Container } from '@app/components/common/container/Container';
import { Form } from '@app/components/common/forms/Form';
import { FormError } from '@app/components/common/forms/FormError';
import { FieldGroup } from '@app/components/common/forms/fields/FieldGroup';
import { Grid } from '@app/components/common/grid/Grid';
import { GridColumn } from '@app/components/common/grid/GridColumn';
import { Share } from '@app/components/share';
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { withYup } from '@remix-validated-form/with-yup';
import truncate from 'lodash/truncate';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import * as Yup from 'yup';
import { ProductOptionSelectorSelect } from '@app/components/product/ProductOptionSelectorSelect';
import { LineItemActions } from '@app/routes/api.cart.line-items';
import {
  getFilteredOptionValues,
  getOptionValuesWithDiscountLabels,
  selectVariantFromMatrixBySelectedOptions,
  selectVariantMatrix,
} from '@libs/util/products';
import { useProductInventory } from '@app/hooks/useProductInventory';
import { FieldLabel } from '@app/components/common/forms/fields/FieldLabel';
import { ProductOptionSelectorRadio } from '@app/components/product/ProductOptionSelectorRadio';
import { QuantitySelector } from '@app/components/common/field-groups/QuantitySelector';
import { StoreProduct, StoreProductOptionValue, StoreProductVariant } from '@medusajs/types';
import { Validator } from 'remix-validated-form';
import ProductList from '@app/components/sections/ProductList';
import { BookOpenIcon, SpeakerWaveIcon, DeviceTabletIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import type { SanityProductMetadata } from '@app/types';

export interface AddToCartFormValues {
  productId: string;
  quantity?: number;
  options: {
    [key: string]: string;
  };
  edition: string;
}

export const getAddToCartValidator = (product: StoreProduct): Validator<AddToCartFormValues> => {
  const optionsValidation = product.options!.reduce(
    (acc, option) => {
      if (!option.id) return acc;

      acc[option.id] = Yup.string().required(`${option.title} is required`);

      return acc;
    },
    {} as { [key: string]: Yup.Schema<string> },
  );

  const schemaShape: Record<keyof AddToCartFormValues, Yup.AnySchema> = {
    productId: Yup.string().required('Product ID is required'),
    quantity: Yup.number().optional(),
    options: Yup.object().shape(optionsValidation),
    edition: Yup.string().required('Please select an edition'),
  };

  return withYup(Yup.object().shape(schemaShape)) as Validator<AddToCartFormValues>;
};

const getBreadcrumbs = (product: StoreProduct) => {
  const breadcrumbs: Breadcrumb[] = [
    {
      label: (
        <span className="flex whitespace-nowrap">
          <HomeIcon className="inline h-4 w-4" />
          <span className="sr-only">Home</span>
        </span>
      ),
      url: `/`,
    },
    {
      label: 'All Products',
      url: '/products',
    },
  ];

  if (product.collection) {
    breadcrumbs.push({
      label: product.collection.title,
      url: `/collections/${product.collection.handle}`,
    });
  }

  return breadcrumbs;
};

interface ProcessedBlock {
  type: string;
  style: string;
  text: string;
}

interface ProductTemplateProps {
  product: any;
  fullText?: ProcessedBlock[];
}

const variantIsSoldOut: (variant: StoreProductVariant | undefined) => boolean = (variant) => {
  return !!(variant?.manage_inventory && variant?.inventory_quantity! < 1);
};

interface EditionDetails {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  price: string;
  features: string[];
  variant_id?: string;
}

const getEditionIcon = (editionType: string) => {
  switch (editionType.toLowerCase()) {
    case 'ebook':
    case 'epub':
    case 'kindle':
      return DeviceTabletIcon;
    case 'audiobook':
      return SpeakerWaveIcon;
    default:
      return BookOpenIcon;
  }
};

const EditionTabs = ({ 
  editions,
  selectedEdition,
  onChange,
  currencyCode
}: { 
  editions: EditionDetails[];
  selectedEdition: string;
  onChange: (editionId: string) => void;
  currencyCode: string;
}) => {
  return (
    <div className="w-full">
      <Tab.Group
        onChange={(index) => onChange(editions[index].id)}
        selectedIndex={editions.findIndex(e => e.id === selectedEdition)}
      >
        <Tab.List className="grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-xl bg-accent-50 p-2">
          {editions.map((edition) => {
            const Icon = edition.icon;
            return (
              <Tab
                key={edition.id}
                className={({ selected }) =>
                  clsx(
                    'flex flex-col items-center justify-center p-3 rounded-lg text-sm font-medium',
                    'transition-all duration-200 ease-in-out',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-accent-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow-md text-accent-900 scale-[1.02]'
                      : 'text-accent-700 hover:bg-white/[0.12] hover:text-accent-900'
                  )
                }
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-center">{edition.title}</span>
                <span className="text-xs mt-1 font-normal">
                  {currencyCode.toUpperCase()} {edition.price}
                </span>
              </Tab>
            );
          })}
        </Tab.List>

        <Tab.Panels className="mt-6">
          {editions.map((edition) => (
            <Tab.Panel
              key={edition.id}
              className={clsx(
                'rounded-xl bg-white p-4 shadow-sm border border-accent-100',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-accent-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {edition.title} Edition
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {edition.description}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-accent-900 ml-4">
                    {currencyCode.toUpperCase()} {edition.price}
                  </span>
                </div>
                <ul className="space-y-2 mt-4">
                  {edition.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const ProductDescription = ({ description }: { description: string | null }) => {
  if (!description) return null;
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-4">Description</h3>
      <div className="whitespace-pre-wrap text-base text-primary-800">
        {description}
      </div>
    </div>
  );
};

export function ProductTemplate({ product, fullText }: ProductTemplateProps) {
  console.log('Debug - Full product data:', {
    id: product.id,
    title: product.title,
    variants: product.variants?.map(v => ({
      id: v.id,
      title: v.title,
      prices: v.prices,
      price: v.price,
      originalPrice: v.original_price,
      calculatedPrice: v.calculated_price,
      moneyAmount: v.prices?.[0]?.amount,
      rawVariant: v
    }))
  });

  const productTitle = product?.title;
  const hasFullText = Array.isArray(fullText) && fullText.length > 0;
  
  console.log("ProductTemplate received:", {
    productTitle,
    hasFullText,
    fullTextLength: fullText?.length,
    sampleText: hasFullText ? fullText[0].text : undefined
  });

  const formRef = useRef<HTMLFormElement>(null);
  const addToCartFetcher = useFetcher<any>();
  const { toggleCartDrawer } = useCart();
  const { region } = useRegion();
  const hasErrors = Object.keys(addToCartFetcher.data?.fieldErrors || {}).length > 0;
  const isSubmitting = ['submitting', 'loading'].includes(addToCartFetcher.state);
  const validator = getAddToCartValidator(product);

  useEffect(() => {
    console.log('Fetcher state:', addToCartFetcher.state);
    console.log('Fetcher data:', addToCartFetcher.data);
    if (addToCartFetcher.data?.fieldErrors) {
      console.error('Form validation errors:', addToCartFetcher.data.fieldErrors);
    }
    if (addToCartFetcher.data?.error) {
      console.error('Cart error:', addToCartFetcher.data.error);
    }
  }, [addToCartFetcher.state, addToCartFetcher.data]);

  const renderFullText = () => {
    if (!hasFullText) {
      console.log("Debug: No fullText content");
      return null;
    }

    console.log("Debug: Rendering fullText content:", fullText);

    return (
      <div className="bg-white p-8 rounded-lg mb-4">
        <div className="prose prose-lg max-w-none">
          {fullText.map((block, index) => {
            // Skip empty blocks
            if (!block.text?.trim()) return null;

            // Determine the appropriate element based on style
            switch (block.style) {
              case 'h1':
                return <h1 key={index} className="text-4xl font-bold mb-6">{block.text}</h1>;
              case 'h2':
                return <h2 key={index} className="text-3xl font-semibold mb-4">{block.text}</h2>;
              case 'h3':
                return <h3 key={index} className="text-2xl font-medium mb-3">{block.text}</h3>;
              case 'h4':
                return <h4 key={index} className="text-xl font-medium mb-2">{block.text}</h4>;
              case 'blockquote':
                return (
                  <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
                    {block.text}
                  </blockquote>
                );
              default:
                return <p key={index} className="mb-4 leading-relaxed">{block.text}</p>;
            }
          })}
        </div>
      </div>
    );
  };

  const defaultValues: AddToCartFormValues = {
    productId: product.id!,
    quantity: 1,
    edition: product.variants?.[0]?.metadata?.edition || product.variants?.[0]?.title || '',
    options:
      product.options?.reduce(
        (acc, option) => {
          if (!option.id || !option.values?.length) return acc;
          acc[option.id] = option.values[0].value;
          return acc;
        },
        {} as Record<string, string>,
      ) || {},
  };

  const breadcrumbs = getBreadcrumbs(product);
  const currencyCode = region.currency_code;
  const [controlledOptions, setControlledOptions] = useState<Record<string, string>>(defaultValues.options);
  const selectedOptions = useMemo(
    () => product.options?.map(({ id }) => controlledOptions[id]),
    [product, controlledOptions],
  );

  const variantMatrix = useMemo(() => selectVariantMatrix(product), [product]);
  const selectedVariant = useMemo(
    () => selectVariantFromMatrixBySelectedOptions(variantMatrix, selectedOptions),
    [variantMatrix, selectedOptions],
  );

  const productSoldOut = useProductInventory(product).averageInventory === 0;

  const handleOptionChangeBySelect = (e: ChangeEvent<HTMLInputElement>) => {
    setControlledOptions({
      ...controlledOptions,
      [e.target.name.replace('options.', '')]: e.target.value,
    });
  };

  const handleOptionChangeByRadio = (name: string, value: string) => {
    setControlledOptions({
      ...controlledOptions,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!isSubmitting && !hasErrors) {
      formRef.current?.reset();
    }
  }, [isSubmitting, hasErrors]);

  const soldOut = variantIsSoldOut(selectedVariant) || productSoldOut;

  const [selectedEdition, setSelectedEdition] = useState<string>(() => {
    // Get the first variant's edition type as the default
    const firstVariant = product.variants?.[0];
    if (!firstVariant) return '';
    
    const defaultEdition = firstVariant.metadata?.edition || firstVariant.title;
    return defaultEdition.toLowerCase();
  });

  const { productMetadata } = useLoaderData<{ productMetadata: SanityProductMetadata }>();

  const editionDetails: EditionDetails[] = useMemo(() => {
    if (!product.variants) return [];

    return product.variants.map(variant => {
      const editionType = variant.metadata?.edition || variant.title;
      
      const metadata = productMetadata?.editions?.find(
        e => e.edition.toLowerCase() === editionType.toLowerCase()
      );

      const price = variant.calculated_price?.calculated_amount
        ? `${variant.calculated_price.calculated_amount.toFixed(2)}`
        : '0.00';

      console.log('Debug - Variant pricing:', {
        editionType,
        variantId: variant.id,
        calculatedPrice: variant.calculated_price?.calculated_amount,
        finalPrice: price
      });

      return {
        id: editionType.toLowerCase(),
        title: editionType,
        icon: getEditionIcon(editionType),
        price,
        variant_id: variant.id,
        description: metadata?.description || `${editionType} edition of ${product.title}`,
        features: metadata?.features || []
      };
    });
  }, [product.variants, productMetadata]);

  console.log('Debug - Variant prices:', product.variants?.map(v => ({
    id: v.id,
    title: v.title,
    prices: v.prices?.map(p => ({
      amount: p.amount,
      currency_code: p.currency_code
    })),
    calculated_price: v.calculated_price
  })));

  const selectedVariantByEdition = useMemo(() => {
    if (!selectedEdition || !product.variants) return null;
    
    return product.variants.find(variant => {
      const editionType = variant.metadata?.edition || variant.title;
      return editionType.toLowerCase() === selectedEdition.toLowerCase();
    });
  }, [selectedEdition, product.variants]);

  return (
    <>
      <section className="pb-12 pt-12 xl:pt-24 min-h-screen">
        <Form<AddToCartFormValues, LineItemActions.CREATE>
          id="addToCartForm"
          formRef={formRef}
          fetcher={addToCartFetcher}
          encType="multipart/form-data"
          method="post"
          action="/api/cart/line-items"
          subaction={LineItemActions.CREATE}
          defaultValues={defaultValues}
          validator={validator}
          onSubmit={(data, event) => {
            console.log('Form submitting with data:', {
              productId: product.id,
              edition: selectedEdition,
              quantity: data.quantity,
              options: data.options
            });
            
            if (!selectedEdition) {
              console.log('Preventing submission - no edition selected');
              event.preventDefault();
              return;
            }
            
            toggleCartDrawer(true);
          }}
        >
          <input type="hidden" name="productId" value={product.id} />
          <input type="hidden" name="edition" value={selectedEdition} />
          <input type="hidden" name="subaction" value={LineItemActions.CREATE} />
          {Object.entries(controlledOptions).map(([key, value]) => (
            <input key={key} type="hidden" name={`options.${key}`} value={value} />
          ))}

          <Container className="px-0 sm:px-6 md:px-8">
            <Grid>
              <GridColumn>
                <Breadcrumbs className="mb-6 px-6 md:px-10 text-primary" breadcrumbs={breadcrumbs} />
                
                <div className="md:py-6">
                  <Grid className="!gap-0">
                    <GridColumn className="mb-8 md:col-span-6 lg:col-span-7 xl:pr-16 xl:pl-9">
                      <ProductImageGallery product={product} />
                    </GridColumn>

                    <GridColumn className="flex flex-col md:col-span-6 lg:col-span-5">
                      <div className="px-6 md:px-10 md:pt-0">
                        <header className="flex gap-4 mb-8">
                          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
                            {product.title}
                          </h1>
                          <div className="flex-1" />
                          <Share
                            itemType="product"
                            shareData={{
                              title: product.title,
                              text: truncate(product.description || 'Check out this product', {
                                length: 200,
                                separator: ' ',
                              }),
                            }}
                          />
                        </header>

                        <section aria-labelledby="product-information" className="mt-4">
                          <h2 id="product-information" className="sr-only">
                            Product information
                          </h2>

                          <p className="text-lg text-gray-900 sm:text-xl">
                            {selectedVariantByEdition?.calculated_price?.calculated_amount ? (
                              <ProductPrice 
                                product={product} 
                                variant={selectedVariantByEdition} 
                                currencyCode={currencyCode} 
                              />
                            ) : (
                              <ProductPriceRange 
                                product={product} 
                                currencyCode={currencyCode} 
                              />
                            )}
                          </p>
                        </section>

                        <ProductDescription description={product.description} />

                        <FormError />

                        <div className="my-2 flex flex-col gap-2">
                          <div className="flex items-center gap-4 py-2">
                            {!soldOut && <QuantitySelector variant={selectedVariant} />}
                            <div className="flex-1">
                              {!soldOut ? (
                                <SubmitButton className="!h-12 w-full whitespace-nowrap !text-base !font-bold">
                                  {isSubmitting ? 'Adding...' : 
                                   addToCartFetcher.data?.error ? 'Failed - Try Again' : 
                                   'Add to cart'}
                                </SubmitButton>
                              ) : (
                                <SubmitButton
                                  disabled
                                  className="pointer-events-none !h-12 w-full !text-base !font-bold opacity-50"
                                >
                                  Sold out
                                </SubmitButton>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </GridColumn>
                  </Grid>

                  <Grid>
                    <GridColumn className="md:col-span-12">
                      <div className="px-6 md:px-10">
                        <section aria-labelledby="product-editions" className="my-6">
                          <h2 id="product-editions" className="text-lg font-medium mb-3">
                            Available Editions
                          </h2>
                          <EditionTabs
                            editions={editionDetails}
                            selectedEdition={selectedEdition}
                            onChange={setSelectedEdition}
                            currencyCode={currencyCode}
                          />
                        </section>
                      </div>
                    </GridColumn>
                  </Grid>
                </div>
              </GridColumn>
            </Grid>
          </Container>
        </Form>
      </section>
      <ProductList className="!pb-[100px] xl:px-9" heading="You may also like" />
      {renderFullText()}
    </>
  );
}
