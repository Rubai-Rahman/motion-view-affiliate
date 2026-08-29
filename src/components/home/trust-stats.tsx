'use client';

import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { cardReveal, ease, Stagger } from './motion-primitives';

const stats = [
  {
    value: 50000,
    display: '50K+',
    label: 'সন্তুষ্ট ক্রেতা',
    sub: 'Motion View-এর সাথে',
    suffix: '+',
  },
  {
    value: 100000,
    display: '100K+',
    label: 'সফল ডেলিভারি',
    sub: 'বিশ্বাসের সাথে',
    suffix: '+',
  },
  {
    value: 10,
    display: '10+',
    label: 'অফিশিয়াল ব্র্যান্ড',
    sub: 'নির্বাচিত পণ্য',
    suffix: '+',
  },
  {
    value: 4.8,
    display: '4.8',
    label: 'ক্রেতা রেটিং',
    sub: 'অভিজ্ঞতার স্কোর',
    suffix: '★',
  },
];

function AnimatedNumber({
  value,
  isFloat,
}: {
  value: number;
  isFloat?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 });
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = isFloat
          ? latest.toFixed(1)
          : Math.floor(latest).toLocaleString();
      }
    });
  }, [spring, isFloat]);

  return <span ref={ref}>0</span>;
}

export function TrustStats() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle top shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary-background to-transparent" />

      <Stagger className="relative mx-auto grid max-w-350 grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 shadow-sm bg-background">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={cardReveal}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="group relative px-6 py-10 first:pl-0 last:pr-0 sm:px-10"
          >
            {/* Vertical divider (not on last) */}
            {i < stats.length - 1 && (
              <div className="absolute right-0 top-1/4 h-1/2 w-px bg-border dark:bg-white/6" />
            )}

            {/* Accent bar that grows in */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 28 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease }}
              className="mb-5 h-0.5 rounded-full bg-secondary"
            />

            <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              <AnimatedNumber
                value={stat.value}
                isFloat={!Number.isInteger(stat.value)}
              />
              <span className="text-secondary">{stat.suffix}</span>
            </p>

            <p className="mt-2 text-sm font-medium text-foreground/60">
              {stat.label}
            </p>
            <p className="mt-1 text-[11px] text-foreground/45">{stat.sub}</p>

            {/* Hover underline */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-secondary/50"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.35 }}
            />
          </motion.div>
        ))}
      </Stagger>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent dark:via-white/6" />
    </section>
  );
}
