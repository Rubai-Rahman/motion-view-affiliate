'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock3,
  Gift,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: Check,
    title: 'Application submitted',
    description: 'Your affiliate application has been successfully received.',
    completed: true,
  },
  {
    icon: Clock3,
    title: 'Admin review',
    description: 'Our team will review your profile and approve your account.',
    completed: false,
    active: true,
  },
  {
    icon: ShieldCheck,
    title: 'Account approved',
    description: 'Once approved, you can access your affiliate dashboard.',
    completed: false,
  },
  {
    icon: LayoutDashboard,
    title: 'Start earning',
    description: 'Share products and start earning commissions.',
    completed: false,
  },
];

const benefits = [
  {
    icon: Gift,
    title: 'Earn commission',
    description: 'Get rewarded for every successful referral.',
  },
  {
    icon: Users,
    title: 'Grow your audience',
    description: 'Share products with your customers and community.',
  },
  {
    icon: Sparkles,
    title: 'Simple & transparent',
    description: 'Track clicks, orders and earnings from one place.',
  },
];

export default function OnboardingUI() {
  return (
    <main className="min-h-svh bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-5" />
            </div>

            <span className="text-lg tracking-tight">Motion View</span>
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Already have an account?
          </Link>
        </header>

        {/* Main */}
        <section className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-4xl">
            {/* Success Card */}
            <div className="overflow-hidden rounded-3xl border bg-card shadow-xl shadow-black/5">
              {/* Top gradient section */}
              <div className="relative overflow-hidden px-6 pb-10 pt-12 text-center sm:px-12 sm:pt-16">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />

                <div className="relative mx-auto flex size-20 items-center justify-center rounded-full border-8 border-primary/10 bg-primary/15">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <Check className="size-6 stroke-[3]" />
                  </div>
                </div>

                <div className="relative mt-7">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Application received
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    You&apos;re almost there!
                  </h1>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Your affiliate application has been submitted successfully.
                    Our team will review your information before activating your
                    account.
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="border-t px-6 py-8 sm:px-12 sm:py-10">
                <div className="mb-7">
                  <h2 className="font-semibold">What happens next?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your journey from application to your first commission.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div key={step.title} className="relative">
                        {/* Connector */}
                        {index < steps.length - 1 && (
                          <div className="absolute left-9 top-5 hidden h-px w-[calc(100%-2rem)] bg-border md:block" />
                        )}

                        <div className="relative">
                          <div
                            className={[
                              'flex size-10 items-center justify-center rounded-full border',
                              step.completed
                                ? 'border-primary bg-primary text-primary-foreground'
                                : step.active
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'bg-muted text-muted-foreground',
                            ].join(' ')}
                          >
                            <Icon className="size-4" />
                          </div>

                          <h3 className="mt-4 text-sm font-semibold">
                            {step.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Benefits */}
              <div className="border-t bg-muted/30 px-6 py-8 sm:px-12">
                <div className="grid gap-4 sm:grid-cols-3">
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <div
                        key={benefit.title}
                        className="rounded-2xl border bg-background/70 p-5 transition-colors hover:bg-background"
                      >
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold">
                          {benefit.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-6 sm:flex-row sm:px-12">
                <p className="text-center text-xs text-muted-foreground sm:text-left">
                  We&apos;ll notify you once your application has been reviewed.
                </p>

                <div className="flex w-full gap-3 sm:w-auto">
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Link href="/">Back to home</Link>
                  </Button>

                  <Button variant="link" className="border border-border p-0">
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      Go to login
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Your information is securely protected.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
