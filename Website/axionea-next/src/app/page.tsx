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
    <main className="relative min-h-screen w-full bg-background text-foreground flex flex-col pt-16 overflow-hidden">
      <InteractiveParticles />
      <HeroContent />

      {/* Section Divider */}
      <hr className="border-t border-black/5 dark:border-white/5" />

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

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Process Steps Section */}
      <ProcessSteps />

      {/* Architecture / Workflow Diagram */}
      <WorkflowDiagram />

      {/* Team Section */}
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
