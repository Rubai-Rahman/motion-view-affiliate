import { Metadata } from 'next';
import ChangePasswordContainer from './change-password-container';

export const metadata: Metadata = {
  title: 'Change Password',
  description: 'Change password for an account',
};

export default function ChangePasswordPage() {
  return <ChangePasswordContainer />;
}
