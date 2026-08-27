'use client';

import { motion } from 'motion/react';
import {
  BarChart3,
  CircleDollarSign,
  Link2,
  Package,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';
import { cardReveal, ease, SectionHeading, Stagger } from './motion-primitives';

const benefits = [
  {
    icon: CircleDollarSign,
    title: 'Competitive commissions',
    bangla: 'আকর্ষণীয় কমিশন',
    description: 'প্রতিটি qualifying sale থেকে সর্বোচ্চ commission rate পান।',
  },
  {
    icon: BarChart3,
    title: 'Real-time analytics',
    bangla: 'রিয়েল-টাইম analytics',
    description: 'Clicks, conversions ও revenue — সবকিছু live dashboard-এ।',
  },
  {
    icon: Link2,
    title: 'Easy link generation',
    bangla: 'সহজে link তৈরি',
    description: 'এক click-এ shareable affiliate link তৈরি করুন।',
  },
  {
    icon: Package,
    title: 'Wide product selection',
    bangla: 'বিভিন্ন ধরনের পণ্য',
    description: 'Gadgets, audio, smart home — growing catalog থেকে বেছে নিন।',
  },
  {
    icon: TrendingUp,
    title: 'Transparent earnings',
    bangla: 'স্বচ্ছ earning',
    description: 'আপনার প্রতিটি commission সম্পূর্ণ স্বচ্ছভাবে track করা হয়।',
  },
  {
    icon: Wallet,
    title: 'Easy withdrawals',
    bangla: 'সহজ withdrawal',
    description: 'নির্ধারিত threshold পূরণ হলে সহজেই earnings withdraw করুন।',
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="landing-light relative overflow-hidden bg-secondary-background py-28 sm:py-32 lg:py-40"
    >
      {/* Accent blob */}
      <div className="absolute -right-40 top-1/2 size-[500px] -translate-y-1/2 rounded-full bg-secondary/6 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-20 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
          {/* Left column — heading + highlight */}
          <div className="sticky top-28">
            <SectionHeading
              eyebrow="কেন Motion View"
              title="আপনার audience-এর বিশ্বাসকে আয়ে পরিণত করুন।"
              bangla="আপনার recommendation-ই হতে পারে পরবর্তী income stream।"
              description="পণ্য খুঁজে নেওয়া, link তৈরি, performance বোঝা এবং earnings manage করার জন্য প্রয়োজনীয় সব tool এক জায়গায়।"
            />

            {/* Feature callout card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="mt-10 overflow-hidden rounded-2xl border border-secondary bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                  <Zap className="size-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-landing-ink">
                    আপনার workflow-এর জন্য তৈরি
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    আপনার content workflow-এর সাথে সহজেই মানিয়ে যায়।
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {[
                  'Dashboard access',
                  'Link tracking',
                  'Commission reports',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, ease }}
                    className="flex items-center gap-2.5 text-sm text-muted"
                  >
                    <span className="size-1.5 rounded-full bg-" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — benefit grid */}
          <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={cardReveal}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 12px 40px -8px oklch(0.72 0.16 65 / 0.12)',
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="group relative overflow-hidden rounded-2xl border border-secondary bg-card p-7 transition-colors hover:border-secondary/20"
                >
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 0%, oklch(0.72 0.16 65 / 0.06), transparent 60%)',
                    }}
                  />

                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 15,
                      }}
                      className="flex size-11 items-center justify-center rounded-2xl border border-secondary bg-secondary-background shadow-sm transition-colors group-hover:border-secondary/20 group-hover:bg-secondary/5"
                    >
                      <Icon className="size-5 text-secondary" />
                    </motion.div>

                    <h3 className="mt-5 font-semibold text-secondary">
                      {b.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-secondary">
                      {b.bangla}
                    </p>
                    <p className="mt-2.5 text-sm leading-6 text-muted">
                      {b.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
