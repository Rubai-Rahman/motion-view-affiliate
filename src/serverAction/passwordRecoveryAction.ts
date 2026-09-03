'use server';

import { apiPost } from '@/lib/fetch/fetchCore';
import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '@/types/auth.types';

export const getOtpByPhone = async (mobileNo: string) => {
  if (!mobileNo) {
    return { success: false, error: 'Mobile number is required' };
  }

  const result = await apiPost(
    `/reset-password-request-by-phone`,
    { phone: mobileNo },
    {
      auth: false,
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
export const resendOtpByPhone = async (mobileNo: string) => {
  if (!mobileNo) {
    return { success: false, error: 'Mobile number is required' };
  }

  const result = await apiPost(
    `/send-otp-for-change-password`,
    { phone: mobileNo },
    {
      auth: false,
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

export const verifyOtpForPhone = async (otpInfo: string) => {
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

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
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
export const resetPassword = async (payload: ResetPasswordPayload) => {
  const result = await apiPost(`/change-password`, payload, {
    auth: true,
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
