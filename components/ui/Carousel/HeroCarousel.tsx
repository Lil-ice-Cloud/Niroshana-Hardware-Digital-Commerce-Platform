import Carousel from "./Carousel";
import slides from '@/data/slides.json';

export default function HeroCarousel() {
  return (
    <div className="mt-32 px-10 sm:px-12 lg:px-14">
      <Carousel slides={slides} height="xl" />
    </div>
  );
}
