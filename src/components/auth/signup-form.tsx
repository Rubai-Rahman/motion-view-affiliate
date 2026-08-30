// components/signup-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField } from '@/components/ui/form-field';
import { PasswordInput } from './password-input';
import { z } from 'zod';
import { SignupPayload } from '@/types/auth.types';

const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.email('Enter a valid email address'),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => /^01\d{9}$/.test(value),
        'Phone must be a valid 11-digit number',
      ),
    address: z
      .string()
      .trim()
      .min(5, 'Address must be at least 5 characters')
      .optional(),
    description: z
      .string()
      .trim()
      .max(500, 'Description must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
    type: z.number().min(1, 'Type is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

type SignupFormProps = {
  onSubmit: (data: SignupPayload) => void;
  isPending?: boolean;
};
export function SignupForm({ onSubmit, isPending = false }: SignupFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      type: 1,
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmitHandler = async (data: SignupFormValues) => {
    const payload: SignupPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      description: data.description,
      type: data.type,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
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
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in your details below to get started
          </p>
        </div>

        <FormField
          control={control}
          name="name"
          label="Full Name"
          render={(field) => (
            <Input
              {...field}
              id="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
            />
          )}
        />

        <FormField
          control={control}
          name="email"
          label="Email"
          render={(field) => (
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          )}
        />

        <FormField
          control={control}
          name="phone"
          label="Phone Number"
          render={(field) => (
            <Input
              {...field}
              id="phone"
              type="text"
              placeholder="01XXXXXXXXX"
              autoComplete="tel"
            />
          )}
        />

        <FormField
          control={control}
          name="address"
          label="Address"
          render={(field) => (
            <Input
              {...field}
              id="address"
              type="text"
              placeholder="Street, city, area"
              autoComplete="street-address"
            />
          )}
        />

        <FormField
          control={control}
          name="type"
          label="Account Type"
          render={(field) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <FormField
          control={control}
          name="description"
          label="Description"
          render={(field) => (
            <Textarea
              {...field}
              id="description"
              placeholder="Tell us a bit about yourself (optional)"
              className="min-h-24 resize-none"
            />
          )}
        />

        <FormField
          control={control}
          name="password"
          label="Password"
          render={(field) => (
            <PasswordInput
              {...field}
              id="password"
              autoComplete="new-password"
            />
          )}
        />

        <FormField
          control={control}
          name="passwordConfirmation"
          label="Confirm Password"
          render={(field) => (
            <PasswordInput
              {...field}
              id="passwordConfirmation"
              autoComplete="new-password"
            />
          )}
        />

        <Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isPending}
            className="w-full"
          >
            {isSubmitting ? 'Creating account' : 'Create account'}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Already have an account?{' '}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
