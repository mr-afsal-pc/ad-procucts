import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SpecialOffers() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-3">Special Offers</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't miss out on these amazing deals and limited-time offers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-xl overflow-hidden h-[400px] group">
          <Image
            src="https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Electronics Sale"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent flex flex-col justify-center p-8">
            <span className="text-white/90 uppercase tracking-wider mb-2">Limited Time</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Electronics Sale
            </h3>
            <p className="text-white/90 mb-4 max-w-md">
              Up to 40% off on selected electronics. Upgrade your tech today!
            </p>
            <Link href="/products?category=electronics">
              <Button className="w-fit">Shop Now</Button>
            </Link>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden h-[400px] group">
          <Image
            src="https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Fashion Collection"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent flex flex-col justify-center p-8">
            <span className="text-white/90 uppercase tracking-wider mb-2">New Arrivals</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Summer Collection
            </h3>
            <p className="text-white/90 mb-4 max-w-md">
              Discover the latest summer trends at unbeatable prices!
            </p>
            <Link href="/products?category=women's%20clothing">
              <Button className="w-fit">Explore</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 relative rounded-xl overflow-hidden h-[250px] group">
        <Image
          src="https://images.pexels.com/photos/5698849/pexels-photo-5698849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Special Discount"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center p-8">
          <span className="text-white/90 uppercase tracking-wider mb-2">
            Special Offer
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get 20% Off on Your First Order
          </h3>
          <p className="text-white/90 mb-4 max-w-md">
            Use code <span className="font-bold">WELCOME20</span> at checkout
          </p>
          <Link href="/products">
            <Button className="w-fit">Shop Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}