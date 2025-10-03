import AnimatedHeader from '@/components/pages/AnimatedHeader';
import WeBuy from '@/components/pages/WeBuy';
import Footer from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollAnimation';

export default function Contact() {
  return (
    <>
      <ScrollProgressBar />
      <main className="relative">
        <AnimatedHeader />
        <WeBuy />
        <Footer />
      </main>
    </>
  );
}