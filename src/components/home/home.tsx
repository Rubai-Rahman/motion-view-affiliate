'use client';

import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Copy,
  ExternalLink,
  Link2,
  Menu,
  MousePointerClick,
  Package,
  Play,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const stats = [
  {
    value: '50K+',
    label: 'Customers',
    bangla: 'বিশ্বস্ত ক্রেতা',
  },
  {
    value: '100K+',
    label: 'Orders Delivered',
    bangla: 'সফল ডেলিভারি',
  },
  {
    value: '10+',
    label: 'Official Brands',
    bangla: 'অফিশিয়াল ব্র্যান্ড',
  },
  {
    value: '4.8',
    label: 'Customer Rating',
    bangla: 'ক্রেতাদের রেটিং',
  },
];

const creatorSteps = [
  {
    number: '01',
    title: 'Create',
    bangla: 'তৈরি করুন',
    description: 'Create your affiliate account.',
    icon: Users,
  },
  {
    number: '02',
    title: 'Share',
    bangla: 'শেয়ার করুন',
    description: 'Share products your audience loves.',
    icon: Link2,
  },
  {
    number: '03',
    title: 'Track',
    bangla: 'ট্র্যাক করুন',
    description: 'See clicks, orders and performance.',
    icon: BarChart3,
  },
  {
    number: '04',
    title: 'Earn',
    bangla: 'আয় করুন',
    description: 'Earn from qualifying purchases.',
    icon: CircleDollarSign,
  },
];

const products = [
  {
    name: 'Smart Watch Pro',
    category: 'Wearables',
    price: '৳4,990',
    initials: 'SW',
  },
  {
    name: 'Wireless Earbuds',
    category: 'Audio',
    price: '৳2,490',
    initials: 'EB',
  },
  {
    name: 'Smart Home Hub',
    category: 'Smart Home',
    price: '৳6,990',
    initials: 'SH',
  },
  {
    name: 'Gaming Controller',
    category: 'Gaming',
    price: '৳3,290',
    initials: 'GC',
  },
];

const faqs = [
  {
    question: 'What is the Motion View Affiliate Program?',
    bangla: 'Motion View Affiliate Program কী?',
    answer:
      'The Motion View Affiliate Program allows creators and publishers to promote Motion View products through unique trackable links and potentially earn commission from qualifying purchases.',
  },
  {
    question: 'How do I become an affiliate?',
    bangla: 'কীভাবে Affiliate হবো?',
    answer:
      'Create an affiliate account, submit the required information and complete the applicable onboarding process.',
  },
  {
    question: 'How do affiliate links work?',
    bangla: 'Affiliate Link কীভাবে কাজ করে?',
    answer:
      'Each affiliate can generate unique links. When your audience visits through those links, eligible activity can be attributed to your affiliate account.',
  },
  {
    question: 'When do I earn a commission?',
    bangla: 'কখন কমিশন পাবো?',
    answer:
      'Commission is associated with qualifying purchases according to the applicable Motion View affiliate terms and attribution rules.',
  },
  {
    question: 'How can I track my earnings?',
    bangla: 'আমার আয় কীভাবে দেখবো?',
    answer:
      'Your affiliate dashboard provides visibility into clicks, orders, conversions and commission-related performance.',
  },
  {
    question: 'How do I withdraw my earnings?',
    bangla: 'কীভাবে টাকা উত্তোলন করবো?',
    answer:
      'Available withdrawal methods, verification requirements and processing timelines are determined according to the applicable affiliate terms.',
  },
];

/* -------------------------------------------------------------------------- */
/* NAVBAR                                                                     */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    ['How It Works', '#how-it-works'],
    ['Benefits', '#benefits'],
    ['Analytics', '#analytics'],
    ['FAQ', '#faq'],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b0c]/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-[11px] bg-[#F29120] font-black text-white shadow-lg shadow-[#F29120]/20">
            M
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-white">
              Motion View
            </p>

            <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
              Affiliate
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-slate-500 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            variant="ghost"
            className="text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Login
          </Button>

          <Button className="bg-[#F29120] text-white shadow-lg shadow-[#F29120]/15 hover:bg-[#df7e12]">
            Become an Affiliate
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#090b0c] p-4 lg:hidden">
          <nav className="space-y-1">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <Button className="mt-3 w-full bg-[#F29120] text-white hover:bg-[#df7e12]">
            Become an Affiliate
          </Button>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO DASHBOARD                                                             */
/* -------------------------------------------------------------------------- */

function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[700px]">
      {/* ambient glow */}
      <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F29120]/10 blur-[110px]" />

      {/* floating card */}
      <div className="absolute -left-5 top-16 z-30 hidden w-44 rounded-2xl border border-white/10 bg-[#16191b]/80 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-left-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#F29120]/10">
            <TrendingUp className="size-4 text-[#F29120]" />
          </div>

          <div>
            <p className="text-[9px] text-slate-600">Today's revenue</p>

            <p className="mt-1 text-sm font-semibold text-white">+৳8,420</p>
          </div>
        </div>
      </div>

      {/* floating card */}
      <div className="absolute -right-4 bottom-16 z-30 hidden w-44 rounded-2xl border border-white/10 bg-[#16191b]/80 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-right-7">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-400/10">
            <ShoppingBag className="size-4 text-emerald-400" />
          </div>

          <div>
            <p className="text-[9px] text-slate-600">New orders</p>

            <p className="mt-1 text-sm font-semibold text-white">+24 today</p>
          </div>
        </div>
      </div>

      {/* browser/dashboard shell */}
      <div className="relative rounded-[30px] border border-white/10 bg-white/[0.045] p-2 shadow-[0_40px_100px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:p-3">
        <div className="overflow-hidden rounded-[23px] border border-white/[0.07] bg-[#151719]">
          {/* top bar */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#F29120] text-[10px] font-black text-white">
                M
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Motion View Affiliate
                </p>

                <p className="text-[8px] text-slate-600">Creator dashboard</p>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="size-6 rounded-full bg-white/5" />
              <div className="size-6 rounded-full bg-white/5" />
              <div className="size-6 rounded-full bg-white/5" />
            </div>
          </div>

          <div className="grid sm:grid-cols-[135px_1fr]">
            {/* sidebar */}
            <aside className="hidden border-r border-white/[0.06] p-3 sm:block">
              <p className="px-2 py-2 text-[8px] uppercase tracking-widest text-slate-700">
                Workspace
              </p>

              {[
                ['Overview', BarChart3],
                ['Products', Package],
                ['Affiliate Links', Link2],
                ['Earnings', Wallet],
              ].map(([label, Icon], index) => {
                const MenuIcon = Icon as typeof BarChart3;

                return (
                  <div
                    key={label as string}
                    className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[9px] ${
                      index === 0
                        ? 'bg-[#F29120]/10 text-[#F29120]'
                        : 'text-slate-600'
                    }`}
                  >
                    <MenuIcon className="size-3" />
                    {label as string}
                  </div>
                );
              })}
            </aside>

            {/* main */}
            <div className="p-3 sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] text-slate-600">Monday, August 24</p>

                  <h3 className="mt-1 text-sm font-semibold text-white">
                    Good afternoon, Creator.
                  </h3>
                </div>

                <Badge className="border-emerald-400/10 bg-emerald-400/5 text-[8px] text-emerald-400 hover:bg-emerald-400/5">
                  <span className="mr-1 size-1 rounded-full bg-emerald-400" />
                  Live
                </Badge>
              </div>

              {/* metrics */}
              <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
                {[
                  ['৳48,250', 'Earnings', '+18.4%'],
                  ['12,840', 'Clicks', '+12.7%'],
                  ['186', 'Orders', '+9.2%'],
                  ['3.2%', 'Conversion', '+0.4%'],
                ].map(([value, label, change]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.06] bg-[#0f1113] p-3"
                  >
                    <p className="text-[7px] text-slate-600">{label}</p>

                    <div className="mt-1.5 flex items-end justify-between gap-2">
                      <p className="text-sm font-semibold text-white">
                        {value}
                      </p>

                      <span className="text-[7px] text-emerald-400">
                        {change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* chart */}
              <div className="mt-2 rounded-xl border border-white/[0.06] bg-[#0f1113] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[9px] font-medium text-slate-300">
                      Revenue
                    </p>

                    <p className="mt-0.5 text-[7px] text-slate-700">
                      Last 30 days
                    </p>
                  </div>

                  <span className="rounded-full bg-[#F29120]/10 px-2 py-1 text-[7px] text-[#F29120]">
                    ৳48,250
                  </span>
                </div>

                <div className="mt-5 h-32 sm:h-40">
                  <svg
                    viewBox="0 0 700 180"
                    className="size-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="heroRevenue"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#F29120"
                          stopOpacity=".22"
                        />

                        <stop
                          offset="100%"
                          stopColor="#F29120"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {[35, 75, 115, 155].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2="700"
                        y1={y}
                        y2={y}
                        stroke="rgba(255,255,255,.04)"
                        strokeDasharray="4 6"
                      />
                    ))}

                    <path
                      d="M0 145 C55 140 75 120 115 126 C155 132 175 92 220 103 C260 113 290 82 330 94 C370 105 405 68 445 78 C485 89 515 55 555 64 C600 75 635 42 700 20 L700 180 L0 180 Z"
                      fill="url(#heroRevenue)"
                    />

                    <path
                      d="M0 145 C55 140 75 120 115 126 C155 132 175 92 220 103 C260 113 290 82 330 94 C370 105 405 68 445 78 C485 89 515 55 555 64 C600 75 635 42 700 20"
                      fill="none"
                      stroke="#F29120"
                      strokeWidth="3"
                    />

                    <circle cx="700" cy="20" r="5" fill="#F29120" />
                  </svg>
                </div>
              </div>

              {/* bottom row */}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/[0.06] bg-[#0f1113] p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-[#F29120]/10">
                      <Package className="size-3 text-[#F29120]" />
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-600">Top product</p>

                      <p className="mt-0.5 text-[9px] font-medium text-white">
                        Smart Watch Pro
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-[#0f1113] p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-400/10">
                      <CircleDollarSign className="size-3 text-emerald-400" />
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-600">Available</p>

                      <p className="mt-0.5 text-[9px] font-medium text-white">
                        ৳24,680
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#090b0c]">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* top glow */}
      <div className="absolute left-1/2 top-[-300px] size-[700px] -translate-x-1/2 rounded-full bg-[#F29120]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 backdrop-blur-xl">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#F29120]">
              <Sparkles className="size-3 text-white" />
            </span>

            <span className="text-[11px] font-medium text-slate-400">
              Motion View Affiliate Program
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-semibold tracking-[-0.065em] text-white sm:text-6xl lg:text-[82px] lg:leading-[0.95]">
            Turn Your Audience
            <br />
            Into <span className="text-[#F29120]">Earnings.</span>
          </h1>

          <p className="mt-6 text-lg font-medium text-[#F29120] sm:text-xl">
            আপনার audience-কে আয়ের সুযোগে পরিণত করুন।
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Promote Motion View products, share your unique links, and earn from
            qualifying sales — while seeing exactly what works.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 bg-[#F29120] px-7 text-white shadow-2xl shadow-[#F29120]/20 hover:bg-[#df7e12]"
            >
              Become an Affiliate
              <ArrowRight className="size-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 border-white/10 bg-white/[0.03] px-7 text-slate-300 backdrop-blur-xl hover:bg-white/[0.07] hover:text-white"
            >
              <Play className="size-4 fill-current" />
              See How It Works
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Free to join', 'Track every click', 'Built for creators'].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-[11px] text-slate-600"
                >
                  <Check className="size-3 text-[#F29120]" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        {/* dashboard */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <HeroDashboard />
        </div>
      </div>

      {/* bottom transition */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* STATS                                                                      */
/* -------------------------------------------------------------------------- */

function TrustStats() {
  return (
    <section className="bg-[#0b0d0e]">
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8">
        <div className="grid grid-cols-2 divide-x divide-white/[0.07] lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-5 py-3 first:pl-0 last:pr-0 sm:px-8"
            >
              <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-1 text-xs font-medium text-slate-400">
                {stat.label}
              </p>

              <p className="mt-1 text-[10px] text-slate-700">{stat.bangla}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION HEADING                                                            */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  bangla,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  bangla?: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#F29120]" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F29120]">
          {eyebrow}
        </span>
      </div>

      <h2
        className={`mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-[56px] lg:leading-[1] ${
          light ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>

      {bangla && (
        <p className="mt-4 text-base font-medium text-[#F29120]">{bangla}</p>
      )}

      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-7 sm:text-lg ${
            light ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HOW IT WORKS                                                               */
/* -------------------------------------------------------------------------- */

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f7f6f3] py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="The creator loop"
          title="Create. Share. Track. Earn."
          bangla="তৈরি করুন → শেয়ার করুন → ট্র্যাক করুন → আয় করুন"
          description="A simple loop designed around how creators actually work."
        />

        <div className="relative mt-16">
          <div className="absolute left-[12%] right-[12%] top-11 hidden h-px bg-slate-200 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {creatorSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">
                  <div className="relative z-10 flex size-[88px] items-center justify-center rounded-[26px] border border-slate-200 bg-[#f7f6f3] shadow-sm">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Icon className="size-5 text-[#F29120]" />
                    </div>
                  </div>

                  <p className="mt-7 text-[10px] font-semibold tracking-[0.15em] text-[#F29120]">
                    {step.number}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-[#F29120]">
                    {step.bangla}
                  </p>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* BENEFITS                                                                   */
/* -------------------------------------------------------------------------- */

function Benefits() {
  return (
    <section id="benefits" className="bg-white py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Why Motion View"
              title="Your audience already trusts your recommendations."
              bangla="এখন সেই trust-কে measurable income-এ পরিণত করুন।"
              description="Motion View gives you the tools to discover products, create links, understand performance and manage your earnings."
            />

            <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#F29120]/10">
                <Zap className="size-4 text-[#F29120]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Built around your workflow
                </p>

                <p className="text-xs text-slate-400">
                  আপনার content workflow-এর সাথে সহজেই মানিয়ে যায়।
                </p>
              </div>
            </div>
          </div>

          <div className="grid border-l border-t border-slate-200 sm:grid-cols-2">
            {[
              ['Competitive commissions', 'আকর্ষণীয় কমিশন', CircleDollarSign],
              ['Real-time analytics', 'রিয়েল-টাইম analytics', BarChart3],
              ['Easy link generation', 'সহজে link তৈরি', Link2],
              ['Wide product selection', 'বিভিন্ন ধরনের পণ্য', Package],
              ['Transparent earnings', 'স্বচ্ছ earning', TrendingUp],
              ['Easy withdrawals', 'সহজ withdrawal', Wallet],
            ].map(([title, bangla, Icon]) => {
              const BenefitIcon = Icon as typeof TrendingUp;

              return (
                <div
                  key={title as string}
                  className="group border-b border-r border-slate-200 p-7 transition-colors hover:bg-[#fafaf9] sm:p-9"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all group-hover:border-[#F29120]/20 group-hover:shadow-md">
                    <BenefitIcon className="size-5 text-[#F29120]" />
                  </div>

                  <h3 className="mt-7 font-semibold text-slate-950">
                    {title as string}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-[#F29120]">
                    {bangla as string}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Understand, measure and improve how your recommendations
                    perform.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* ANALYTICS                                                                  */
/* -------------------------------------------------------------------------- */

function Analytics() {
  return (
    <section
      id="analytics"
      className="relative overflow-hidden bg-[#0a0c0d] py-24 sm:py-28 lg:py-36"
    >
      <div className="absolute right-[-150px] top-[10%] size-[450px] rounded-full bg-[#F29120]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Inside your dashboard"
          title="Know what your content is actually doing."
          bangla="আপনার content থেকে আসা প্রতিটি গুরুত্বপূর্ণ signal দেখুন।"
          description="Clicks are useful. Orders are better. Revenue tells the full story."
          light
        />

        <div className="mt-16 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-2 shadow-2xl backdrop-blur-2xl sm:p-3">
          <div className="overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#151719]">
            <div className="grid lg:grid-cols-[190px_1fr]">
              {/* dashboard sidebar */}
              <aside className="hidden border-r border-white/[0.06] bg-[#111315] p-4 lg:block">
                <div className="flex items-center gap-2.5 px-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#F29120] text-[9px] font-black text-white">
                    M
                  </div>

                  <p className="text-[10px] font-semibold text-white">
                    Affiliate
                  </p>
                </div>

                <p className="mt-8 px-2 text-[8px] uppercase tracking-widest text-slate-700">
                  Main menu
                </p>

                <div className="mt-2 space-y-1">
                  {[
                    ['Overview', BarChart3],
                    ['Products', Package],
                    ['Links', Link2],
                    ['Orders', ShoppingBag],
                    ['Earnings', Wallet],
                  ].map(([label, Icon], index) => {
                    const SidebarIcon = Icon as typeof BarChart3;

                    return (
                      <div
                        key={label as string}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[10px] ${
                          index === 0
                            ? 'bg-[#F29120]/10 text-[#F29120]'
                            : 'text-slate-600'
                        }`}
                      >
                        <SidebarIcon className="size-3.5" />
                        {label as string}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                  <p className="text-[8px] text-slate-600">Available balance</p>

                  <p className="mt-2 text-sm font-semibold text-white">
                    ৳24,680
                  </p>

                  <button
                    type="button"
                    className="mt-3 w-full rounded-lg bg-[#F29120] py-2 text-[8px] font-medium text-white"
                  >
                    Withdraw
                  </button>
                </div>
              </aside>

              {/* main dashboard */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[9px] text-slate-600">
                      Affiliate Overview
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-white">
                      Your performance
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[9px] text-slate-500">
                      Aug 01 — Aug 24
                    </div>

                    <div className="flex size-8 items-center justify-center rounded-lg border border-white/[0.07]">
                      <ExternalLink className="size-3 text-slate-600" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    ['৳48,250', 'Revenue', '+18.4%'],
                    ['12,840', 'Clicks', '+12.7%'],
                    ['186', 'Orders', '+9.2%'],
                    ['3.2%', 'Conversion', '+0.4%'],
                  ].map(([value, label, change]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/[0.06] bg-[#101214] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[8px] text-slate-600">{label}</p>

                        <ArrowDownRight className="size-3 text-emerald-400" />
                      </div>

                      <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                        {value}
                      </p>

                      <p className="mt-1 text-[8px] text-emerald-400">
                        {change}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 grid gap-2 xl:grid-cols-[1.35fr_0.65fr]">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#101214] p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[9px] text-slate-500">
                          Revenue performance
                        </p>

                        <p className="mt-1 text-[8px] text-slate-700">
                          Commission earned over time
                        </p>
                      </div>

                      <Badge className="border-[#F29120]/10 bg-[#F29120]/5 text-[8px] text-[#F29120]">
                        30 days
                      </Badge>
                    </div>

                    <div className="mt-8 h-60">
                      <svg
                        viewBox="0 0 900 240"
                        className="size-full"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="analyticsArea"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#F29120"
                              stopOpacity=".2"
                            />

                            <stop
                              offset="100%"
                              stopColor="#F29120"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        {[40, 90, 140, 190].map((y) => (
                          <line
                            key={y}
                            x1="0"
                            x2="900"
                            y1={y}
                            y2={y}
                            stroke="rgba(255,255,255,.045)"
                            strokeDasharray="4 6"
                          />
                        ))}

                        <path
                          d="M0 205 C60 200 90 175 145 186 C205 198 235 145 295 158 C350 170 390 125 445 137 C500 149 540 95 595 110 C655 127 685 78 740 88 C800 99 835 52 900 25 L900 240 L0 240 Z"
                          fill="url(#analyticsArea)"
                        />

                        <path
                          d="M0 205 C60 200 90 175 145 186 C205 198 235 145 295 158 C350 170 390 125 445 137 C500 149 540 95 595 110 C655 127 685 78 740 88 C800 99 835 52 900 25"
                          fill="none"
                          stroke="#F29120"
                          strokeWidth="4"
                        />

                        <circle cx="900" cy="25" r="6" fill="#F29120" />
                      </svg>
                    </div>

                    <div className="mt-3 flex justify-between text-[8px] text-slate-700">
                      <span>Aug 01</span>
                      <span>Aug 08</span>
                      <span>Aug 15</span>
                      <span>Aug 24</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-2xl border border-white/[0.06] bg-[#101214] p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] text-slate-500">
                          Top products
                        </p>

                        <Package className="size-3 text-slate-700" />
                      </div>

                      <div className="mt-5 space-y-4">
                        {[
                          ['Smart Watch Pro', '৳12,420'],
                          ['Wireless Earbuds', '৳8,290'],
                          ['Smart Home Hub', '৳6,840'],
                        ].map(([name, value], index) => (
                          <div key={name} className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.04] text-[8px] font-semibold text-slate-500">
                              0{index + 1}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[9px] text-slate-300">
                                {name}
                              </p>

                              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                                <div
                                  className="h-full rounded-full bg-[#F29120]"
                                  style={{
                                    width: `${75 - index * 17}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <p className="text-[8px] text-slate-500">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#101214] p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-400/10">
                          <Check className="size-4 text-emerald-400" />
                        </div>

                        <div>
                          <p className="text-[8px] text-slate-600">
                            Latest conversion
                          </p>

                          <p className="mt-1 text-xs font-medium text-white">
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
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PRODUCTS                                                                   */
/* -------------------------------------------------------------------------- */

function Products() {
  return (
    <section className="bg-[#f7f6f3] py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Product marketplace"
            title="Products your audience actually wants."
            bangla="আপনার audience-এর জন্য সঠিক পণ্য খুঁজে নিন।"
            description="Browse Motion View's growing catalog and find products that naturally fit your content."
          />

          <Button
            variant="outline"
            className="w-fit border-slate-300 bg-transparent"
          >
            Explore All Products
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* search */}
        <div className="mt-12 flex flex-col gap-2 sm:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4">
            <Search className="size-4 text-slate-400" />

            <span className="text-sm text-slate-400">
              Search products to promote...
            </span>
          </div>

          <Button variant="outline" className="h-12 border-slate-200 bg-white">
            All Categories
            <ChevronDown className="size-4" />
          </Button>
        </div>

        {/* products */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40"
            >
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#efeee9]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,145,32,.12),transparent_50%)]" />

                <div className="relative flex size-28 items-center justify-center rounded-[28px] border border-white bg-white/60 text-xl font-bold text-slate-300 shadow-xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-110">
                  {product.initials}
                </div>

                <Badge className="absolute left-4 top-4 bg-white/75 text-slate-500 backdrop-blur-xl hover:bg-white/75">
                  {product.category}
                </Badge>

                <button
                  type="button"
                  className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/70 text-slate-400 backdrop-blur-xl transition-colors hover:text-[#F29120]"
                  aria-label={`Copy link for ${product.name}`}
                >
                  <Link2 className="size-4" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-semibold tracking-tight text-slate-950">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs text-slate-400">Ready to promote</p>

                <Separator className="my-5" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">
                      {product.price}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Commission varies
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="bg-slate-950 text-white hover:bg-[#F29120]"
                  >
                    Generate
                    <Copy className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* TESTIMONIALS                                                               */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  const testimonials = [
    {
      initials: 'TC',
      name: 'Tech Creator',
      role: 'YouTube • Placeholder',
      quote:
        'A placeholder testimonial for a verified Motion View creator story.',
    },
    {
      initials: 'LC',
      name: 'Lifestyle Creator',
      role: 'Instagram • Placeholder',
      quote:
        'A placeholder testimonial showing how creators might describe their experience.',
    },
    {
      initials: 'CC',
      name: 'Content Creator',
      role: 'Facebook • Placeholder',
      quote:
        'Replace this with a verified creator story once the program launches.',
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Creator stories"
          title="Built around people, not dashboards."
          bangla="আপনার content-ই আপনার সবচেয়ে বড় asset।"
          description="Placeholder stories below. Replace these with verified affiliate testimonials before launch."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-[#fafaf9] p-7 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-11">
                  <AvatarFallback className="bg-[#F29120]/10 text-xs font-semibold text-[#F29120]">
                    {item.initials}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {item.name}
                  </p>

                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>

              <p className="mt-8 text-sm leading-7 text-slate-600">
                “{item.quote}”
              </p>

              <Badge
                variant="outline"
                className="mt-7 border-slate-200 text-[9px] font-normal text-slate-400"
              >
                Placeholder
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

function FAQ() {
  return (
    <section id="faq" className="bg-[#f7f6f3] py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before you start?"
          bangla="শুরু করার আগে আপনার প্রশ্নগুলোর উত্তর জেনে নিন।"
          description="We've kept the most important answers in one place."
        />

        <Accordion className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="py-6 text-left hover:no-underline">
                <div className="pr-5">
                  <p className="font-medium text-slate-950">{faq.question}</p>

                  <p className="mt-1 text-xs font-medium text-[#F29120]">
                    {faq.bangla}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-6 pr-8 text-sm leading-7 text-slate-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#090b0c] py-24 sm:py-28 lg:py-36">
      <div className="absolute right-[-200px] top-[-200px] size-[600px] rounded-full bg-[#F29120]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-8 shadow-2xl backdrop-blur-2xl sm:p-12 lg:p-16">
          {/* giant background mark */}
          <div className="pointer-events-none absolute -right-8 -top-24 select-none text-[240px] font-black leading-none text-white/[0.018]">
            M
          </div>

          <div className="relative max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F29120]">
              Your next revenue stream
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-[64px] lg:leading-[0.98]">
              Your content has value.
              <br />
              <span className="text-[#F29120]">Let it work for you.</span>
            </h2>

            <p className="mt-5 text-base font-medium text-[#F29120]">
              আপনার content-এর value থেকে নতুন income stream তৈরি করুন।
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
              Join the Motion View affiliate community and start turning product
              recommendations into measurable results.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 bg-[#F29120] px-7 text-white shadow-xl shadow-[#F29120]/20 hover:bg-[#df7e12]"
              >
                Become an Affiliate
                <ArrowRight className="size-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/10 bg-white/[0.03] px-7 text-slate-300 hover:bg-white/[0.07] hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* side metrics */}
          <div className="relative mt-12 grid gap-2 sm:grid-cols-3 lg:absolute lg:bottom-16 lg:right-16 lg:mt-0 lg:w-[380px]">
            {[
              ['50K+', 'Customers'],
              ['100K+', 'Orders'],
              ['4.8★', 'Rating'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"
              >
                <p className="text-xl font-semibold text-white">{value}</p>

                <p className="mt-1 text-[10px] text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="bg-[#090b0c] text-slate-500">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Separator className="bg-white/[0.07]" />

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-[11px] bg-[#F29120] font-black text-white">
                M
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Motion View</p>

                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-700">
                  Affiliate
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
              Promote products you love. Earn from qualifying sales. Track
              everything in one place.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <a href="#how-it-works" className="block hover:text-white">
                How It Works
              </a>

              <a href="#benefits" className="block hover:text-white">
                Benefits
              </a>

              <a href="#analytics" className="block hover:text-white">
                Analytics
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Support
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <a href="#faq" className="block hover:text-white">
                FAQ
              </a>

              <a href="#" className="block hover:text-white">
                Contact
              </a>

              <a href="#" className="block hover:text-white">
                Login
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Legal
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <a href="#" className="block hover:text-white">
                Terms & Conditions
              </a>

              <a href="#" className="block hover:text-white">
                Privacy Policy
              </a>

              <a href="#" className="block hover:text-white">
                Affiliate Terms
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-white/[0.07]" />

        <div className="flex flex-col gap-2 py-7 text-[11px] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Motion View. All rights reserved.</p>

          <p>Motion View Affiliate Program</p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <Hero />

      <TrustStats />

      <HowItWorks />

      <Benefits />

      <Analytics />

      <Products />

      <Testimonials />

      <FAQ />

      <FinalCTA />

      <Footer />
    </main>
  );
}
