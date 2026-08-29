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
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormField } from '../ui/form-field';
import { PasswordInput } from './password-input';

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
  onSubmit,
  isPending = false,
}: {
  onSubmit: (data: { login: string; password: string }) => void;
  isPending?: boolean;
}) {
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

  const onSubmitHandler = async (data: LoginFormValues) => {
    const payload = {
      login: data.identifier,
      password: data.password,
    };
    onSubmit(payload);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <FormField
          control={control}
          name="identifier"
          label="Email or Phone Number"
          render={(field) => (
            <Input
              {...field}
              id="identifier"
              type="text"
              placeholder="Add your email or phone number"
              autoComplete="email"
            />
          )}
        />

        <FormField
          control={control}
          name="password"
          label="Password"
          labelExtra={
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          }
          render={(field) => (
            <PasswordInput
              {...field}
              id="password"
              autoComplete="current-password"
            />
          )}
        />

        <Field>
          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="w-full"
          >
            {isSubmitting || isPending ? 'Logging in...' : 'Login'}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
