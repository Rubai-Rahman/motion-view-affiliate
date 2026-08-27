'use client';

import { motion } from 'motion/react';
import {
  BarChart3,
  CircleDollarSign,
  Link2,
  Package,
  ShoppingBag,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ease } from './motion-primitives';

function MiniBar({ height, delay }: { height: number; delay: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay, duration: 0.6, ease }}
      style={{ height: `${height}%` }}
      className="w-full origin-bottom rounded-sm bg-secondary/60"
    />
  );
}

export function HeroDashboard() {
  const bars = [38, 55, 42, 70, 58, 85, 65, 90, 75, 100, 82, 95];

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ perspective: 1200 }}
      whileHover={{ scale: 1.015 }}
      className="relative"
    >
      {/* Floating card — top left */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
        className="absolute -left-6 top-12 z-30 hidden w-48 rounded-2xl border border-border bg-foreground/90 p-3.5 shadow-2xl backdrop-blur-xl sm:block lg:-left-10"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/15">
            <TrendingUp className="size-4 text-secondary" />
          </div>
          <div>
            <p className="text-[9px] text-slate-500">Today's revenue</p>
            <p className="mt-0.5 text-sm font-semibold text-white">+৳8,420</p>
          </div>
        </div>
        <div className="mt-3 flex items-end gap-1 h-8">
          {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
            <MiniBar key={i} height={h} delay={0.8 + i * 0.06} />
          ))}
        </div>
      </motion.div>

      {/* Floating card — bottom right */}
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -3, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
        className="absolute -right-6 bottom-12 z-30 hidden w-48 rounded-2xl border border-white/10 bg-[#0f1113]/90 p-3.5 shadow-2xl backdrop-blur-xl sm:block lg:-right-10"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
            <ShoppingBag className="size-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-[9px] text-slate-500">New orders</p>
            <p className="mt-0.5 text-sm font-semibold text-white">+24 today</p>
          </div>
        </div>
        <div className="mt-2 flex gap-1">
          {['৳349', '৳699', '৳249'].map((v) => (
            <span
              key={v}
              className="rounded-lg bg-emerald-400/10 px-2 py-1 text-[8px] text-emerald-400"
            >
              {v}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Main dashboard shell */}
      <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d0f10] shadow-[0_40px_100px_rgba(0,0,0,.6)]">
        {/* Browser chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#111315] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-red-500/60" />
              <div className="size-2.5 rounded-full bg-amber-400/60" />
              <div className="size-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="hidden h-6 w-48 rounded-md bg-white/[0.04] px-3 sm:flex items-center">
              <p className="text-[9px] text-slate-600">
                affiliate.motionview.com/dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-6 rounded-lg bg-white/[0.04]" />
            <div className="size-6 rounded-lg bg-white/[0.04]" />
          </div>
        </div>

        <div className="grid sm:grid-cols-[140px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-white/[0.05] bg-[#0a0c0d] p-3 sm:block">
            <div className="flex items-center gap-2 px-1 py-1">
              <div className="flex size-6 items-center justify-center rounded-lg bg-secondary text-[8px] font-black text-secondary-foreground">
                M
              </div>
              <p className="text-[10px] font-semibold text-white">Affiliate</p>
            </div>

            <p className="mt-5 px-1 text-[7px] uppercase tracking-widest text-slate-700">
              Main
            </p>

            <div className="mt-1.5 space-y-0.5">
              {(
                [
                  ['Overview', BarChart3, true],
                  ['Products', Package, false],
                  ['Links', Link2, false],
                  ['Earnings', Wallet, false],
                ] as const
              ).map(([label, Icon, active]) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[9px] transition-colors ${
                    active
                      ? 'bg-secondary/12 text-secondary'
                      : 'text-slate-600 hover:text-slate-400'
                  }`}
                >
                  <Icon className="size-3 shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/5 bg-white/2 p-2.5">
              <p className="text-[7px] text-slate-700">Available</p>
              <p className="mt-1 text-xs font-semibold text-white">৳24,680</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ delay: 1.2, duration: 0.8, ease }}
                  className="h-full rounded-full bg-secondary"
                />
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] text-slate-600">Monday, August 24</p>
                <h3 className="mt-0.5 text-sm font-semibold text-white">
                  Good afternoon, Creator.
                </h3>
              </div>
              <Badge className="border-emerald-400/10 bg-emerald-400/5 text-[8px] text-emerald-400 hover:bg-emerald-400/5">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mr-1 size-1 rounded-full bg-emerald-400 inline-block"
                />
                Live
              </Badge>
            </div>

            {/* Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {(
                [
                  ['৳48,250', 'Earnings', '+18.4%'],
                  ['12,840', 'Clicks', '+12.7%'],
                  ['186', 'Orders', '+9.2%'],
                  ['3.2%', 'Conv.', '+0.4%'],
                ] as const
              ).map(([value, label, change], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, ease }}
                  className="rounded-xl border border-white/5 bg-[#0a0c0d] p-2.5"
                >
                  <p className="text-[7px] text-slate-600">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[7px] text-emerald-400">{change}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="mt-3 rounded-xl border border-white/5 bg-[#0a0c0d] p-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-medium text-slate-400">Revenue</p>
                <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[7px] text-secondary">
                  ৳48,250
                </span>
              </div>
              <div className="mt-3 h-24 sm:h-28">
                <svg
                  viewBox="0 0 600 120"
                  className="size-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="dashRevenue"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--secondary)"
                        stopOpacity=".3"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--secondary)"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  {[25, 55, 85].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="600"
                      y1={y}
                      y2={y}
                      stroke="rgba(255,255,255,.04)"
                      strokeDasharray="3 5"
                    />
                  ))}
                  <path
                    d="M0 100 C50 96 70 80 110 87 C150 94 175 65 220 73 C265 82 295 52 335 60 C375 70 405 42 445 50 C485 60 515 30 555 38 C580 43 595 14 600 10 L600 120 L0 120 Z"
                    fill="url(#dashRevenue)"
                  />
                  <path
                    d="M0 100 C50 96 70 80 110 87 C150 94 175 65 220 73 C265 82 295 52 335 60 C375 70 405 42 445 50 C485 60 515 30 555 38 C580 43 595 14 600 10"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="2.5"
                  />
                  <circle cx="600" cy="10" r="4" fill="var(--secondary)" />
                  <circle
                    cx="600"
                    cy="10"
                    r="7"
                    fill="var(--secondary)"
                    opacity="0.25"
                  />
                </svg>
              </div>
              <div className="mt-1 flex justify-between text-[7px] text-slate-700">
                <span>Aug 01</span>
                <span>Aug 08</span>
                <span>Aug 15</span>
                <span>Aug 24</span>
              </div>
            </div>

            {/* Bottom row */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/0.05 bg-[#0a0c0d] p-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-secondary/10">
                    <Package className="size-3 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[7px] text-slate-600">Top product</p>
                    <p className="text-[9px] font-medium text-white">
                      Smart Watch Pro
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-[#0a0c0d] p-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-400/10">
                    <CircleDollarSign className="size-3 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[7px] text-slate-600">Available</p>
                    <p className="text-[9px] font-medium text-white">৳24,680</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
