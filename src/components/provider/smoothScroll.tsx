'use client';

import Lenis from 'lenis';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

const LenisContext = createContext<Lenis | null>(null);

/**
 * Returns the live Lenis instance.
 * Call inside any client component that is a descendant of SmoothScroll.
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Returns a scrollTo helper that uses Lenis for buttery smooth scrolling
 * to any CSS selector WITHOUT pushing a hash into the URL.
 *
 * @example
 *   const scrollTo = useLenisScrollTo();
 *   <button onClick={() => scrollTo('#how-it-works')}>…</button>
 */
export function useLenisScrollTo() {
  const lenis = useLenis();

  return (selector: string, offset = -80) => {
    const target = document.querySelector<HTMLElement>(selector);
    if (!target) return;

    if (lenis) {
      // HTMLElement overload — no URL hash change
      lenis.scrollTo(target, { offset, duration: 1.6 });
    } else {
      // Graceful fallback when Lenis hasn't initialised yet
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.7,
      smoothWheel: true,
      syncTouch: true,
    });

    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
