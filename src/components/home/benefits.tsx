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
    sub: 'Earn from every qualifying sale',
    description:
      'Receive commission from eligible purchases made through your affiliate links, according to the current program terms.',
  },
  {
    icon: BarChart3,
    title: 'Real-time analytics',
    sub: 'Know what is working',
    description:
      'Track clicks, conversions, and revenue in your live affiliate dashboard — all in one transparent view.',
  },
  {
    icon: Link2,
    title: 'Easy link generation',
    sub: 'One click, shareable anywhere',
    description:
      'Generate unique tracking links for any eligible product instantly and share across all your permitted channels.',
  },
  {
    icon: Package,
    title: 'Wide product selection',
    sub: 'Gadgets, audio, smart home & more',
    description:
      'Choose from a growing catalog of Motion View products — smart gadgets, electronics, and eco products your audience will love.',
  },
  {
    icon: TrendingUp,
    title: 'Transparent earnings',
    sub: 'Full visibility, no surprises',
    description:
      'Every commission is tracked clearly against your affiliate activity so you always know where your earnings come from.',
  },
  {
    icon: Wallet,
    title: 'Easy withdrawals',
    sub: 'Your money, your timeline',
    description:
      'Once you meet the applicable threshold, withdraw your earnings through the available payment methods under program terms.',
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="bg-secondary-background relative overflow-hidden py-28 sm:py-32 lg:py-40"
    >
      {/* Accent blob */}
      <div className="absolute -right-40 top-1/2 size-[500px] -translate-y-1/2 rounded-full bg-secondary/6 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-20 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
          {/* Left column — heading + highlight */}
          <div className="sticky top-28">
            <SectionHeading
              eyebrow="Why Motion View Affiliate"
              title="Turn your audience apos;s trust into income."
              description="Everything you need to find products, generate links, understand your performance, and manage earnings — all in one place."
            />

            {/* Feature callout card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="mt-10 overflow-hidden rounded-2xl border border-secondary bg-secondary-background p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                  <Zap className="size-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Built for your workflow
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Fits seamlessly into your existing content process — no
                    operational overhead.
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
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-secondary" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — benefit grid */}
          <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
            {benefits.map((b) => {
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
                  className="group relative overflow-hidden rounded-2xl border border-border bg-secondary-background p-7 transition-colors hover:border-secondary/20 hover:bg-card/60"
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
                      className="flex size-11 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/8 shadow-sm transition-colors group-hover:border-secondary/40 group-hover:bg-secondary/12"
                    >
                      <Icon className="size-5 text-secondary" />
                    </motion.div>

                    <h3 className="mt-5 font-semibold text-foreground">
                      {b.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-secondary">
                      {b.sub}
                    </p>
                    <p className="mt-2.5 text-sm leading-6 text-foreground/65">
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
