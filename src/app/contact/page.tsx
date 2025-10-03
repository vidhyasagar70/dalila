import AnimatedHeader from '@/components/pages/AnimatedHeader';
import ContactUsPage from '@/components/pages/ContactUsPage';
import Footer from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollAnimation';

export default function Contact() {
  return (
    <>
      <ScrollProgressBar />
      <main className="relative">
        <AnimatedHeader />
        <ContactUsPage />
        <Footer />
      </main>
    </>
  );
}