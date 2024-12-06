import { Actions } from '@app/components/common/actions/Actions';
import { Button } from '@app/components/common/buttons/Button';
import { SubmitButton } from '@app/components/common/buttons/SubmitButton';
import { Form } from '@app/components/common/forms/Form';
import { FormError } from '@app/components/common/forms/FormError';
import { FieldGroup } from '@app/components/common/forms/fields/FieldGroup';
import { FieldText } from '@app/components/common/forms/fields/FieldText';
import { useCheckout } from '@app/hooks/useCheckout';
import { useCustomer } from '@app/hooks/useCustomer';
import { useRegions } from '@app/hooks/useRegions';
import { checkAccountDetailsComplete } from '@libs/util/checkout';
import { useFetcher } from '@remix-run/react';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'remix-validated-form';
import { CheckoutAction, type UpdateAccountDetailsInput } from '@app/routes/api.checkout';
import { CheckoutStep } from '@app/providers/checkout-provider';
import { emailAddressValidation } from '@libs/util/validation';
import { CheckoutSectionHeader } from './CheckoutSectionHeader';
import HiddenAddressGroup from './HiddenAddressGroup';
import {
  MedusaStripeAddress,
  defaultStripeAddress,
  type StripeAddress,
} from './MedusaStripeAddress/MedusaStripeAddress';
import { AddressDisplay } from './address/AddressDisplay';
import { checkoutAccountDetailsValidator, selectInitialShippingAddress } from './checkout-form-helpers';
import type { StoreRegion, StoreRegionCountry } from '@medusajs/types';

import type { MedusaAddress } from '@libs/types';
import { medusaAddressToAddress } from '@libs/util';

const NEW_SHIPPING_ADDRESS_ID = 'new';
export const CheckoutAccountDetails = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const checkoutContactInfoFormFetcher = useFetcher<{}>();
  const checkoutAccountDetailsFormFetcher = useFetcher<{
    fieldErrors: Record<string, string>;
  }>();
  const form = useFormContext('checkoutAccountDetailsForm');
  const { customer } = useCustomer();
  const { step, setStep, goToNextStep, cart } = useCheckout();
  const isActiveStep = step === CheckoutStep.ACCOUNT_DETAILS;

  if (!cart) return null;

  const { regions } = useRegions();
  const allowedCountries = (regions ?? []).flatMap(
    (region: StoreRegion) => region.countries!.map((country: StoreRegionCountry) => country.iso_2) as string[],
  );
  const initialShippingAddress = selectInitialShippingAddress(cart, customer!);
  const [stripeShippingAddress, setStripeShippingAddress] = useState<StripeAddress>(() =>
    defaultStripeAddress(initialShippingAddress),
  );

  const isComplete = checkAccountDetailsComplete(cart);
  const isSubmitting = ['submitting', 'loading'].includes(checkoutAccountDetailsFormFetcher.state);

  const hasErrors = !!checkoutAccountDetailsFormFetcher.data?.fieldErrors;

  const initialShippingAddressId = initialShippingAddress?.id ?? NEW_SHIPPING_ADDRESS_ID;

  const countryOptions =
    (cart.region?.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    })) as { value: string; label: string }[]) ?? [];

  const defaultValues = {
    cartId: cart.id,
    email: customer?.email || cart.email || '',
    customerId: customer?.id,
    allowSuggestions: true,
    shippingAddress: {
      ...medusaAddressToAddress(initialShippingAddress as MedusaAddress),
    },
    shippingAddressId: initialShippingAddressId,
  };

  // on load, submit form with default values if there is only one shipping address
  useEffect(() => {
    if (!formRef.current || !customer?.addresses || customer.addresses.length > 1 || initialShippingAddressId) return;
    const formData = new FormData(formRef.current);
    form.reset();
    checkoutAccountDetailsFormFetcher.submit(formData, {
      method: 'post',
      action: '/api/checkout',
    });
  }, [formRef.current]);

  useEffect(() => {
    if (isActiveStep && !isSubmitting && !hasErrors && isComplete) {
      form.reset();
      goToNextStep();
    }
  }, [isSubmitting, isComplete]);

  const handleCancel = () => {
    goToNextStep();
  };

  const handleEmailChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const isEmailValid = await emailAddressValidation.email.isValid(e.target.value);
      if (!isEmailValid) return;

      checkoutContactInfoFormFetcher.submit(new FormData(e.target.form as HTMLFormElement), {
        method: 'post',
        action: '/api/checkout',
      });
    },
    500,
    { leading: true },
  );

  const showCompleted = isComplete && !isActiveStep;

  return (
    <div className="checkout-account-details">
      <CheckoutSectionHeader completed={showCompleted} setStep={setStep} step={CheckoutStep.ACCOUNT_DETAILS}>
        Account details
      </CheckoutSectionHeader>

      {!isActiveStep && isComplete && (
        <AddressDisplay
          title="Shipping Address"
          address={stripeShippingAddress.address}
          countryOptions={countryOptions}
        />
      )}

      {isActiveStep && (
        <>
          {customer?.email ? (
            <p className="mt-2 text-sm">To get started, please select your shipping address.</p>
          ) : (
            <p className="mt-2 text-sm">To get started, enter your email address.</p>
          )}

          <Form<UpdateAccountDetailsInput, CheckoutAction.UPDATE_ACCOUNT_DETAILS>
            formRef={formRef}
            id="checkoutAccountDetailsForm"
            method="post"
            action="/api/checkout"
            fetcher={checkoutAccountDetailsFormFetcher}
            defaultValues={defaultValues}
            subaction={CheckoutAction.UPDATE_ACCOUNT_DETAILS}
            // @ts-ignore
            validator={checkoutAccountDetailsValidator}
          >
            <FieldText type="hidden" name="cartId" />
            <FieldText type="hidden" name="customerId" />

            <FieldGroup>
              <FieldText
                inputProps={{
                  autoFocus: true,
                }}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                label="Email Address"
                onChange={handleEmailChange}
              />
            </FieldGroup>

            <HiddenAddressGroup address={stripeShippingAddress.address} prefix="shippingAddress" />

            <FieldText type="hidden" name="shippingAddressId" value={initialShippingAddressId} />

            <MedusaStripeAddress
              mode="shipping"
              address={stripeShippingAddress.address}
              allowedCountries={allowedCountries}
              setAddress={setStripeShippingAddress}
            />

            <FormError />

            <Actions>
              <SubmitButton
                disabled={isSubmitting || (!stripeShippingAddress.completed && initialShippingAddressId === 'new')}
              >
                {isSubmitting ? 'Saving...' : 'Save and continue'}
              </SubmitButton>

              {isComplete && (
                <Button disabled={isSubmitting} onClick={handleCancel}>
                  Cancel edit
                </Button>
              )}
            </Actions>
          </Form>
        </>
      )}
    </div>
  );
};
