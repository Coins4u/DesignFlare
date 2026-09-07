import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function HrPlatformPage() {
  return (
    <>
      <Navbar brand="HR Platform" />
      <main>
        <Hero framework="HR Platform" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/hr-platform" />
      </main>
      <Footer brand="HR Platform" />
    </>
  );
}
