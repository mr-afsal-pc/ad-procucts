import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import SpecialOffers from '@/components/home/SpecialOffers';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <SpecialOffers />
      <Newsletter />
    </div>
  );
}