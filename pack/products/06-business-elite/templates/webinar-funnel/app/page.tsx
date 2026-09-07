import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function WebinarFunnelPage() {
  return (
    <>
      <Navbar brand="Webinar Funnel" />
      <main>
        <Hero framework="Webinar Funnel" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/webinar-funnel" />
      </main>
      <Footer brand="Webinar Funnel" />
    </>
  );
}
