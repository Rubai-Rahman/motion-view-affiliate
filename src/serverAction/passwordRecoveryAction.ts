'use server';

import { apiPost } from '@/lib/fetch/fetchCore';

interface UpdatePasswordPayload {
  phone: string;
  password: string;
  password_confirmation: string;
}

export const sendOtpForResetPassword = async (mobileNo: string) => {
  if (!mobileNo) {
    return { success: false, error: 'Mobile number is required' };
  }

  const result = await apiPost(
    `/send-otp-phone`,
    { phone: mobileNo },
    {
      auth: false,
      service: 'otp',
    },
  );
  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: result.data,
  };
};

export const otpVerify = async (otpInfo: string) => {
  const result = await apiPost(
    `/verify-otp`,
    { otp: otpInfo },
    { auth: false, service: 'otp' },
  );
  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: result.data,
  };
};

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const result = await apiPost(`/reset-password-by-phone`, payload, {
    auth: false,
  });
  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: result.data,
  };
};
