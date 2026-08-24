'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Email or phone number is required')
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isPhone = /^01\d{9}$/.test(value);

        return isEmail || isPhone;
      },
      {
        message: 'Enter a valid email or 11-digit phone number',
      },
    ),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must not exceed 16 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);

    // Login API / server action
    // await login(data);
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {/* Email */}
        <Controller
          name="identifier"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="identifier">
                Email or Phone Number
              </FieldLabel>

              <Input
                {...field}
                id="identifier"
                type="text"
                placeholder="Add your email or phone number"
                autoComplete="email"
                aria-invalid={!!errors.identifier}
              />

              {errors.identifier && (
                <FieldDescription className="text-destructive">
                  {errors.identifier.message}
                </FieldDescription>
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <FieldDescription className="text-destructive">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
          )}
        />

        {/* Login */}
        <Field>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Field>

        {/* <FieldSeparator>Or continue with</FieldSeparator> */}

        {/* GitHub */}
        {/* <Field>
          <Button variant="outline" type="button" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-4"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385..."
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field> */}
      </FieldGroup>
    </form>
  );
}
