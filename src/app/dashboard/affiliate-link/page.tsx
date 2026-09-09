import { Metadata } from 'next';
import AffiliateLinkContainer from './affiliate-container';

export const metadata: Metadata = {
  title: 'Affiliate Links',
  description: 'Manage your affiliate links and track performance.',
};

const AffiliateLinkPage = () => {
  return <AffiliateLinkContainer />;
};

export default AffiliateLinkPage;
