import Header from '../components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollAnimation';
export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <main className="relative">
        <Header />
        <HeroSection />
        <AboutSection/>
        <FeaturesSection />
        <Footer />
      </main>
    </>
  );
}