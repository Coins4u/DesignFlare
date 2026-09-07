import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function AgencyHubPage() {
  return (
    <>
      <Navbar brand="Agency Hub" />
      <main>
        <Hero framework="Agency Hub" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/agency-hub" />
      </main>
      <Footer brand="Agency Hub" />
    </>
  );
}
