'use client';

import { motion } from 'motion/react';
import {
  BookOpen,
  BoxIcon,
  Globe,
  Monitor,
  Rss,
  Search,
  Smartphone,
  TrendingUp,
  Users,
  Video,
  Wifi,
  Zap,
} from 'lucide-react';
import { ease, SectionHeading } from './motion-primitives';

const profiles = [
  { label: 'Blogger or niche website owner', icon: Globe },
  { label: 'YouTube creator', icon: BoxIcon },
  { label: 'Facebook page or group owner', icon: Users },
  { label: 'TikTok content creator', icon: Smartphone },
  { label: 'Tech reviewer', icon: Monitor },
  { label: 'Social media influencer', icon: Rss },
  { label: 'Digital marketer', icon: TrendingUp },
  { label: 'SEO professional', icon: Search },
  { label: 'Deal and offer publisher', icon: Zap },
  { label: 'Gadget enthusiast', icon: Wifi },
  { label: 'Online community admin', icon: BookOpen },
  { label: 'Video content creator', icon: Video },
];

const highlights = [
  {
    title: 'No massive following required',
    description:
      'Audience relevance and trust can matter more than follower count. A smaller, tech-focused audience with strong engagement often outperforms a large but unrelated one.',
    accent: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    title: 'No inventory or logistics',
    description:
      'You focus entirely on promotion. Motion View handles the products, orders, payments, and delivery — all you need to do is recommend and share.',
    accent: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    title: 'Work from anywhere',
    description:
      'Manage your affiliate promotion entirely online. A website helps, but any permitted digital channel — social media, YouTube, communities — works too.',
    accent: 'text-secondary',
    bg: 'bg-secondary/10',
  },
];

export function WhoCanJoin() {
  return (
    <section className="relative overflow-hidden bg-background py-28 sm:py-32 lg:py-40">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.72_0.16_65_/_0.05),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Heading */}
        <SectionHeading
          eyebrow="Who can join"
          title="Built for every type of digital creator."
          description="Motion View Affiliate can suit different types of digital publishers and promoters across Bangladesh — from bloggers and YouTubers to marketers and gadget communities."
          centered
        />

        {/* Profile grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {profiles.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <motion.div
                key={profile.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, ease }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-secondary/25 hover:shadow-md hover:shadow-secondary/5"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/8 transition-colors group-hover:bg-secondary/15">
                  <Icon className="size-4 text-secondary" />
                </div>
                <p className="text-sm font-medium text-foreground leading-tight">
                  {profile.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.2, ease }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-7"
            >
              {/* Accent blob */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full blur-2xl"
                style={{ background: `oklch(0.72 0.16 65 / 0.07)` }}
              />
              <div
                className={`mb-4 flex size-10 items-center justify-center rounded-xl ${h.bg}`}
              >
                <Zap className={`size-4 ${h.accent}`} />
              </div>
              <h3 className="font-semibold text-foreground">{h.title}</h3>
              <p className="mt-2 text-sm leading-[1.75] text-muted-foreground">
                {h.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, ease }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-base text-muted-foreground max-w-lg">
            Ready to explore the Motion View Affiliate Program? Create your
            account, discover eligible products, and start building your
            affiliate journey.
          </p>
          <a
            href="/auth/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/20 transition-opacity hover:opacity-90"
          >
            Join Motion View Affiliate
          </a>
        </motion.div>
      </div>
    </section>
  );
}
