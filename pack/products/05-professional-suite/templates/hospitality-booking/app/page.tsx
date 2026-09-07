import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function HospitalityBookingPage() {
  return (
    <>
      <Navbar brand="Hospitality Booking" />
      <main>
        <Hero framework="Hospitality Booking" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/hospitality-booking" />
      </main>
      <Footer brand="Hospitality Booking" />
    </>
  );
}
