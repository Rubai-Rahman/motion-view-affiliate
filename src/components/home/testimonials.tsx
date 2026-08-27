'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cardReveal, ease, SectionHeading, Stagger } from './motion-primitives';

const testimonials = [
  {
    initials: 'TC',
    name: 'Tech Creator',
    role: 'YouTube • Tech educator',
    quote:
      'The dashboard makes it easy to see which recommendations are actually converting. Everything is clear and the data is real.',
    stat: '32% conversion lift',
    color: 'from-violet-500/10 to-transparent',
    avatarBg: 'bg-violet-400/10 text-violet-400',
  },
  {
    initials: 'LC',
    name: 'Lifestyle Creator',
    role: 'Instagram • Lifestyle creator',
    quote:
      'I can share products that fit my audience and track every result in one calm workspace. No clutter, no guesswork.',
    stat: '৳48K+ earned',
    color: 'from-(--secondary)/10 to-transparent',
    avatarBg: 'bg-(--secondary)/10 text-(--secondary)',
  },
  {
    initials: 'CC',
    name: 'Content Creator',
    role: 'Facebook • Content creator',
    quote:
      'The link tools are simple enough to use between posts, while the numbers stay completely transparent at all times.',
    stat: '12K+ clicks tracked',
    color: 'from-emerald-500/10 to-transparent',
    avatarBg: 'bg-emerald-400/10 text-emerald-400',
  },
];

export function Testimonials() {
  return (
    <section className="background relative overflow-hidden bg--secondary-background py-28 sm:py-32 lg:py-40">
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.72_0.16_65_/_0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Creator stories"
          title="আপনার মতো creators-এর জন্য তৈরি।"
          bangla="আপনার content-ই আপনার সবচেয়ে বড় asset।"
          description="নিচের গল্পগুলো example হিসেবে দেখানো হয়েছে; launch-এর আগে verified affiliate feedback দিয়ে replace করুন।"
          centered
        />

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <motion.div
              key={item.name}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              className="group relative overflow-hidden rounded-2xl border border-(--border) bg-(--card) p-7 shadow-sm sm:p-8"
            >
              {/* Gradient blob on hover */}
              <div
                className={`absolute inset-0 bg-bg-linear-to-br ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative">
                {/* Quote icon */}
                <div className="flex items-center justify-between">
                  <Quote className="size-7 text-secondary/25 -scale-x-100" />
                  <Badge
                    variant="outline"
                    className="border-border text-[9px] font-normal text-muted"
                  >
                    Creator preview
                  </Badge>
                </div>

                {/* Quote text */}
                <p className="mt-5 text-[15px] leading-[1.8] text-muted-foreground">
                  "{item.quote}"
                </p>

                {/* Stat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, ease }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-secondary/8 px-3 py-1.5"
                >
                  <span className="size-1.5 rounded-full bg-secondary" />
                  <span className="text-xs font-semibold text-secondary">
                    {item.stat}
                  </span>
                </motion.div>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <Avatar className="size-10">
                    <AvatarFallback
                      className={`text-xs font-semibold ${item.avatarBg}`}
                    >
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, ease }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            '50,000+ customers',
            '100,000+ orders delivered',
            '4.8★ average rating',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-secondary" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
