import LoginContainer from './login-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function page() {
  return <LoginContainer />;
}
  