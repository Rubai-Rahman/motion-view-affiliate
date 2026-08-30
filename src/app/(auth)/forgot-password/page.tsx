import { Metadata } from 'next';
import ForgotPasswordContainer from './forgot-password-container';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgot password for an account',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordContainer />;
}
