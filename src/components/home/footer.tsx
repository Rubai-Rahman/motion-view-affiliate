'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ease } from './motion-primitives';
import { useLenisScrollTo } from '@/components/provider/smoothScroll';

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
      ['Contact', '#contact'],
      ['Login', '/login'],
      ['Sign Up', '/signup'],
    ],
  },
  {
    heading: 'Legal',
    links: [
      ['Terms & Conditions', '/terms'],
      ['Privacy Policy', '/privacy'],
      ['Affiliate Terms', '/affiliate-terms'],
    ],
  },
];

export function Footer() {
  const scrollTo = useLenisScrollTo();

  const handleScrollLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) return;

    e.preventDefault();
    scrollTo(href);
  };

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
                  Affiliate
                </p>
              </div>
            </motion.div>

            <p className="mt-6 max-w-65 text-sm leading-[1.75] text-muted-foreground">
              Promote products you love. Earn from qualifying sales. Track
              everything in one place.
            </p>

            {/* Status */}
            <div className="mt-6 flex items-center gap-2">
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
            <p>Motion View Affiliate Program</p>

            <span className="size-1 rounded-full bg-muted-foreground" />

            <p>Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
