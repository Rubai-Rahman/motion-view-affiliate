'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ease } from './motion-primitives';

const columns = [
  {
    heading: 'Platform',
    links: [
      ['How It Works', '#how-it-works'],
      ['Benefits', '#benefits'],
      ['Analytics', '#analytics'],
      ['Commission', '#commission'],
    ],
  },
  {
    heading: 'Support',
    links: [
      ['FAQ', '#faq'],
      ['Contact', '#'],
      ['Login', '/auth/login'],
      ['Sign Up', '/auth/signup'],
    ],
  },
  {
    heading: 'Legal',
    links: [
      ['Terms & Conditions', '#'],
      ['Privacy Policy', '#'],
      ['Affiliate Terms', '#'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-(--hero-background) text-(--hero-muted)">
      {/* Top glow line */}
      <div className="h-px bg-bg-linear-to-r from-transparent via-(--landing-accent)/20 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 py-16 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="flex size-10 items-center justify-center rounded-[11px] bg-(--landing-accent) font-black text-base text-(--landing-accent-foreground) shadow-lg shadow-(--landing-accent)/20">
                M
              </div>
              <div>
                <p className="text-sm font-semibold text-(--hero-foreground)">Motion View</p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-700">Affiliate</p>
              </div>
            </motion.div>

            <p className="mt-6 max-w-[260px] text-sm leading-[1.75] text-slate-600">
              Promote products you love. Earn from qualifying sales. Track everything in one place.
            </p>

            {/* Status dot */}
            <div className="mt-6 flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="size-2 rounded-full bg-emerald-500"
              />
              <span className="text-[11px] text-slate-600">All systems operational</span>
            </div>
          </div>

          {/* Navigation columns */}
          {columns.map((col, ci) => (
            <div key={col.heading}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-(--hero-foreground)">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href], i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + i * 0.04, ease }}
                  >
                    <a
                      href={href}
                      className="group flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-white"
                    >
                      {label}
                      <ArrowUpRight className="size-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/[0.06]" />

        <div className="flex flex-col gap-2 py-7 text-[11px] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Motion View. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Motion View Affiliate Program</p>
            <span className="size-1 rounded-full bg-slate-700" />
            <p>Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
