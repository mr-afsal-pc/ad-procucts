'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "New Arrivals",
    description: "Discover the latest fashion trends and top deals on electronics",
    cta: "Shop Now",
    link: "/products"
  },
  {
    image: "https://images.pexels.com/photos/1619651/pexels-photo-1619651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Premium Collection",
    description: "Exclusive styles crafted with quality materials for your lifestyle",
    cta: "Explore Collection",
    link: "/products?category=jewelery"
  },
  {
    image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Summer Essentials",
    description: "Everything you need for the perfect summer wardrobe",
    cta: "View Collection",
    link: "/products?category=men's%20clothing"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Reset transition state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
              <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-lg text-white">
                  <h1 
                    className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-[fadeInUp_0.5s_0.2s_forwards]"
                    style={{ opacity: index === currentSlide ? 1 : 0 }}
                  >
                    {slide.title}
                  </h1>
                  <p 
                    className="text-lg mb-6 opacity-0 animate-[fadeInUp_0.5s_0.4s_forwards]"
                    style={{ opacity: index === currentSlide ? 1 : 0 }}
                  >
                    {slide.description}
                  </p>
                  <Link href={slide.link}>
                    <Button 
                      className="opacity-0 animate-[fadeInUp_0.5s_0.6s_forwards]"
                      style={{ opacity: index === currentSlide ? 1 : 0 }}
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/60"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}