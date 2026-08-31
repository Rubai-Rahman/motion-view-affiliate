import { Metadata } from 'next';
import DashboardContainer from './dashboard-container';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

const DashboardPage = () => {
  return <DashboardContainer />;
};

export default DashboardPage;
