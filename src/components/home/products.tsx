'use client';

import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  Copy,
  Link2,
  Search,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cardReveal, ease, SectionHeading, Stagger } from './motion-primitives';

const products = [
  {
    name: 'Smart Watch Pro',
    category: 'Wearables',
    price: '৳4,990',
    initials: 'SW',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    accent: 'text-violet-400',
    badge: 'Hot',
  },
  {
    name: 'Wireless Earbuds',
    category: 'Audio',
    price: '৳2,490',
    initials: 'EB',
    gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
    accent: 'text-sky-400',
    badge: 'New',
  },
  {
    name: 'Smart Home Hub',
    category: 'Smart Home',
    price: '৳6,990',
    initials: 'SH',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accent: 'text-emerald-400',
    badge: null,
  },
  {
    name: 'Gaming Controller',
    category: 'Gaming',
    price: '৳3,290',
    initials: 'GC',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accent: 'text-secondary',
    badge: 'Popular',
  },
];

export function Products() {
  return (
    <section className="background relative overflow-hidden bg-card py-28 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.16_65_/_0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Product marketplace"
            title="Share করার মতো পণ্য খুঁজে নিন।"
            bangla="আপনার audience-এর জন্য সঠিক product বেছে নিন।"
            description="Motion View-এর growing catalog থেকে এমন product খুঁজে নিন যা আপনার content-এর সাথে স্বাভাবিকভাবে মিলে যায়।"
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease }}
          >
            <Button
              variant="outline"
              className="w-fit border-border bg-secondary-background text-secondary-background-foreground border hover:border-border"
            >
              সব পণ্য দেখুন
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, ease }}
          className="mt-12 flex flex-col gap-2 sm:flex-row"
        >
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-border bg-card px-4 transition-colors focus-within:border-secondary/40">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Promote করার জন্য product খুঁজুন...
            </span>
          </div>
          <Button
            variant="outline"
            className="h-12 border-border bg-card text-secondary-background-foreground"
          >
            সব category
            <ChevronDown className="size-4" />
          </Button>
        </motion.div>

        {/* Product grid */}
        <Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-background/[0.07]"
            >
              {/* Product image area */}
              <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-secondary-background">
                {/* Gradient bg */}
                <div
                  className={`absolute inset-0 bg-bg-linear-to-br ${product.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Product initials mockup */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="relative flex size-24 items-center justify-center rounded-[24px] border border-border bg-card shadow-lg"
                >
                  <span className={`text-2xl font-bold ${product.accent}`}>
                    {product.initials}
                  </span>
                  <Sparkles
                    className={`absolute -top-2 -right-2 size-4 ${product.accent} opacity-0 transition-opacity group-hover:opacity-100`}
                  />
                </motion.div>

                {/* Top badges */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <Badge className="border-border bg-card/10 text-[10px] text-secondary-background-foreground backdrop-blur-lg">
                    {product.category}
                  </Badge>
                  {product.badge && (
                    <Badge className="border-border bg-secondary/90 text-[10px] text-accent-foreground">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                {/* Quick link button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-secondary"
                  aria-label={`Copy link for ${product.name}`}
                >
                  <Link2 className="size-4" />
                </motion.button>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="font-semibold tracking-tight text-secondary-background-foreground">
                  {product.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Promote করার জন্য প্রস্তুত
                </p>

                <Separator className="my-4 bg-border" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-semibold text-secondary-background-foreground">
                      {product.price}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Commission product অনুযায়ী
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    className="flex items-center gap-1.5 rounded-xl bg-secondary-background px-3.5 py-2 text-xs font-semibold text-secondary-background-foreground transition-colors hover:bg-secondary border border-border"
                  >
                    Link তৈরি করুন
                    <Copy className="size-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, ease }}
          className="mt-10 flex justify-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">10+ brands</span>, hundreds of
            products — more added regularly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
