import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function CorporateB2bPage() {
  return (
    <>
      <Navbar brand="Corporate B2B" />
      <main>
        <Hero framework="Corporate B2B" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/corporate-b2b" />
      </main>
      <Footer brand="Corporate B2B" />
    </>
  );
}
