import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import EyeRevealSection from './components/EyeRevealSection';
import MidCTASection from './components/MidCTASection';
import HeroSection from './components/HeroSection';
import InsightsSection from './components/InsightsSection';
import TestimonialsSection from './components/TestimonialsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { SetupSection } from './components/SetupSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <ReactLenis root>
      <Navbar />
      <main className="bg-bg min-h-screen text-white pt-24 lg:pt-0">
        {/* The New Hero Experience */}
        <HeroSection />

        {/* The Core Experience */}
        <EyeRevealSection />

        {/* Action Point */}
        <MidCTASection />

        {/* Intelligence & Analytics */}
        <InsightsSection />

        {/* Community & Success Stories */}
        <TestimonialsSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Setup Process */}
        <SetupSection />

        {/* Final Calls To Action */}
        <FinalCTASection />
      </main>

      {/* Main SaaS Footer */}
      <Footer />
    </ReactLenis>
  );
}
