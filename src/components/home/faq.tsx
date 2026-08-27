'use client';

import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ease, SectionHeading } from './motion-primitives';

const faqs = [
  {
    question: 'Motion View Affiliate Program কী?',
    bangla: 'সহজভাবে শুরু করার নিয়ম',
    answer:
      'Motion View Affiliate Program-এর মাধ্যমে creators এবং publishers unique trackable link ব্যবহার করে Motion View-এর পণ্য প্রচার করতে পারেন এবং qualifying purchase থেকে কমিশন আয় করতে পারেন।',
  },
  {
    question: 'কীভাবে Affiliate হবো?',
    bangla: 'আজই আপনার journey শুরু করুন',
    answer:
      'একটি affiliate account তৈরি করুন, প্রয়োজনীয় তথ্য দিন এবং onboarding process সম্পন্ন করুন।',
  },
  {
    question: 'Affiliate Link কীভাবে কাজ করে?',
    bangla: 'প্রতিটি click-এর হিসাব থাকুক',
    answer:
      'প্রতিটি affiliate নিজের unique link তৈরি করতে পারেন। আপনার audience সেই link দিয়ে এলে eligible activity আপনার account-এর সাথে যুক্ত হয়।',
  },
  {
    question: 'কখন কমিশন পাবো?',
    bangla: 'সফল অর্ডারেই আয়',
    answer:
      'Motion View-এর প্রযোজ্য affiliate terms এবং attribution rules অনুযায়ী qualifying purchase হলে commission যুক্ত হয়।',
  },
  {
    question: 'আমার আয় কীভাবে দেখবো?',
    bangla: 'Dashboard-এ সবকিছু এক নজরে',
    answer:
      'আপনার affiliate dashboard-এ clicks, orders, conversions এবং commission performance-এর সম্পূর্ণ চিত্র দেখা যাবে।',
  },
  {
    question: 'কীভাবে টাকা উত্তোলন করবো?',
    bangla: 'সহজ ও স্বচ্ছ withdrawal',
    answer:
      'Available withdrawal methods, verification requirements এবং processing timeline প্রযোজ্য affiliate terms অনুযায়ী নির্ধারিত হবে।',
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="landing-light relative overflow-hidden bg-card py-28 sm:py-32 lg:py-40"
    >
      {/* Background element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.72_0.16_65_/_0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.55fr_1fr] lg:items-start">
          {/* Left sticky heading */}
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FAQ"
              title="শুরু করার আগে কিছু জানতে চান?"
              bangla="সবচেয়ে গুরুত্বপূর্ণ উত্তরগুলো এক জায়গায়।"
              description="আপনার প্রশ্নের উত্তর না পেলে আমাদের support team সবসময় আপনার পাশে আছে।"
            />

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                ['6+', 'Common questions answered'],
                ['24/7', 'Support available'],
              ].map(([val, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-landing-line bg-secondary-background p-4"
                >
                  <p className="text-2xl font-semibold text-landing-ink">
                    {val}
                  </p>
                  <p className="mt-1 text-xs text-landing-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — accordion */}
          <div>
            <Accordion>
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, ease }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className="overflow-hidden rounded-2xl border border-landing-line bg-secondary-background px-6 data-[state=open]:border-secondary/25 data-[state=open]:bg-card"
                  >
                    <AccordionTrigger className="py-5 text-left hover:no-underline data-[state=open]:text-secondary">
                      <div className="pr-4">
                        <p className="font-medium text-landing-ink data-[state=open]:text-secondary">
                          {faq.question}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-secondary">
                          {faq.bangla}
                        </p>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-5 pr-8 text-sm leading-[1.8] text-landing-muted">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
