import AnimatedHeader from "@/components/pages/AnimatedHeader";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import { ScrollProgressBar } from "@/components/ScrollAnimation";

export default function AboutPage() {
  return (
    <>
      <ScrollProgressBar />
      <main className="relative">
        <AnimatedHeader />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
