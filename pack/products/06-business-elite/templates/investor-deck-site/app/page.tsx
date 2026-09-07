import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function InvestorDeckSitePage() {
  return (
    <>
      <Navbar brand="Investor Deck Site" />
      <main>
        <Hero framework="Investor Deck Site" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/investor-deck-site" />
      </main>
      <Footer brand="Investor Deck Site" />
    </>
  );
}
