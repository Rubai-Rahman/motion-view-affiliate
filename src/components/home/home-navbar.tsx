'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { ease } from './motion-primitives';
import { ModeToggle } from '../common/theme-toggle';
import { useLenis, useLenisScrollTo } from '@/components/provider/smoothScroll';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const links: { label: string; target: string }[] = [
  { label: 'How It Works', target: '#how-it-works' },
  { label: 'Benefits', target: '#benefits' },
  { label: 'Analytics', target: '#analytics' },
  { label: 'Commission', target: '#commission' },
  { label: 'FAQ', target: '#faq' },
];

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export function HomeNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = useLenisScrollTo();
  const lenis = useLenis();

  const scrollY = useMotionValue(0);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll }: { scroll: number }) => {
      scrollY.set(scroll);
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, scrollY]);

  /* Spring-smoothed navbar transitions */
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 120,
    damping: 24,
  });

  const bgOpacity = useTransform(scrollYSpring, [0, 100], [0, 1]);

  const borderOpacity = useTransform(scrollYSpring, [0, 100], [0, 0.12]);

  /* ---------------------------------------------------------------------- */
  /* Smooth section navigation without hash                                  */
  /* ---------------------------------------------------------------------- */

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    e.preventDefault();

    setMobileOpen(false);

    scrollTo(target);
  };

  /* ---------------------------------------------------------------------- */
  /* Logo click                                                              */
  /* ---------------------------------------------------------------------- */

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.6,
      });
    }
  };

  return (
    <motion.header className="fixed left-0 top-0 z-50 w-full">
      {/* Scroll-driven backdrop */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-(--background)/90 backdrop-blur-2xl"
      />

      {/* Scroll-driven border */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-(--hero-foreground)"
      />

      <div className="relative mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Logo                                                              */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 15,
              }}
              className="relative flex size-9 items-center justify-center rounded-[11px] bg-(--landing-accent) font-black text-(--landing-accent-foreground) shadow-lg shadow-(--landing-accent)/30"
            >
              M{/* Pulse ring */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-[11px] bg-(--landing-accent)"
              />
            </motion.div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-(--hero-foreground)">
                Motion View
              </p>

              <p className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-slate-500">
                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="size-1.5 rounded-full bg-emerald-500"
                />
                Affiliate platform
              </p>
            </div>
          </Link>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop navigation                                                */}
        {/* ---------------------------------------------------------------- */}

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease,
          }}
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map(({ label, target }, i) => (
            <motion.a
              key={label}
              href={target}
              onClick={(e) => handleNavClick(e, target)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + i * 0.05,
                ease,
              }}
              whileHover={{ y: -2 }}
              className="group relative text-sm text-(--hero-muted) transition-colors hover:text-(--hero-foreground)"
            >
              {label}

              <motion.span
                className="absolute -bottom-1 left-0 h-px w-full origin-left bg-(--landing-accent)"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </motion.nav>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop actions                                                   */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease,
          }}
          className="hidden items-center gap-2 sm:flex"
        >
          <ModeToggle />

          <Link
            href="/login"
            className={cn(
              buttonVariants({
                variant: 'ghost',
              }),
              'text-sm text-(--hero-muted) hover:bg-white/5 hover:text-(--hero-foreground)',
            )}
          >
            Login
          </Link>

          <Link
            className="flex h-9 items-center gap-2 rounded bg-primary px-5 text-sm text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/30"
            href="/signup"
          >
            Become an Affiliate
            <ArrowRight className="size-3.5" />
          </Link>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile hamburger                                                  */}
        {/* ---------------------------------------------------------------- */}

        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="relative flex size-10 items-center justify-center rounded-xl border border-(--hero-line) text-(--hero-muted) lg:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{
                  rotate: -90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{
                  rotate: 90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: -90,
                  opacity: 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="size-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile drawer                                                       */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
            className="relative overflow-hidden border-t border-(--hero-line) bg-(--background)/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="space-y-1 p-4">
              {links.map(({ label, target }, i) => (
                <motion.a
                  key={label}
                  href={target}
                  onClick={(e) => handleNavClick(e, target)}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: i * 0.05,
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-(--hero-muted) hover:bg-white/5 hover:text-(--hero-foreground)"
                >
                  <span className="size-1 rounded-full bg-(--landing-accent)" />

                  {label}
                </motion.a>
              ))}

              <div className="mt-3 flex gap-2 border-t border-(--hero-line) px-4 pt-3">
                <Link
                  className="flex-1 border-(--hero-line) bg-transparent text-(--hero-muted)"
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>

                <Link
                  className="flex-1 bg-(--landing-accent) text-(--landing-accent-foreground)"
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
