import { Metadata } from 'next';
import PaymentContainer from './payment-container';

export const metadata: Metadata = {
  title: 'Payment Report',
  description: 'Payment Report',
};

const PaymentPage = () => {
  return <PaymentContainer />;
};

export default PaymentPage;
