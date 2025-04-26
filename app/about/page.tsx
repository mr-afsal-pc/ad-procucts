import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">About AD STORE</h1>
          <p className="text-muted-foreground mb-6">
            Welcome to AD STORE, your premier shopping destination in Malappuram, Vengara. We take pride in offering a curated selection of quality products at competitive prices.
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <h2 className="text-xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide our customers with an exceptional shopping experience by offering high-quality products, outstanding customer service, and competitive prices.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the most trusted and preferred shopping destination in Malappuram region, known for our integrity, quality, and customer satisfaction.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Store Information</h2>
            <p><span className="font-medium">Location:</span> Malappuram, Vengara</p>
            <p><span className="font-medium">Owner:</span> Muhammed Afsal PC</p>
            <p><span className="font-medium">Contact:</span> +91 6282791439</p>
            
            <div className="pt-2">
              <Link href="https://www.instagram.com/afzll.pc/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Follow on Instagram
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Store Interior"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
            }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-muted-foreground">
              We carefully select every product in our inventory to ensure the highest quality for our customers.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
            <p className="text-muted-foreground">
              Get quick responses and fast delivery when you shop with us. Your satisfaction is our priority.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-muted-foreground">
              Direct communication with our owner ensures personalized service for all your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}