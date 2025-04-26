'use client';

import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import EmptyCart from '@/components/cart/EmptyCart';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    // Prepare cart items as a message
    const items = cart.map(item => 
      `${item.title} (${item.quantity} x $${item.price.toFixed(2)})`
    ).join('\n');
    
    const message = `Hello, I would like to place an order:\n\n${items}\n\nSubtotal: $${subtotal.toFixed(2)}\nShipping: $${shipping.toFixed(2)}\nTotal: $${total.toFixed(2)}`;
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/916282791439?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-sm border border-border">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left pb-4">Product</th>
                      <th className="text-center pb-4">Quantity</th>
                      <th className="text-right pb-4">Price</th>
                      <th className="text-right pb-4">Total</th>
                      <th className="text-right pb-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b border-border">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="relative h-16 w-16 mr-4 rounded bg-muted overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="64px"
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                            <Link href={`/products/${item.id}`} className="hover:underline">
                              <p className="font-medium line-clamp-2">{item.title}</p>
                            </Link>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center border border-input rounded-md w-24 mx-auto">
                            <button
                              className="px-3 py-1"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-10 text-center p-1 border-none focus:outline-none focus:ring-0"
                            />
                            <button
                              className="px-3 py-1"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-4 text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between items-center p-6 bg-muted/50 border-t border-border">
              <Button
                variant="outline"
                onClick={clearCart}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </Button>
              
              <Link href="/products">
                <Button
                  variant="link"
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Checkout via WhatsApp
            </Button>
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Need help? Contact us:</p>
              <p className="mt-1">WhatsApp: +91 6282791439</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}