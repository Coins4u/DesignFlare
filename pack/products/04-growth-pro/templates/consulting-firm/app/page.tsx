import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function ConsultingFirmPage() {
  return (
    <>
      <Navbar brand="Consulting Firm" />
      <main>
        <Hero framework="Consulting Firm" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/consulting-firm" />
      </main>
      <Footer brand="Consulting Firm" />
    </>
  );
}
