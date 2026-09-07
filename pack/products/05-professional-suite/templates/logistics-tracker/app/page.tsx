import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function LogisticsTrackerPage() {
  return (
    <>
      <Navbar brand="Logistics Tracker" />
      <main>
        <Hero framework="Logistics Tracker" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/logistics-tracker" />
      </main>
      <Footer brand="Logistics Tracker" />
    </>
  );
}
