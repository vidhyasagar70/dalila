import WebuyBanner from "@/components/pages/Webuy/Bannersection";
import Webuyhero from "@/components/pages/Webuy/Herosection";
import SellDiamondsProcess from "@/components/pages/Webuy/SellDiamond";
export default function Webuy() {
  return (
    <>
      <main className="relative">
        <WebuyBanner />
        <Webuyhero />
        <SellDiamondsProcess />
      </main>
    </>
  );
}
