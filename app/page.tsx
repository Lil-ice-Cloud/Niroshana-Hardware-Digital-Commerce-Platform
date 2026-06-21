import Navbar from "@/components/ui/Navbar/Navbar";
import TopPanel from "@/components/ui/Top-Panel/Top-Panel";
import HeroCarousel from "@/components/ui/Carousel/HeroCarousel";
import FeaturedProducts from "@/components/ui/Card/FeaturedProducts";

export default function Home() {
  return (
      <>
        <main className="min-h-screen">
          <Navbar />
          <TopPanel />
          <HeroCarousel />
          <FeaturedProducts />
        </main>
      </>
  );
}
