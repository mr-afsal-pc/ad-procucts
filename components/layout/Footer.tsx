import Link from 'next/link';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AD STORE</h3>
            <p className="text-muted-foreground mb-4">
              Your premier shopping destination in Malappuram, Vengara, offering quality products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.instagram.com/afzll.pc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/products?category=electronics" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=jewelery" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=men's%20clothing" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link 
                  href="/products?category=women's%20clothing" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Women's Clothing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Malappuram, Vengara, Kerala, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  +91 6282791439
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  info@adstore.com
                </span>
              </li>
              <li className="flex items-center">
                <Instagram className="h-5 w-5 mr-2 text-primary shrink-0" />
                <a 
                  href="https://www.instagram.com/afzll.pc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  @afzll.pc
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AD STORE. All rights reserved.</p>
          <p className="mt-1">Owner: Muhammed Afsal PC</p>
        </div>
      </div>
    </footer>
  );
}