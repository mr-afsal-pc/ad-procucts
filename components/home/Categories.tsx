import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and tech',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'jewelery',
    name: 'Jewelry',
    description: 'Elegant and timeless pieces',
    image: 'https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: "men's clothing",
    name: "Men's Clothing",
    description: 'Stylish apparel for men',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: "women's clothing",
    name: "Women's Clothing",
    description: 'Trendy fashion for women',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our collection by category to find exactly what you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            href={`/products?category=${encodeURIComponent(category.id)}`}
            key={category.id}
            className="group"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-bold text-2xl text-white mb-1">{category.name}</h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full bg-white/20 text-white border-white/40 backdrop-blur-sm hover:bg-white/30"
                >
                  Explore
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}