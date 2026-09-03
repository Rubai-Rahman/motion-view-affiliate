'use client';

import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { toast } from '@/components/ui/toast';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import {
  getOtpByPhone,
  resetPassword,
  ResetPasswordPayload,
  verifyOtpForPhone,
} from '@/serverAction/passwordRecoveryAction';

const ChangePasswordContainer = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('phone');
  const { mutate: getOtp, isPending: isGetOtpPending } = useMutation({
    mutationFn: async (data: string) => await getOtpByPhone(data),

    onSuccess: () => {
      toast.add({
        title: 'OTP Sent Successfully',
        type: 'success',
      });
      setStep('otp');
    },
    onError: (error) => {
      toast.add({
        title: error.message || 'Failed to Send OTP',
        type: 'error',
      });
    },
  });

  const { mutate: verifyOtp, isPending: isVerifyOtpPending } = useMutation({
    mutationFn: async (data: string) => await verifyOtpForPhone(data),
    onSuccess: () => {
      toast.add({
        title: 'OTP Verified Successfully',
        type: 'success',
      });
      setStep('password');
    },
    onError: (error) => {
      toast.add({
        title: error.message || 'Failed to Verify OTP',

        type: 'error',
      });
    },
  });

  const { mutate: resetPasswordMutation, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationFn: async (data: ResetPasswordPayload) =>
        await resetPassword(data),
      onSuccess: () => {
        toast.add({
          title: 'Password Updated Successfully',
          type: 'success',
        });
      },
      onError: (error) => {
        toast.add({
          title: error.message || 'Failed to Update Password',
          type: 'error',
        });
      },
    });

  const handleGetOtp = (formdata: string) => {
    getOtp(formdata);
  };
  const handleVerifyOtp = (formdata: string) => {
    verifyOtp(formdata);
  };
  const handleResetPassword = (formdata: ResetPasswordPayload) => {
    resetPasswordMutation(formdata);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs border border-border rounded-lg p-6">
            <ForgotPasswordForm
              isSendingOtp={isGetOtpPending}
              isVerifyingOtp={isVerifyOtpPending}
              isResettingPassword={isUpdatePasswordPending}
              onSendOtp={handleGetOtp}
              step={step}
              onVerifyOtp={handleVerifyOtp}
              onResetPassword={handleResetPassword}
            />
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

export default ChangePasswordContainer;
