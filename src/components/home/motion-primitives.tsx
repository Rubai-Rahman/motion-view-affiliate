'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { Button } from '@/components/ui/button';

/* -------------------------------------------------------------------------- */
/* EASING                                                                     */
/* -------------------------------------------------------------------------- */

export const ease = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/* VARIANTS                                                                   */
/* -------------------------------------------------------------------------- */

export const reveal = {
  hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease },
  },
};

export const revealUp = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

export const revealLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease },
  },
};

export const revealRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease },
  },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease },
  },
};

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  size,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Button size={size} className={className} onClick={onClick}>
        {children}
      </Button>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION HEADING                                                            */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  bangla,
  description,
  light = false,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  bangla?: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: centered ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-secondary" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </span>
        {centered && <span className="h-px w-8 bg-secondary" />}
      </motion.div>

      <motion.h2
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-[56px] lg:leading-[1.02] ${
          light ? 'text-(--hero-foreground)' : 'text-landing-ink'
        }`}
      >
        {title}
      </motion.h2>

      {bangla && (
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base font-medium text-secondary"
        >
          {bangla}
        </motion.p>
      )}

      {description && (
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`mt-4 max-w-2xl text-base leading-7 sm:text-lg ${
            light ? 'text-(--hero-muted)' : 'text-landing-muted'
          } ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* GLOW DIVIDER                                                               */
/* -------------------------------------------------------------------------- */

export function GlowDivider() {
  return (
    <div className="relative h-px overflow-visible">
      <div className="absolute inset-x-0 h-px bg-bg-linear-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />
      <motion.div
        animate={{ x: ['-10%', '110%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 size-24 -translate-y-1/2 rounded-full bg-secondary/30 blur-xl"
      />
    </div>
  );
}
