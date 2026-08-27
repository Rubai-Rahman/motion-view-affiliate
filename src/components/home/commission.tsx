'use client';

import { motion } from 'motion/react';
import {
  Check,
  ChevronRight,
  CircleDollarSign,
  Link2,
  Package,
  ShoppingBag,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { ease, Reveal, SectionHeading } from './motion-primitives';

const flow = [
  {
    number: '01',
    title: 'আপনার কনটেন্ট',
    description: 'একটি helpful recommendation তৈরি করুন।',
    icon: Sparkles,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    number: '02',
    title: 'Affiliate Link',
    description: 'এক click-এ trackable link তৈরি করুন।',
    icon: Link2,
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    number: '03',
    title: 'Motion View পণ্য',
    description: 'Audience-কে সঠিক পণ্যের সাথে যুক্ত করুন।',
    icon: Package,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    number: '04',
    title: 'সফল অর্ডার',
    description: 'প্রতিটি qualifying order dashboard-এ দেখুন।',
    icon: ShoppingBag,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    number: '05',
    title: 'আপনার কমিশন',
    description: 'স্বচ্ছভাবে earnings track ও manage করুন।',
    icon: Wallet,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
] as const;

export function CommissionSection() {
  return (
    <section
      id="commission"
      className="bg-secondary-background relative overflow-hidden py-28 sm:py-32 lg:py-40"
    >
      {/* Accent decoration */}
      <div className="absolute -left-40 top-1/2 size-[400px] -translate-y-1/2 rounded-full bg-secondary/5 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Commission journey"
              title="আপনার audience কিনলেই আপনার আয়।"
              bangla="একটি সহজ flow, সম্পূর্ণ স্বচ্ছতা।"
              description="আপনার content থেকে শুরু করে successful order পর্যন্ত প্রতিটি গুরুত্বপূর্ণ ধাপ এক জায়গায় track করুন।"
            />

            {/* Example commission card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="mt-10 rounded-2xl border border-secondary/20 bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">
                  Example commission
                </p>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                  +৳349
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {[
                  ['Product', 'Smart Watch Pro'],
                  ['Order value', '৳4,990'],
                  ['Commission rate', '7%'],
                  ['Your earning', '৳349'],
                ].map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground">{key}</span>
                    <span className="font-medium text-foreground">{val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary-background p-3">
                <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Check className="size-3.5 text-emerald-600" />
                </div>
                <p className="text-xs text-muted">
                  Sample transaction tracked successfully
                </p>
              </div>
            </motion.div>
          </div>

          {/* Flow steps */}
          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-5 top-5 bottom-5 w-px overflow-hidden sm:left-[26px]">
              <div className="h-full bg-border" />
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.3, ease }}
                className="absolute inset-0 origin-top bg-bg-linear-to-b from-secondary to-secondary/20"
              />
            </div>

            <div className="space-y-3">
              {flow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.number} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="group relative flex items-start gap-5 rounded-2xl border border-border bg-card p-5 pl-16 transition-colors hover:border-secondary/20 sm:p-6 sm:pl-20"
                    >
                      {/* Icon sitting on the connector */}
                      <div
                        className={`absolute left-2.5 top-1/2 -translate-y-1/2 flex size-[42px] items-center justify-center rounded-xl border border-border bg-card transition-colors group-hover:border-secondary/20 sm:left-3.5 ${step.bg}`}
                      >
                        <Icon className={`size-4 ${step.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-secondary">
                              {step.number}
                            </p>
                            <h3 className="mt-0.5 font-semibold text-secondary">
                              {step.title}
                            </h3>
                            <p className="mt-1 text-sm text-foreground">
                              {step.description}
                            </p>
                          </div>
                          <ChevronRight className="mt-1 size-4 shrink-0 text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
