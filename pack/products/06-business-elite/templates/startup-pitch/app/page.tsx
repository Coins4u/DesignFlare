import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function StartupPitchPage() {
  return (
    <>
      <Navbar brand="Startup Pitch" />
      <main>
        <Hero framework="Startup Pitch" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/startup-pitch" />
      </main>
      <Footer brand="Startup Pitch" />
    </>
  );
}
