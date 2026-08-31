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

const ForgotPasswordContainer = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('phone');
  const { mutate: getOtp, isPending: isGetOtpPending } = useMutation({
    mutationFn: async (data: string) => {
      const result = await getOtpByPhone(data);
      console.log('result===', result);

      if (result.success) {
        toast.add({
          title: 'OTP Sent Successfully',
          type: 'success',
        });
        setStep('otp');
      } else {
        toast.add({
          title: result.error || 'Failed to Send OTP',
          type: 'error',
        });
      }

      return result;
    },
  });

  const { mutate: verifyOtp, isPending: isVerifyOtpPending } = useMutation({
    mutationFn: async (data: string) => {
      const result = await verifyOtpForPhone(data);
      if (result.success) {
        toast.add({
          title: 'OTP Verified Successfully',

          type: 'success',
        });
        setStep('password');
      } else {
        toast.add({
          title: result.error || 'Failed to Verify OTP',

          type: 'error',
        });
      }

      return result;
    },
  });
  const { mutate: resetPasswordMutation, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationFn: async (data: ResetPasswordPayload) => {
        const result = await resetPassword(data);
        console.log('result===', result);
        if (result.success) {
          toast.add({
            title: 'Password Updated Successfully',

            type: 'success',
          });
        } else {
          toast.add({
            title: result.error || 'Failed to Update Password',

            type: 'error',
          });
        }

        return result;
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

export default ForgotPasswordContainer;
