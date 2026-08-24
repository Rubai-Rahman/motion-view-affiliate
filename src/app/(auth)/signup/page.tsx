import SignupContainer from './signup-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up for an account',
};

export default function page() {
  return <SignupContainer />;
}
