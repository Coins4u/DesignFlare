import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function ECommerceStorePage() {
  return (
    <>
      <Navbar brand="E-commerce Store" />
      <main>
        <Hero framework="E-commerce Store" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/e-commerce-store" />
      </main>
      <Footer brand="E-commerce Store" />
    </>
  );
}
