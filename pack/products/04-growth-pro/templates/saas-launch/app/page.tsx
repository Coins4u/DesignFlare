import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LogoCloud } from '../components/LogoCloud';
import { FeatureGrid } from '../components/FeatureGrid';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { LeadForm } from '../components/LeadForm';
import { Footer } from '../components/Footer';

export default function SaasLaunchPage() {
  return (
    <>
      <Navbar brand="SaaS Launch" />
      <main>
        <Hero framework="SaaS Launch" />
        <LogoCloud />
        <FeatureGrid />
        <Testimonials />
        <Pricing />
        <LeadForm apiRoute="/api/saas-launch" />
      </main>
      <Footer brand="SaaS Launch" />
    </>
  );
}
