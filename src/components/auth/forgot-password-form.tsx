'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormField } from '../ui/form-field';
import { PasswordInput } from './password-input';

const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(/^01\d{9}$/, 'Enter a valid 11-digit phone number'),
});

const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers'),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(16, 'Password must not exceed 16 characters'),

    password_confirmation: z
      .string()
      .min(6, 'Password confirmation is required')
      .max(16, 'Password must not exceed 16 characters'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

type ForgotPasswordProps = {
  isSendingOtp?: boolean;
  isVerifyingOtp?: boolean;
  isResettingPassword?: boolean;

  onSendOtp: (phone: string) => void;
  onVerifyOtp: (phone: string, otp: string) => void;
  onResetPassword: (
    phone: string,
    otp: string,
    password: string,
    passwordConfirmation: string,
  ) => void;
};

export function ForgotPasswordForm({
  isSendingOtp = false,
  isVerifyingOtp = false,
  isResettingPassword = false,
  onSendOtp,
  onVerifyOtp,
  onResetPassword,
}: ForgotPasswordProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  const handlePhoneSubmit = (data: PhoneFormValues) => {
    setPhone(data.phone);
    onSendOtp(data.phone);

    // Parent can change the flow after successful API response.
    // For now we move to OTP after requesting OTP.
    setStep('otp');
  };

  const handleOtpSubmit = (data: OtpFormValues) => {
    setOtp(data.otp);
    onVerifyOtp(phone, data.otp);
  };

  const handlePasswordSubmit = (data: PasswordFormValues) => {
    onResetPassword(phone, otp, data.password, data.password_confirmation);
  };

  const handleResendOtp = () => {
    if (!phone || isSendingOtp) return;

    onSendOtp(phone);
  };

  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            {step === 'phone' && 'Forgot Password'}
            {step === 'otp' && 'Verify Phone Number'}
            {step === 'password' && 'Reset Password'}
          </h1>

          <p className="text-sm text-balance text-muted-foreground">
            {step === 'phone' &&
              'Enter your phone number to reset your password.'}

            {step === 'otp' && `Enter the verification code sent to ${phone}.`}

            {step === 'password' &&
              'Your phone number has been verified. Create a new password.'}
          </p>
        </div>

        {/* STEP 1: PHONE */}
        {step === 'phone' && (
          <form
            onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={phoneForm.control}
              name="phone"
              label="Phone Number"
              render={(field) => (
                <Input
                  {...field}
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="017XXXXXXXX"
                  autoComplete="tel"
                  maxLength={11}
                />
              )}
            />

            <Field>
              <Button type="submit" className="w-full" isLoading={isSendingOtp}>
                {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </Field>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 'otp' && (
          <form
            onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={otpForm.control}
              name="otp"
              label="Verification Code"
              render={(field) => (
                <Input
                  {...field}
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  autoComplete="one-time-code"
                />
              )}
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Didn&apos;t receive the code?
              </span>

              <Button
                type="button"
                variant="link"
                className="h-auto p-0"
                disabled={isSendingOtp}
                onClick={handleResendOtp}
              >
                {isSendingOtp ? 'Sending...' : 'Resend OTP'}
              </Button>
            </div>

            <Field>
              <Button
                type="submit"
                className="w-full"
                isLoading={isVerifyingOtp}
              >
                {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </Field>
          </form>
        )}

        {/* STEP 3: PASSWORD */}
        {step === 'password' && (
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={passwordForm.control}
              name="password"
              label="New Password"
              render={(field) => (
                <PasswordInput
                  {...field}
                  id="password"
                  autoComplete="new-password"
                />
              )}
            />

            <FormField
              control={passwordForm.control}
              name="password_confirmation"
              label="Confirm Password"
              render={(field) => (
                <PasswordInput
                  {...field}
                  id="password_confirmation"
                  autoComplete="new-password"
                />
              )}
            />

            <Field>
              <Button
                type="submit"
                className="w-full"
                isLoading={isResettingPassword}
              >
                {isResettingPassword
                  ? 'Resetting Password...'
                  : 'Reset Password'}
              </Button>
            </Field>
          </form>
        )}
      </FieldGroup>
    </div>
  );
}
