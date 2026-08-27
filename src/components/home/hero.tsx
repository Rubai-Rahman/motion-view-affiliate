'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Check, Play, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MagneticButton, ease, reveal } from './motion-primitives';
import { HeroDashboard } from './hero-dashboard';
import { useLenisScrollTo } from '@/components/provider/smoothScroll';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollTo = useLenisScrollTo();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const glowX = useTransform(smoothX, (v) => v - 300);
  const glowY = useTransform(smoothY, (v) => v - 300);

  return (
    <section
      ref={heroRef}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Mouse-tracking glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-0 top-0 size-150 rounded-full bg-secondary/6 blur-[140px]"
      />

      {/* Static ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-[-62.5] size-200 -translate-x-1/2 rounded-full bg-secondary/8 blur-[180px]"
      />
      <div className="absolute right-[-25] bottom-[-25] size-100 rounded-full bg-blue-500/4 blur-[120px]" />

      {/* Animated dot grid */}
      <motion.div
        animate={{ backgroundPosition: ['0px 0px', '48px 48px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, primary-foreground 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto grid max-w-350 items-center gap-16 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:pb-36 lg:pt-36">
        {/* Copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
        >
          {/* Badge */}
          <motion.div
            variants={reveal}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 backdrop-blur-xl"
          >
            <motion.span
              animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="flex size-5 items-center justify-center rounded-full bg-secondary"
            >
              <Sparkles className="size-3 text-white" />
            </motion.span>
            <span className="text-[11px] font-medium text-slate-400">
              Motion View Affiliate Program
            </span>
            <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[9px] font-semibold text-secondary">
              New
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={reveal}
            className="mt-8 text-[52px] font-semibold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-6xl lg:text-[80px]"
          >
            আপনার Audience
            <br />
            থেকেই{' '}
            <span className="relative inline-block">
              <motion.span
                className="text-secondary"
                animate={{
                  textShadow: [
                    '0 0 0px oklch(0.72 0.16 65 / 0)',
                    '0 0 40px oklch(0.72 0.16 65 / 0.35)',
                    '0 0 0px oklch(0.72 0.16 65 / 0)',
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                আয় করুন।
              </motion.span>
              {/* Underline squiggle */}
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease }}
                viewBox="0 0 320 12"
                className="absolute -bottom-2 left-0 w-full"
                fill="none"
              >
                <motion.path
                  d="M2 8 C60 2 120 11 180 5 C240 -1 290 9 318 4"
                  stroke="var(--secondary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.1, duration: 0.9, ease }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-5 text-lg font-medium text-secondary"
          >
            আপনার পছন্দের পণ্য share করুন, প্রতিটি successful order থেকে
            commission আয় করুন।
          </motion.p>

          <motion.p
            variants={reveal}
            className="mt-3 text-base leading-[1.75] text-muted-foreground"
          >
            Motion View-এর smart gadgets, electronics ও lifestyle products আপনার
            audience-এর সাথে share করুন এবং সবকিছু এক dashboard থেকে track করুন।
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={reveal}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <MagneticButton
              size="lg"
              className="h-12 bg-secondary px-7 text-secondary-foreground shadow-2xl shadow-secondary/25 hover:bg-secondary"
              onClick={() => {
                window.location.href = '/auth/signup';
              }}
            >
              Affiliate হিসেবে শুরু করুন
              <ArrowRight className="size-4" />
            </MagneticButton>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  scrollTo('#how-it-works');
                }}
                className="group h-12 border-border bg-white/3 px-7 text-foreground/40 backdrop-blur-xl hover:bg-muted hover:text-foreground"
              >
                <motion.span
                  className="flex size-7 items-center justify-center rounded-full border border-white/15 bg-white/4 mr-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="size-3 fill-current ml-0.5" />
                </motion.span>
                কীভাবে কাজ করে দেখুন
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            variants={reveal}
            className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
          >
            {[
              'Join করা free',
              'প্রতিটি click track করুন',
              'Creators-এর জন্য তৈরি',
            ].map((item, i) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                className="flex items-center gap-1.5 text-[11px] text-slate-600"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1 + i * 0.15,
                    type: 'spring',
                    stiffness: 400,
                  }}
                  className="flex size-4 items-center justify-center rounded-full bg-secondary/15"
                >
                  <Check className="size-2.5 text-secondary" />
                </motion.span>
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
        >
          <HeroDashboard />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-b from-transparent to-background" />
      <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
