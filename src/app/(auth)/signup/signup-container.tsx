'use client';

import { SignupForm } from '@/components/auth/signup-form';
import { toast } from '@/components/ui/toast';
import { signupAction, SignupActionResult } from '@/serverAction/authAction';
import { SignupPayload } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupContainer = () => {
  const router = useRouter();
  const { mutate: signUpMutation, isPending } = useMutation<
    SignupActionResult,
    Error,
    SignupPayload
  >({
    mutationFn: async (data: SignupPayload) => {
      const result = await signupAction(data);
      if (result?.success) {
        toast.add({
          title: 'Signup Successful',
          description: result.data?.message || 'Signup successful',
          type: 'success',
        });
        router.push('/onboard');
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
      <div className="relative flex flex-col gap-4 p-6 md:p-10 bg-linear-to-br from-background via-background to-secondary/5">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-lg">
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-secondary to-secondary/60 shadow-lg shadow-secondary/20">
                <span className="text-2xl font-bold text-secondary-foreground">
                  M
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Motion View
                </h1>
                <p className="text-xs text-muted-foreground">
                  Affiliate Platform
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-8 shadow-2xl shadow-secondary/5">
              <SignupForm onSubmit={handleSignup} isPending={isPending} />
            </div>

            {/* Back to home */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-secondary transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block bg-linear-to-br from-secondary/20 via-secondary/10 to-primary/20">
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
        <Image
          src="/images/login.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Join Our Affiliate Program
            </h2>
            <p className="text-lg text-muted-foreground">
              Start earning commissions and grow your business with Motion View
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;
