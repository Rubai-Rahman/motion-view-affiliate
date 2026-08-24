'use client';

import { SignupContainer } from '@/components/auth';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log('Signup:', data);
    // Add your signup logic here
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return <SignupContainer onSubmit={handleSubmit} onLogin={handleLogin} />;
}
