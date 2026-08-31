import { Metadata } from 'next';
import ReportsContainer from './reports-container';

export const metadata: Metadata = {
  title: 'Reports',
  description: 'Wallet balance and transaction history.',
};

const ReportsPage = () => {
  return <ReportsContainer />;
};

export default ReportsPage;
