'use client';

import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ease, Reveal, SectionHeading } from './motion-primitives';

const highlights = [
  {
    step: 'Join',
    description: 'Create a free affiliate account in minutes.',
    color: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
  },
  {
    step: 'Choose Products',
    description: 'Browse eligible gadgets and tech products.',
    color: 'bg-sky-400/10 text-sky-400 border-sky-400/20',
  },
  {
    step: 'Share Links',
    description: 'Promote through your content and channels.',
    color: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  },
  {
    step: 'Generate Sales',
    description: 'Help interested buyers discover the right products.',
    color: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  },
  {
    step: 'Earn Commission',
    description: 'Get paid from eligible qualifying purchases.',
    color: 'bg-secondary/10 text-secondary border-secondary/20',
  },
];

export function AboutProgram() {
  return (
    <section className="relative overflow-hidden bg-secondary-background py-24 sm:py-28 lg:py-36">
      {/* Ambient decoration */}
      <div className="absolute left-0 top-1/2 size-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-secondary/5 blur-[120px]" />
      <div className="absolute right-0 bottom-0 size-[300px] translate-x-1/3 translate-y-1/3 rounded-full bg-violet-500/4 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left — description */}
          <div>
            <SectionHeading
              eyebrow="About the program"
              title="What is the Motion View Affiliate Program?"
              description="The Motion View Affiliate Program is an affiliate marketing opportunity that allows approved affiliates to promote eligible Motion View products and earn commission from qualifying purchases."
            />

            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-[1.8] text-muted-foreground">
                After joining the program, affiliates use their unique affiliate
                links to recommend products to their audience. A successful
                qualifying purchase through an eligible affiliate referral
                generates commission according to the program&apos;s current
                terms.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-4 text-base leading-[1.8] text-muted-foreground">
                You do not need to manage products, maintain inventory, process
                orders, or handle delivery. Your role focuses entirely on
                promotion. Share products with the right audience and turn your
                content into an additional income opportunity.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/20 transition-opacity hover:opacity-90"
                >
                  Join the Program
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="https://motionview.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Explore Products
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — flow visualization */}
          <div className="space-y-3">
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                The simple concept
              </p>
            </Reveal>

            {highlights.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-secondary/20 hover:shadow-md hover:shadow-secondary/5"
              >
                {/* Step number dot */}
                <div className="relative shrink-0">
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl border text-xs font-bold ${item.color}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < highlights.length - 1 && (
                    <div className="absolute left-1/2 top-full mt-1 h-3 w-px -translate-x-1/2 bg-border" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{item.step}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                {i < highlights.length - 1 && (
                  <ArrowRight className="size-4 shrink-0 text-border opacity-0 transition-opacity group-hover:opacity-100" />
                )}
                {i === highlights.length - 1 && (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="size-2 shrink-0 rounded-full bg-secondary"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
