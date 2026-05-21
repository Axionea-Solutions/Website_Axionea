import HeroContent from '@/components/HeroContent';
import IndustryTagsBand from '@/components/IndustryTagsBand';
import ComplianceBadges from '@/components/ComplianceBadges';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesGrid from '@/components/ServicesGrid';
import ProcessSteps from '@/components/ProcessSteps';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import TeamSection from '@/components/TeamSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ComparisonSection from '@/components/ComparisonSection';
import ROICalculator from '@/components/ROICalculator';
import ContactSection from '@/components/ContactSection';
import InteractiveParticles from '@/components/ui/InteractiveParticles';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground flex flex-col pt-28 md:pt-32 overflow-hidden">
      <InteractiveParticles />
      <HeroContent />

      {/* Soft transition handled by hero fade-overlay */}

      {/* Industry Tags Carousel */}
      <IndustryTagsBand />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* ROI Calculator — right after WhyChooseUs */}
      <ROICalculator />

      {/* Services Grid Section */}
      <ServicesGrid />

      {/* Trust & Compliance Badges */}
      <ComplianceBadges />

      {/* Process Steps Section */}
      <ProcessSteps />

      {/* Architecture / Workflow Diagram */}
      <WorkflowDiagram />

      {/* Comparison Section (Präzision vs. Standard) */}
      <ComparisonSection />

      {/* Team Section (Hinter die Kulissen) */}
      <TeamSection />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
