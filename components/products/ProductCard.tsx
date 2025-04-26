'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.title.substring(0, 20)}... added to cart!`);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div 
        className="group bg-card rounded-lg overflow-hidden border border-border h-full flex flex-col transition-all duration-200 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative pt-[100%] bg-muted/50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-contain p-6 transition-transform duration-300",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.id % 4 === 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
            )}
            {product.id % 5 === 0 && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
            )}
          </div>
          
          <div 
            className={cn(
              "absolute right-4 flex flex-col gap-2 transition-all duration-300",
              isHovered ? "top-4 opacity-100" : "top-0 opacity-0"
            )}
          >
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white text-gray-800 hover:bg-gray-100 shadow-sm size-9"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col p-4">
          <span className="text-xs text-muted-foreground uppercase mb-1">
            {product.category}
          </span>
          <h3 className="font-medium line-clamp-2 mb-2 flex-grow">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="font-bold">${product.price.toFixed(2)}</span>
            <Button 
              onClick={handleAddToCart}
              size="sm" 
              className="rounded-full flex items-center gap-1.5"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="sr-only md:not-sr-only md:inline-block">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}