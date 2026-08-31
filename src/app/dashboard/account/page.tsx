import { Metadata } from 'next';
import AccountContainer from './account-container';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Account page',
};

const AccountPage = () => {
  return <AccountContainer />;
};

export default AccountPage;
