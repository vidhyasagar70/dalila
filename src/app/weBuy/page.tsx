import WebuyBanner from "@/components/pages/Webuy/Bannersection";
import Webuyhero from "@/components/pages/Webuy/Herosection";
import SellDiamondsProcess from "@/components/pages/Webuy/SellDiamond";
import SellDiamondsForm from "@/components/pages/Webuy/SellDiamondform";
export default function Webuy() {
  return (
    <>
      <main className="relative">
        <WebuyBanner />
        <Webuyhero />
        <SellDiamondsProcess />
        <SellDiamondsForm />
      </main>
    </>
  );
}
