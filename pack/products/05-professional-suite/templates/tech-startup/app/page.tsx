import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function TechStartupPage() {
  return (
    <>
      <Navbar brand="Tech Startup" />
      <main>
        <Hero framework="Tech Startup" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/tech-startup" />
      </main>
      <Footer brand="Tech Startup" />
    </>
  );
}
