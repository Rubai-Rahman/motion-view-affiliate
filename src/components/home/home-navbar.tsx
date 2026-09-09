'use client';

import { AnimatePresence, motion, useTransform, useScroll } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { ease } from './motion-primitives';
import { ModeToggle } from '../common/theme-toggle';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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

  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.12]);

  /* ---------------------------------------------------------------------- */
  /* Smooth section navigation without hash                                  */
  /* ---------------------------------------------------------------------- */

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    e.preventDefault();

    setMobileOpen(false);

    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Logo click                                                              */
  /* ---------------------------------------------------------------------- */

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header className="fixed left-0 top-0 z-50 w-full">
      {/* Scroll-driven backdrop */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
      />

      {/* Scroll-driven border */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-foreground"
      />

      <div className="relative mx-auto flex h-18 items-center justify-between px-5 sm:px-8">
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
            <Image src="/images/logo.webp" alt="Logo" width={140} height={40} />
          </Link>
        </motion.div>

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
              className="group relative text-sm text-foreground transition-colors hover:text-primary"
            >
              {label}

              <motion.span
                className="absolute -bottom-1 left-0 h-px w-full origin-left bg-primary"
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
              'text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground',
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
          className="relative flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground lg:hidden"
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
            className="relative overflow-hidden border-t border-border bg-background/95 backdrop-blur-2xl lg:hidden"
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
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  <span className="size-1 rounded-full bg-secondary" />

                  {label}
                </motion.a>
              ))}

              <div className="mt-3 flex gap-2 border-t border-border px-4 pt-3">
                <Link
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'flex-1',
                  )}
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>

                <Link
                  className={cn(
                    buttonVariants({ variant: 'secondary' }),
                    'flex-1',
                  )}
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>

              <div className="flex items-center justify-between px-4 pt-3">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
