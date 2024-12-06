import { getVariantBySelectedOptions } from '@libs/util/products';
import { setCartId } from '@libs/util/server/cookies.server';
import { addToCart, deleteLineItem, retrieveCart, updateLineItem } from '@libs/util/server/data/cart.server';
import { getProductsById } from '@libs/util/server/data/products.server';
import { getSelectedRegion } from '@libs/util/server/data/regions.server';
import { FormValidationError } from '@libs/util/validation/validation-error';
import { StoreCart, StoreCartResponse, CartCreateLineItemInput } from '@medusajs/types';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { withYup } from '@remix-validated-form/with-yup';
import * as Yup from 'yup';

export const addCartItemValidation = withYup(
  Yup.object().shape({
    productId: Yup.string().required(),
    options: Yup.object().default({}),
    quantity: Yup.number().required(),
    edition: Yup.string().required('Please select an edition'),
  }),
);

export enum LineItemActions {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const subaction = formData.get('subaction') as LineItemActions;

  switch (subaction) {
    case LineItemActions.CREATE: {
      const productId = formData.get('productId') as string;
      const edition = formData.get('edition') as string;
      const quantity = Number(formData.get('quantity') || 1);
      const options: Record<string, string> = {};

      // Collect all options.* fields
      for (const [key, value] of formData.entries()) {
        if (key.startsWith('options.')) {
          options[key.replace('options.', '')] = value.toString();
        }
      }

      try {
        const region = await getSelectedRegion(request.headers);
        const [product] = await getProductsById({
          ids: [productId],
          regionId: region.id,
        }).catch(() => []);

        if (!product) {
          return json({ error: 'Product not found' }, { status: 404 });
        }

        const variant = getVariantBySelectedOptions(product.variants || [], options);
        if (!variant) {
          return json({ error: 'Variant not found' }, { status: 404 });
        }

        const responseHeaders = new Headers();
        const cart = await addToCart(request, {
          variantId: variant.id!,
          quantity,
          metadata: { edition }
        } as CartCreateLineItemInput);

        await setCartId(responseHeaders, cart.cart.id);

        return json(
          { cart: cart.cart },
          { headers: responseHeaders }
        );
      } catch (error) {
        console.error('Add to cart error:', error);
        return json(
          { error: 'Failed to add item to cart' },
          { status: 500 }
        );
      }
    }

    case LineItemActions.UPDATE: {
      const lineItemId = formData.get('lineItemId') as string;
      const quantity = Number(formData.get('quantity'));

      try {
        const result = await updateLineItem(request, {
          lineId: lineItemId,
          quantity,
        });
        return json(result);
      } catch (error) {
        return json(
          { error: 'Failed to update item' },
          { status: 500 }
        );
      }
    }

    case LineItemActions.DELETE: {
      const lineItemId = formData.get('lineItemId') as string;

      try {
        await deleteLineItem(request, lineItemId);
        const cart = await retrieveCart(request) as StoreCart;
        return json({ cart });
      } catch (error) {
        return json(
          { error: 'Failed to delete item' },
          { status: 500 }
        );
      }
    }

    default:
      return json(
        { error: 'Invalid action' },
        { status: 400 }
      );
  }
}
