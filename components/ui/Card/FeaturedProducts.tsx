import Card from "./Card";
import featuredProducts from '@/data/featured-products.json';

// Define the interface locally or import it to align types if needed,
// but since featuredProducts is a JSON array, we can map it directly to Card.
// The Card component's product prop expects ProductCardData.
import type { ProductCardData } from "./Card";

export default function FeaturedProducts() {
  return (
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
            product={product as ProductCardData}
          />
        ))}
      </div>
    </section>
  );
}
