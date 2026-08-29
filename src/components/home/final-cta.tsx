'use client';

import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ease, MagneticButton } from './motion-primitives';
import { useLenisScrollTo } from '@/components/provider/smoothScroll';

export function FinalCTA() {
  const scrollTo = useLenisScrollTo();
  return (
    <section className="relative overflow-hidden bg-background py-28 sm:py-32 lg:py-40">
      {/* Ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-40 -top-40 size-175 rounded-full bg-secondary/15 blur-[160px]"
      />
      <div className="absolute -left-20 -bottom-25 size-100 rounded-full bg-violet-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-350 px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-white/2.5 backdrop-blur-2xl">
          {/* Inner glow border */}
          <div className="absolute inset-0 rounded-[32px] bg-bg-linear-to-br from-white/4 via-transparent to-secondary/4" />

          {/* Giant background letter */}
          <div
            className="pointer-events-none absolute -right-4 -top-16 select-none text-[280px] font-black leading-none text-white/[0.015]"
            aria-hidden
          >
            M
          </div>

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:p-16">
            {/* Main copy */}
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ease }}
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary"
              >
                Your next revenue stream
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.9, ease }}
                className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-[62px] lg:leading-[0.97]"
              >
                আপনার content-এর value আছে।
                <br />
                <motion.span
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="text-secondary"
                >
                  এবার সেটিকে কাজে লাগান।
                </motion.span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, ease }}
                className="mt-5 text-base font-medium text-secondary"
              >
                আপনার content-এর value থেকে নতুন income stream তৈরি করুন।
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, ease }}
                className="mt-3 max-w-lg text-base leading-7 text-muted-foreground"
              >
                Motion View affiliate community-তে যোগ দিন এবং product
                recommendation-কে measurable income-এ পরিণত করুন।
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, ease }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <MagneticButton
                  size="lg"
                  onClick={() => {
                    window.location.href = '/auth/signup';
                  }}
                  className="h-12 bg-secondary px-7 text-secondary-foreground shadow-2xl shadow-secondary/25 hover:bg-secondary"
                >
                  Affiliate হিসেবে শুরু করুন
                  <ArrowRight className="size-4" />
                </MagneticButton>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      scrollTo('#faq');
                    }}
                    className="h-12 border bg-white/3 px-7 text-slate-500 hover:bg-white/7 hover:text-slate-900 hover:dark:text-slate-100"
                  >
                    আরও জানুন
                  </Button>
                </motion.div>
              </motion.div>
              {/* Trust micro-text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="mt-5 text-[11px] text-muted-foreground"
              >
                Free to join · No monthly fees · Withdraw anytime
              </motion.p>
            </div>

            {/* Side metrics */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease }}
              className="grid grid-cols-3 gap-3 lg:w-[320px] lg:grid-cols-1"
            >
              {[
                { value: '50K+', label: 'Customers', icon: '👥' },
                { value: '100K+', label: 'Orders delivered', icon: '📦' },
                { value: '4.8★', label: 'Customer rating', icon: '⭐' },
              ].map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[0.07] bg-white/4 p-5 backdrop-blur-xl"
                >
                  <span className="text-lg">{icon}</span>
                  <p className="mt-2 text-2xl font-semibold text-motion">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom accent strip */}
          <div className="h-px bg-bg-linear-to-r from-transparent via-secondary/30 to-transparent" />
          <div className="flex items-center justify-center gap-3 py-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-3.5 fill-current text-secondary/40"
              />
            ))}
            <span className="text-[10px] text-muted-foreground">
              Trusted by creators across Bangladesh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
