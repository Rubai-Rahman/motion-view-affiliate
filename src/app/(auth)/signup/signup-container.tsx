'use client';

import { SignupForm } from '@/components/auth/signup-form';
import { toast } from '@/components/ui/toast';
import { signupAction } from '@/serverAction/authAction';
import { AuthActionResult, SignupPayload } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SignupContainer = () => {
  const router = useRouter();

  const { mutate: signUpMutation, isPending } = useMutation<
    AuthActionResult,
    Error,
    SignupPayload
  >({
    mutationFn: async (data: SignupPayload) => {
      const result = await signupAction(data);
      if (result.success) {
        toast.add({
          title: 'Signup Successful',
          description: 'Welcome! You have been signed up successfully.',
          type: 'success',
        });
        router.push('/dashboard');
      } else {
        toast.add({
          title: 'Signup Failed',
          description: result.error || 'An error occurred during signup.',
          type: 'error',
        });
      }
      return result;
    },
  });

  const handleSignup = (formdata: SignupPayload) => {
    signUpMutation(formdata);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg border border-border rounded-lg p-6">
            <SignupForm onSubmit={handleSignup} isPending={isPending} />
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
