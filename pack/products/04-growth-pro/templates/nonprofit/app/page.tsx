import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function NonprofitPage() {
  return (
    <>
      <Navbar brand="Nonprofit" />
      <main>
        <Hero framework="Nonprofit" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/nonprofit" />
      </main>
      <Footer brand="Nonprofit" />
    </>
  );
}
