import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function AffiliateHubPage() {
  return (
    <>
      <Navbar brand="Affiliate Hub" />
      <main>
        <Hero framework="Affiliate Hub" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/affiliate-hub" />
      </main>
      <Footer brand="Affiliate Hub" />
    </>
  );
}
