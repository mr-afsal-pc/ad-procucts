import Link from 'next/link';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any products to your cart yet. 
          Browse our collection to find what you're looking for.
        </p>
        
        <Link href="/products">
          <Button className="flex items-center gap-2">
            Continue Shopping
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}