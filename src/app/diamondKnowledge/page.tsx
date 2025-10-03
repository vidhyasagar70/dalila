import AnimatedHeader from '@/components/pages/AnimatedHeader';
import DiamondKnowledge from '@/components/pages/DiamondKnowledge';
import Footer from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollAnimation';

export default function Contact() {
  return (
    <>
      <ScrollProgressBar />
      <main className="relative">
        <AnimatedHeader />
        <DiamondKnowledge/>
        <Footer />
      </main>
    </>
  );
}