'use client';

import { SignupForm } from '@/components/auth/signup-form';
import Image from 'next/image';

const SignupContainer = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg border border-border rounded-lg p-6">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/images/login.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
};

export default SignupContainer;
