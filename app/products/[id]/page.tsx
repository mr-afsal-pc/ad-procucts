// File: app/products/[id]/page.tsx
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { Product } from '@/types';

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();

  return products.map(product => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  if (!res.ok) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">Product not found</h2>
      </div>
    );
  }

  const product: Product = await res.json();
  return <ProductDetailClient product={product} />;
}