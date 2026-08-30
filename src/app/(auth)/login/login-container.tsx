'use client';

import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { loginAction } from '@/serverAction/authAction';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { AuthActionResult, LoginPayload } from '@/types/auth.types';

const LoginContainer = () => {
  const router = useRouter();

  const { mutate: loginMutation, isPending } = useMutation<
    AuthActionResult,
    Error,
    LoginPayload
  >({
    mutationFn: async (data: LoginPayload) => {
      const result = await loginAction(data);

      if (result.success) {
        toast.add({
          title: 'Login Successful',
          description: 'Welcome back! You have been logged in successfully.',
          type: 'success',
        });
        router.push('/dashboard');
      } else {
        toast.add({
          title: 'Login Failed',
          description: result.error || 'An error occurred during login.',
          type: 'error',
        });
      }

      return result;
    },
  });

  const handleLogin = (formdata: LoginPayload) => {
    loginMutation(formdata);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs border border-border rounded-lg p-6">
            <LoginForm onSubmit={handleLogin} isPending={isPending} />
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

export default LoginContainer;
