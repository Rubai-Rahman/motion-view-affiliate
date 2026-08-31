import { Metadata } from 'next';
import OrdersContainer from './orders-container';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Affiliate order list and commission details.',
};

const OrdersPage = () => {
  return <OrdersContainer />;
};

export default OrdersPage;
