import { getShippingOptionsByProfile } from '@libs/util/checkout';

import { addressValidation, emailAddressValidation, nameValidation, phoneValidation } from '@libs/util/validation';
import { StoreCart, StoreCartAddress, StoreCartShippingOption, StoreCustomer } from '@medusajs/types';
import { withYup } from '@remix-validated-form/with-yup';
import * as Yup from 'yup';

const checkoutValidation = {
  cartId: Yup.string().required('Cart ID is missing'),
};

const addressValidationSchema = Yup.object().shape({
  ...nameValidation,
  ...addressValidation,
  ...phoneValidation,
});

export const checkoutUpdateContactInfoValidator = withYup(
  Yup.object().shape({
    ...checkoutValidation,
    ...emailAddressValidation,
  }),
);

export const checkoutUpdateBillingAddressValidator = withYup(
  Yup.object().shape({
    ...checkoutValidation,
    billingAddress: addressValidationSchema,
  }),
);

const accountDetailsSchema = Yup.object().shape({
  ...checkoutValidation,
  ...emailAddressValidation,
  allowSuggestions: Yup.boolean().optional(),
  shippingAddressId: Yup.string().required('Shipping address ID is required'),
  shippingAddress: Yup.object().when('shippingAddressId', {
    is: 'new',
    then: () => addressValidationSchema,
  }),
});

export const checkoutAccountDetailsValidator = withYup(accountDetailsSchema);

// NOTE: ignored fields will be validated agains `checkoutAccountDetailsValidator` in final step of express checkout
export const expressCheckoutAccountDetailsValidator = withYup(
  accountDetailsSchema.shape({
    email: emailAddressValidation.email.optional(),
    shippingAddress: Yup.object().when('shippingAddressId', {
      is: 'new',
      then: () => addressValidationSchema.pick(['city', 'province', 'countryCode', 'postalCode']),
    }),
  }),
);

export const getCheckoutAddShippingMethodValidator = (shippingOptions: StoreCartShippingOption[]) => {
  const shippingOptionsByProfile = getShippingOptionsByProfile(shippingOptions);
  const shippingOptionsProfileIds = Object.keys(shippingOptionsByProfile);

  return withYup(
    Yup.object().shape({
      ...checkoutValidation,
      shippingOptionIds: Yup.array(Yup.string().required('Please select a delivery method'))
        .length(shippingOptionsProfileIds.length, 'Please select a delivery method for all items')
        .required('Please select a delivery method for all items'),
    }),
  );
};

export const checkoutPaymentValidator = withYup(
  Yup.object().shape({
    ...checkoutValidation,
    providerId: Yup.string().required('Provider ID is required'),
    paymentMethodId: Yup.string().required('Payment method ID is required'),
    sameAsShipping: Yup.string().optional(),
    billingAddress: Yup.object().when(['paymentMethodId', 'sameAsShipping'], {
      is: (paymentMethodId: string, sameAsShipping: string | boolean) => {
        return paymentMethodId === 'new' && !sameAsShipping;
      },
      then: () => addressValidationSchema,
      otherwise: (schema: Yup.ObjectSchema<any>) => schema.strip(),
    }),
  }),
);

export const checkoutAddDiscountCodeValidator = withYup(
  Yup.object().shape({
    ...checkoutValidation,
    code: Yup.string().optional(),
  }),
);

export const checkoutRemoveDiscountCodeValidator = withYup(
  Yup.object().shape({
    ...checkoutValidation,
    code: Yup.string(),
  }),
);

export const selectInitialShippingAddress = (cart: StoreCart, customer?: StoreCustomer) => {
  if (cart.shipping_address) return cart.shipping_address;

  if (!customer || !customer?.addresses?.length) return null;

  const customerAddress = customer?.default_shipping_address_id
    ? customer.addresses?.find((a) => a.id === customer?.default_shipping_address_id)
    : customer?.addresses?.[0];

  return (customerAddress as StoreCartAddress) || null;
};
