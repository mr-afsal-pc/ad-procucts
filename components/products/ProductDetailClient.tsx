// File: components/products/ProductDetailClient.tsx
'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Loader2, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import RelatedProducts from '@/components/products/RelatedProducts';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    const message = `Hello, I'm interested in purchasing: ${product.title} (${quantity} items). Please assist me with the order.`;
    const whatsappUrl = `https://wa.me/916282791439?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery images={[product.image]} />

        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating?.rate || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-4">
              ${product.price.toFixed(2)}
            </h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center mb-6">
            <div className="mr-4">
              <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                Quantity
              </label>
              <div className="flex items-center border border-input rounded-md">
                <button
                  className="px-3 py-1 border-r border-input"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center p-1 border-none focus:outline-none focus:ring-0"
                />
                <button
                  className="px-3 py-1 border-l border-input"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Availability</p>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button onClick={handleAddToCart} className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              onClick={handleBuyNow} 
              variant="secondary" 
              className="flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
            >
              Buy Now via WhatsApp
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">SKU:</span> {product.id}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Category:</span> {product.category}
            </p>
          </div>
        </div>
      </div>

      <RelatedProducts currentProductId={product.id.toString()} category={product.category} />
    </div>
  );
}
