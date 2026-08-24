'use client';

import { HomeNavbar } from './home-navbar';
import { Hero } from './hero';
import { TrustStats } from './trust-stats';
import { HowItWorks } from './how-it-works';
import { Benefits } from './benefits';
import { Analytics } from './analytics';
import { CommissionSection } from './commission';
import { Products } from './products';
import { Testimonials } from './testimonials';
import { FAQ } from './faq';
import { FinalCTA } from './final-cta';
import { Footer } from './footer';
import { GlowDivider } from './motion-primitives';

export default function HomePage() {
  return (
    <main className="landing-page min-h-screen overflow-x-hidden">
      <HomeNavbar />
      <Hero />
      <TrustStats />
      <GlowDivider />
      <HowItWorks />
      <GlowDivider />
      <Benefits />
      <Analytics />
      <GlowDivider />
      <CommissionSection />
      <Products />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
