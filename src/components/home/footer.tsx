'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
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
    heading: 'Affiliate',
    links: [
      ['Register as Affiliate', '/auth/signup'],
      ['Affiliate Login', '/auth/login'],
      ['FAQ', '#faq'],
      ['Terms & Conditions', '/dashboard/terms'],
    ],
  },
  {
    heading: 'Motion View',
    links: [
      ['Shop Products', 'https://motionview.com.bd'],
      ['Product Categories', 'https://motionview.com.bd/category'],
      ['Contact & Support', 'https://motionview.com.bd/contact'],
      ['Privacy Policy', 'https://motionview.com.bd/privacy-policy'],
    ],
  },
];

export function Footer() {
  const handleScrollLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isExternal = (href: string) =>
    href.startsWith('http') || href.startsWith('https');

  return (
    <footer className="relative bg-background text-muted">
      {/* Top glow line */}
      <div className="h-px bg-linear-to-r from-transparent via-muted/20 to-transparent" />

      <div className="mx-auto max-w-350 px-5 sm:px-8">
        <div className="grid gap-14 py-16 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="flex size-10 items-center justify-center rounded-[11px] bg-secondary text-base font-black text-secondary-foreground shadow-lg shadow-secondary/20">
                M
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Motion View
                </p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  Affiliate Program
                </p>
              </div>
            </motion.div>

            <p className="mt-6 max-w-65 text-sm leading-[1.75] text-muted-foreground">
              Promote smart gadgets, electronics, and eco products. Earn commission from qualifying sales.
              Track everything from one dashboard.
            </p>

            {/* motionview.com.bd link */}
            <a
              href="https://motionview.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-1.5 text-xs text-secondary hover:underline"
            >
              motionview.com.bd
              <ArrowUpRight className="size-3" />
            </a>

            {/* Status */}
            <div className="mt-5 flex items-center gap-2">
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="size-2 rounded-full bg-emerald-500"
              />
              <span className="text-[11px] text-muted-foreground">
                All systems operational
              </span>
            </div>
          </div>

          {/* Navigation columns */}
          {columns.map((col, ci) => (
            <div key={col.heading}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                {col.heading}
              </p>

              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href], i) => {
                  const isAnchor = href.startsWith('#');
                  const isExt = isExternal(href);

                  return (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: ci * 0.05 + i * 0.04,
                        ease,
                      }}
                    >
                      {isAnchor ? (
                        <a
                          href={href}
                          onClick={(e) => handleScrollLink(e, href)}
                          className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {label}
                          <ArrowUpRight className="size-3 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all group-hover:opacity-100" />
                        </a>
                      ) : isExt ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {label}
                          <ArrowUpRight className="size-3 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all group-hover:opacity-100" />
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {label}
                          <ArrowUpRight className="size-3 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all group-hover:opacity-100" />
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/6" />

        <div className="flex flex-col gap-2 py-7 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Motion View. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://motionview.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              motionview.com.bd
            </a>
            <span className="size-1 rounded-full bg-muted-foreground" />
            <p>Affiliate Program · Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
