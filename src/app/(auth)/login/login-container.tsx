'use client';

import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { loginAction } from '@/serverAction/authAction';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { AuthActionResult, LoginPayload } from '@/types/auth.types';
import Link from 'next/link';

const LoginContainer = () => {
  const router = useRouter();

  const { mutate: loginMutation, isPending } = useMutation<
    AuthActionResult,
    Error,
    LoginPayload
  >({
    mutationFn: (data: LoginPayload) => loginAction(data),
    onSuccess: (result) => {
      console.log('result===', result);
      if (result.success && result.data) {
        const phone = result.data.user.phone;
        const name = result.data.user.name;
        const affiliateCode = result.data.user.affiliate_code;
        const profilePicture = result.data.user.profile_picture;
        if (phone) localStorage.setItem('phone', phone);
        if (name) localStorage.setItem('name', name);
        if (affiliateCode) {
          localStorage.setItem('affiliateCode', affiliateCode);
        }
        if (profilePicture) {
          localStorage.setItem('profilePicture', profilePicture);
        }
        toast.add({
          title: 'Login Successful',
          description: result.message || 'Login successful.',
          type: 'success',
        });
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      toast.add({
        title: 'Login Failed',
        description: error.message || 'An error occurred during login.',
        type: 'error',
      });
    },
  });

  const handleLogin = (formdata: LoginPayload) => {
    loginMutation(formdata);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col gap-4 p-6 md:p-10 bg-linear-to-br from-background via-background to-primary/5">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative flex flex-1 items-center justify-center shadow-lg py-2">
          <div className="relative w-full max-w-md ">
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <Image
                className="dark:invert"
                src="/images/logo.webp"
                alt="Logo"
                width={140}
                height={40}
              />
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-8 shadow-2xl shadow-primary/5">
              <LoginForm onSubmit={handleLogin} isPending={isPending} />
            </div>

            {/* Back to home */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block bg-linear-to-br from-primary/20 via-primary/10 to-secondary/20">
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
              Welcome Back
            </h2>
            <p className="text-lg text-muted-foreground">
              Access your affiliate dashboard and track your performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
