

import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollAnimation';
import AnimatedHeader from '@/components/pages/AnimatedHeader';
import HeroSection from '@/components/pages/HeroSection';
export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <main className="relative">
        <AnimatedHeader/>
        <HeroSection/>
        <FeaturesSection />
        <Footer />
      </main>
    </>
  );
}