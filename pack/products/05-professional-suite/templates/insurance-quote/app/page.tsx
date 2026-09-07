import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function InsuranceQuotePage() {
  return (
    <>
      <Navbar brand="Insurance Quote" />
      <main>
        <Hero framework="Insurance Quote" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/insurance-quote" />
      </main>
      <Footer brand="Insurance Quote" />
    </>
  );
}
