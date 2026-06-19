import Card from "@/components/ui/Card/Card";
import Carousel from "@/components/ui/Carousel/Carousel";
import Navbar from "@/components/ui/Navbar/Navbar";
import TopPanel from "@/components/ui/Top-Panel/Top-Panel"

import slidesData from "@/data/slides.json";
import featuredProductsData from "@/data/featured-products.json";

const slides = slidesData as CarouselSlide[];
const featuredProducts = featuredProductsData as ProductCardData[];
export default function Home() {
  return (
    <>
      <main className="main-h-screen">
        <Navbar/>
          <TopPanel/>
          <div className="mt-32 px-10 sm:px-12 lg:px-14">
          <Carousel slides={slides} height="xl" />
        </div>

        <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-3 text-muted-foreground sm:text-lg">
              Top picks from our hardware collection — tools, materials &amp; supplies
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
