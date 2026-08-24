'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthCard, AuthLogo, AuthForm, AuthField } from './auth-card';

interface LoginContainerProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  onForgotPassword?: () => void;
  onSignup?: () => void;
}

export function LoginContainer({
  onSubmit = (data) => console.log('Login:', data),
  onForgotPassword = () => {},
  onSignup = () => {},
}: LoginContainerProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const logoIcon = (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <AuthCard
        logo={<AuthLogo icon={logoIcon} />}
        title="Welcome Back"
        description="Sign in to your Motion View Affiliate account"
        footer={
          <>
            Don't have an account?{' '}
            <button
              onClick={onSignup}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign up
            </button>
          </>
        }
      >
        <AuthForm onSubmit={handleSubmit}>
          <AuthField>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="affiliate@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </AuthField>
          <AuthField>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <button
                onClick={onForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </AuthField>
          <Button
            type="submit"
            className="w-full h-11 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-blue-500/25"
          >
            Sign In
          </Button>
        </AuthForm>
      </AuthCard>
    </div>
  );
}