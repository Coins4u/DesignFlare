import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function FinanceDashboardPage() {
  return (
    <>
      <Navbar brand="Finance Dashboard" />
      <main>
        <Hero framework="Finance Dashboard" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/finance-dashboard" />
      </main>
      <Footer brand="Finance Dashboard" />
    </>
  );
}
