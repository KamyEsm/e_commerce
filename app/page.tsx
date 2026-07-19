import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Timer from "@/components/Timer";
import {FlashSalesCarousel} from "@/components/FlashSalesCarousel";

export default function Home() {
  return (
      <main className="">
          <Header/>
          <HeroCarousel/>
          <FlashSalesCarousel/>
      </main>
  );
}
