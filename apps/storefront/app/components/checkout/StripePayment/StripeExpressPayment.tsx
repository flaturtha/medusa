import { type FC } from 'react';
import { StripeExpressCheckoutForm } from './StripeExpressPaymentForm';
import { StripeElementsOptionsMode } from '@stripe/stripe-js';
import { StripeElementsProvider } from './StripeElementsProvider';
import { StoreCart } from '@medusajs/types';
import { useCheckout } from '@app/hooks/useCheckout';
import { amountToStripeExpressCheckoutAmount } from '@libs/util/checkout/amountToStripeExpressCheckoutAmount';

interface StripeExpressCheckoutProps {
  cart: StoreCart;
}

export const StripeExpressCheckout: FC<StripeExpressCheckoutProps> = ({ cart }) => {
  const { activePaymentSession } = useCheckout();

  const options: StripeElementsOptionsMode = {
    mode: 'payment',
    amount: amountToStripeExpressCheckoutAmount(cart.total),
    currency: cart?.currency_code || 'usd',
    capture_method: 'manual',
  };

  return (
    <StripeElementsProvider options={options}>
      <StripeExpressCheckoutForm />
    </StripeElementsProvider>
  );
};
