'use client';

import { LoginContainer } from '@/components/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (data: { email: string; password: string }) => {
    console.log('Login:', data);
    // Add your login logic here
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <LoginContainer
      onSubmit={handleSubmit}
      onForgotPassword={handleForgotPassword}
      onSignup={handleSignup}
    />
  );
}
