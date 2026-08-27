'use client';

import { motion } from 'motion/react';
import {
  ArrowDownRight,
  BarChart3,
  Check,
  ExternalLink,
  Link2,
  Package,
  ShoppingBag,
  Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ease, Reveal, SectionHeading } from './motion-primitives';

export function Analytics() {
  return (
    <section
      id="analytics"
      className="relative overflow-hidden bg-background py-28 sm:py-32 lg:py-40"
    >
      {/* Background glow */}
      <div className="absolute right-[-100px] top-[8%] size-[500px] rounded-full bg-(--secondary)/[0.07] blur-[140px]" />
      <div className="absolute left-[-150px] bottom-[10%] size-[400px] rounded-full bg-violet-500/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Inside your dashboard"
          title="আপনার content-এর আসল performance জানুন।"
          bangla="কোন content কতটা কাজ করছে, সবকিছু দেখুন এক নজরে।"
          description="Click গুরুত্বপূর্ণ, order আরও ভালো, আর revenue পুরো গল্পটি বলে।"
          light
        />

        <Reveal delay={0.2} className="mt-16">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-[0_40px_120px_rgba(0,0,0,.5)] backdrop-blur-xl">
            {/* Fake browser chrome */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0a0c0d] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/50" />
                  <div className="size-2.5 rounded-full bg-amber-400/50" />
                  <div className="size-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <div className="hidden h-6 w-56 items-center rounded-md bg-white/[0.04] px-3 sm:flex">
                  <p className="text-[9px] text-slate-600">
                    affiliate.motionview.com/dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-lg bg-white/[0.03]" />
                <div className="size-6 rounded-lg bg-white/[0.03]" />
              </div>
            </div>

            <div className="grid lg:grid-cols-[200px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-white/[0.05] bg-[#080a0b] p-4 lg:block">
                <div className="flex items-center gap-2.5 px-1">
                  <div className="flex size-7 items-center justify-center rounded-xl bg-secondary text-[9px] font-black text-secondary-foreground">
                    M
                  </div>
                  <p className="text-[10px] font-semibold text-white">
                    Affiliate
                  </p>
                </div>

                <p className="mt-7 px-1 text-[8px] uppercase tracking-widest text-slate-700">
                  Main menu
                </p>

                <div className="mt-2 space-y-0.5">
                  {(
                    [
                      ['Overview', BarChart3, true],
                      ['Products', Package, false],
                      ['Links', Link2, false],
                      ['Orders', ShoppingBag, false],
                      ['Earnings', Wallet, false],
                    ] as const
                  ).map(([label, Icon, active]) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[10px] transition-colors ${
                        active
                          ? 'bg-secondary/12 text-secondary'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      <Icon className="size-3.5 shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="mt-10 overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.025] p-3.5">
                  <p className="text-[8px] text-slate-600">Available balance</p>
                  <p className="mt-1.5 text-sm font-semibold text-white">
                    ৳24,680
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="mt-3 w-full rounded-lg bg-secondary py-2 text-[8px] font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
                  >
                    Withdraw
                  </motion.button>
                </div>
              </aside>

              {/* Main dashboard content */}
              <div className="p-4 sm:p-6 lg:p-7">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[9px] text-slate-600">
                      Affiliate Overview
                    </p>
                    <h3 className="mt-0.5 text-base font-semibold text-foreground">
                      Your performance
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[9px] text-slate-500">
                      Aug 01 — Aug 24
                    </div>
                    <div className="flex size-8 items-center justify-center rounded-lg border border-white/[0.07] text-slate-600 hover:text-slate-400 cursor-pointer">
                      <ExternalLink className="size-3.5" />
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      ['৳48,250', 'Revenue', '+18.4%'],
                      ['12,840', 'Clicks', '+12.7%'],
                      ['186', 'Orders', '+9.2%'],
                      ['3.2%', 'Conversion', '+0.4%'],
                    ] as const
                  ).map(([value, label, change], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07, ease }}
                      className="rounded-2xl border border-white/[0.05] bg-[#080a0b] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[8px] text-slate-600">{label}</p>
                        <ArrowDownRight className="size-3 text-emerald-400" />
                      </div>
                      <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[8px] text-emerald-400">
                        {change}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Chart + right panels */}
                <div className="mt-3 grid gap-3 xl:grid-cols-[1.4fr_0.6fr]">
                  {/* Revenue chart */}
                  <div className="rounded-2xl border border-white/[0.05] bg-[#080a0b] p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[9px] font-medium text-slate-400">
                          Revenue performance
                        </p>
                        <p className="mt-0.5 text-[8px] text-slate-700">
                          Commission earned over time
                        </p>
                      </div>
                      <Badge className="border-secondary/10 bg-secondary/5 text-[8px] text-secondary hover:bg-secondary/5">
                        30 days
                      </Badge>
                    </div>

                    <div className="mt-6 h-52">
                      <svg
                        viewBox="0 0 900 220"
                        className="size-full"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="analyticsGrad"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="var(--secondary)"
                              stopOpacity=".22"
                            />
                            <stop
                              offset="100%"
                              stopColor="var(--secondary)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        {[40, 90, 140, 185].map((y) => (
                          <line
                            key={y}
                            x1="0"
                            x2="900"
                            y1={y}
                            y2={y}
                            stroke="rgba(255,255,255,.04)"
                            strokeDasharray="4 6"
                          />
                        ))}
                        <path
                          d="M0 195 C70 190 95 168 155 178 C215 188 245 138 305 150 C360 162 400 118 455 130 C510 143 548 90 605 103 C665 118 695 72 750 83 C810 96 845 48 900 22 L900 220 L0 220 Z"
                          fill="url(#analyticsGrad)"
                        />
                        <path
                          d="M0 195 C70 190 95 168 155 178 C215 188 245 138 305 150 C360 162 400 118 455 130 C510 143 548 90 605 103 C665 118 695 72 750 83 C810 96 845 48 900 22"
                          fill="none"
                          stroke="var(--secondary)"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="900"
                          cy="22"
                          r="5"
                          fill="var(--secondary)"
                        />
                        <circle
                          cx="900"
                          cy="22"
                          r="9"
                          fill="var(--secondary)"
                          opacity="0.2"
                        />
                      </svg>
                    </div>

                    <div className="mt-2 flex justify-between text-[8px] text-slate-700">
                      <span>Aug 01</span>
                      <span>Aug 08</span>
                      <span>Aug 15</span>
                      <span>Aug 24</span>
                    </div>
                  </div>

                  {/* Right panels */}
                  <div className="space-y-3">
                    {/* Top products */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#080a0b] p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-medium text-slate-400">
                          Top products
                        </p>
                        <Package className="size-3.5 text-slate-700" />
                      </div>
                      <div className="mt-4 space-y-3.5">
                        {(
                          [
                            ['Smart Watch Pro', '৳12,420', 75],
                            ['Wireless Earbuds', '৳8,290', 55],
                            ['Smart Home Hub', '৳6,840', 40],
                          ] as const
                        ).map(([name, value, pct], i) => (
                          <div key={name} className="flex items-center gap-2.5">
                            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[8px] font-semibold text-slate-500">
                              0{i + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[9px] text-slate-300">
                                {name}
                              </p>
                              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${pct}%` }}
                                  viewport={{ once: true }}
                                  transition={{
                                    delay: 0.3 + i * 0.1,
                                    duration: 0.7,
                                    ease,
                                  }}
                                  className="h-full rounded-full bg-secondary"
                                />
                              </div>
                            </div>
                            <p className="shrink-0 text-[8px] text-slate-500">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Latest conversion */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#080a0b] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                          <Check className="size-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-600">
                            Latest conversion
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-white">
                            Order #MV-92841
                          </p>
                          <p className="mt-0.5 text-[8px] text-emerald-400">
                            Commission tracked
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
