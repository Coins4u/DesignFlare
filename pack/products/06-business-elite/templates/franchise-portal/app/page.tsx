import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function FranchisePortalPage() {
  return (
    <>
      <Navbar brand="Franchise Portal" />
      <main>
        <Hero framework="Franchise Portal" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/franchise-portal" />
      </main>
      <Footer brand="Franchise Portal" />
    </>
  );
}
