'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCard, AuthLogo, AuthForm, AuthField } from './auth-card';

interface SignupContainerProps {
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  onLogin?: () => void;
}

export function SignupContainer({
  onSubmit = (data) => console.log('Signup:', data),
  onLogin = () => {},
}: SignupContainerProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
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
        title="Create Account"
        description="Join the Motion View Affiliate program"
        footer={
          <>
            Already have an account?{' '}
            <button
              onClick={onLogin}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign in
            </button>
          </>
        }
      >
        <AuthForm onSubmit={handleSubmit}>
          <AuthField>
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </AuthField>
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
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
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
          <AuthField>
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </AuthField>
          <Button
            type="submit"
            className="w-full h-11 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-blue-500/25"
          >
            Create Account
          </Button>
        </AuthForm>
      </AuthCard>
    </div>
  );
}