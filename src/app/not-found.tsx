'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertOctagon, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertOctagon className="size-10 text-destructive" />
        </div>

        <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, renamed, or doesn't exist.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 size-4" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full"
          >
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
