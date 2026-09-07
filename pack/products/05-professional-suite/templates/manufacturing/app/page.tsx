import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function ManufacturingPage() {
  return (
    <>
      <Navbar brand="Manufacturing" />
      <main>
        <Hero framework="Manufacturing" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/manufacturing" />
      </main>
      <Footer brand="Manufacturing" />
    </>
  );
}
