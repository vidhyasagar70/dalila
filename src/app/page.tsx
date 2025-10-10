import HeroSection from "@/components/pages/HeroSection";
import DiamondShapes from "@/components/pages/homecomponents/DiamondShapes";
import AboutDalila from "@/components/pages/homecomponents/AboutDalila";
import CertifiedBy from "@/components/pages/homecomponents/Certified";
import HomeContent from "@/components/pages/homecomponents/homeContent";
import BookComponent from "@/components/pages/homecomponents/BookComponent";
import DiamondSource from "@/components/pages/homecomponents/DiamondSource";
import VideoContent from "@/components/pages/homecomponents/VideoContent";
import Experience from "@/components/pages/homecomponents/experience";
export default function Home() {
  return (
    <>
      <main className="relative">
        <HeroSection />
        <AboutDalila />
        <DiamondShapes />
        <CertifiedBy />
        <HomeContent />
        <BookComponent />
        <VideoContent />
        <DiamondSource />
        <Experience />
      </main>
    </>
  );
}
