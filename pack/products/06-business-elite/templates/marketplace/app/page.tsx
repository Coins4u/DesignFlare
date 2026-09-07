import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function MarketplacePage() {
  return (
    <>
      <Navbar brand="Marketplace" />
      <main>
        <Hero framework="Marketplace" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/marketplace" />
      </main>
      <Footer brand="Marketplace" />
    </>
  );
}
