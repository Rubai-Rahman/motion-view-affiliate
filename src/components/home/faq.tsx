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
    question: 'What is Motion View Affiliate?',
    sub: 'Understanding the program',
    answer:
      'Motion View Affiliate is an affiliate program that allows eligible participants to promote selected Motion View products through unique affiliate links and earn commission from qualifying sales according to the applicable program terms. You join, generate links, promote products to your audience, and earn from sales you help generate.',
  },
  {
    question: 'How can I earn money with Motion View Affiliate?',
    sub: 'Your path to commission',
    answer:
      'Join the program, choose eligible products, create your affiliate links, and promote them through permitted marketing channels. Qualifying purchases attributed to your affiliate activity generate commission under the program&apos;s current rules. The more relevant and useful your content, the better your conversion potential.',
  },
  {
    question: 'Do I need a website to join the affiliate program?',
    sub: 'Multiple channels welcome',
    answer:
      'A website can provide a strong platform for SEO and long-term content marketing, but affiliate promotion can also work through social media, video platforms, online communities, and other permitted channels. Check the current Motion View Affiliate requirements before applying to confirm eligible promotional methods.',
  },
  {
    question: 'What products can I promote?',
    sub: 'Eligible product catalog',
    answer:
      'You can promote products that the Motion View Affiliate platform currently makes eligible for affiliate marketing. This includes smart gadgets, electronics, and eco products from the Motion View catalog. Check your affiliate account for the latest available products, categories, and applicable conditions. Visit motionview.com.bd to explore the full range.',
  },
  {
    question: 'Is Motion View Affiliate suitable for beginners?',
    sub: 'Getting started as a new creator',
    answer:
      'Beginners can explore affiliate marketing through the program, especially those who already create technology, gadget, lifestyle, deal, or shopping-related content. You don\'t need a massive following — audience relevance and trust can matter more than follower count. Learning content creation, SEO, and conversion-focused promotion will improve your results over time.',
  },
  {
    question: 'How much can I earn from Motion View Affiliate?',
    sub: 'Earnings potential',
    answer:
      'Affiliate earnings can vary based on eligible commission rates, qualifying sales, product selection, traffic quality, audience intent, and your promotional strategy. There is no fixed cap — your income scales with the quality and volume of the affiliate sales you generate. Review the affiliate dashboard and official program conditions for current commission and payment information.',
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="background relative overflow-hidden bg-card py-28 sm:py-32 lg:py-40"
    >
      {/* Background element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.72_0.16_65_/_0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.55fr_1fr] lg:items-start">
          {/* Left sticky heading */}
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="Everything you need to know before starting your affiliate journey with Motion View."
            />

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                ['6+', 'Questions answered'],
                ['24/7', 'Support available'],
              ].map(([val, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-secondary-background p-4"
                >
                  <p className="text-2xl font-semibold text-foreground">
                    {val}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Support link */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, ease }}
              className="mt-5 rounded-xl border border-secondary/20 bg-secondary/5 p-4"
            >
              <p className="text-xs font-medium text-foreground">
                Still have questions?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Our support team is ready to help you get started.
              </p>
              <a
                href="https://motionview.com.bd/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
              >
                Contact Support →
              </a>
            </motion.div>
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
                    className="overflow-hidden rounded-2xl border border-border bg-secondary-background px-6 data-[state=open]:border-secondary/25 data-[state=open]:bg-card"
                  >
                    <AccordionTrigger className="py-5 text-left hover:no-underline data-[state=open]:text-secondary">
                      <div className="pr-4">
                        <p className="font-medium text-foreground data-[state=open]:text-secondary">
                          {faq.question}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-secondary">
                          {faq.sub}
                        </p>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-5 pr-8 text-sm leading-[1.8] text-muted-foreground">
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
