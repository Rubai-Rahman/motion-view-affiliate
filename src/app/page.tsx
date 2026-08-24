import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-8 max-w-2xl px-4">
        <div className="mx-auto w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Motion View Affiliate
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Join our affiliate program and earn commissions by promoting Motion
          View products
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="h-12 px-8 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-blue-500/25"
          >
            <Link href="/auth/signup">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 border-gray-300 dark:border-gray-700"
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
