'use client';

import { motion } from 'motion/react';
import { BarChart3, CircleDollarSign, Link2, Users } from 'lucide-react';
import { cardReveal, ease, SectionHeading, Stagger } from './motion-primitives';

const steps = [
  {
    number: '01',
    title: 'অ্যাকাউন্ট তৈরি',
    bangla: 'শুরু করুন',
    description: 'একটি অ্যাকাউন্ট তৈরি করে affiliate dashboard-এ প্রবেশ করুন।',
    icon: Users,
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-400/10',
  },
  {
    number: '02',
    title: 'পণ্য বেছে নিন',
    bangla: 'সঠিক পণ্য খুঁজুন',
    description: 'Motion View-এর আপনার পছন্দের পণ্য খুঁজে নিন।',
    icon: Link2,
    color: 'from-sky-500/20 to-sky-500/5',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-400/10',
  },
  {
    number: '03',
    title: 'লিংক শেয়ার',
    bangla: 'Audience-এ পৌঁছান',
    description: 'Unique affiliate link আপনার audience-এর সাথে শেয়ার করুন।',
    icon: BarChart3,
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
  },
  {
    number: '04',
    title: 'কমিশন আয়',
    bangla: 'ফলাফল পান',
    description: 'সফল অর্ডার হলে আপনার commission automatically track হবে।',
    icon: CircleDollarSign,
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/10',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-background py-28 sm:py-32 lg:py-40"
    >
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-350 px-5 sm:px-8">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Creator journey"
            title="কনটেন্ট থেকে কমিশন"
            bangla="মাত্র চারটি সহজ ধাপে আপনার journey শুরু করুন"
            description="আপনার কাজের ধরন অনুযায়ী তৈরি একটি সহজ, স্বচ্ছ এবং সম্পূর্ণ affiliate experience।"
            light
          />

          {/* Decorative step counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="hidden shrink-0 items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 shadow-sm lg:flex"
          >
            <span className="text-2xl font-semibold text-foreground">4</span>
            <span className="text-sm text-foreground/60">simple steps</span>
          </motion.div>
        </div>

        {/* Connector line behind cards */}
        <div className="relative mt-16">
          <div className="absolute left-[11%] right-[11%] top-[44px] hidden h-px overflow-hidden lg:block">
            <div className="h-full bg-border dark:bg-white/[0.06]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.3, ease }}
              className="absolute inset-0 origin-left bg-linear-to-r from-secondary via-secondary/50 to-transparent"
            />
          </div>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={cardReveal}
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-secondary/30 hover:bg-card hover:shadow-lg hover:shadow-secondary/5">
                    {/* Gradient bg */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${step.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    />

                    <div className="relative">
                      {/* Icon with number */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          whileHover={{ rotate: 8, scale: 1.1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 15,
                          }}
                          className={`flex size-12 items-center justify-center rounded-2xl ${step.iconBg}`}
                        >
                          <Icon className={`size-5 ${step.iconColor}`} />
                        </motion.div>

                        <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-foreground/35">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p
                        className={`mt-0.5 text-xs font-medium ${step.iconColor}`}
                      >
                        {step.bangla}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-foreground/65">
                        {step.description}
                      </p>

                      {/* Bottom accent line */}
                      <motion.div
                        className={`mt-5 h-px origin-left ${step.iconBg} rounded-full`}
                        style={{
                          background: `var(--secondary)`,
                          opacity: 0.3,
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.12 + 0.4,
                          duration: 0.6,
                          ease,
                        }}
                      />
                    </div>
                  </div>

                  {/* Step dot on the connector line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.12 + 0.5,
                      type: 'spring',
                      stiffness: 400,
                    }}
                    className="absolute -top-11 left-1/2 hidden size-3 -translate-x-1/2 rounded-full border-2 border-secondary bg-background lg:block"
                  />
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
