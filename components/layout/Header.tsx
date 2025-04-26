'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X,
  User,
  Sun,
  Moon,
  Instagram
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm' 
          : 'bg-background'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight">AD STORE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search, Theme and Cart */}
          <div className="hidden md:flex items-center space-x-2">
            <form onSubmit={handleSearch} className="relative mr-2">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mr-1"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Link 
              href="https://www.instagram.com/afzll.pc/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="mr-1">
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Search, Cart and Menu */}
          <div className="flex items-center md:hidden space-x-2">
            {isMobileSearchOpen ? (
              <form 
                onSubmit={handleSearch}
                className="absolute inset-x-0 top-0 bg-background h-16 flex items-center px-4 z-10"
              >
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="flex-1"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="ml-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMobileSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                    <div className="flex flex-col h-full">
                      <div className="flex-1 py-6">
                        <nav className="flex flex-col space-y-1">
                          {navLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={cn(
                                'px-3 py-3 text-base font-medium rounded-md transition-colors',
                                pathname === link.href
                                  ? 'text-primary bg-primary/10'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              )}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </nav>
                      </div>

                      <div className="border-t border-border pt-4 pb-6 space-y-4">
                        <div className="flex items-center justify-between px-3">
                          <span className="text-sm font-medium">Switch Theme</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          >
                            {theme === 'dark' ? (
                              <Sun className="h-5 w-5" />
                            ) : (
                              <Moon className="h-5 w-5" />
                            )}
                          </Button>
                        </div>

                        <div className="px-3">
                          <Link 
                            href="https://www.instagram.com/afzll.pc/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-sm font-medium"
                          >
                            <Instagram className="h-5 w-5" />
                            <span>Follow on Instagram</span>
                          </Link>
                        </div>

                        <div className="px-3 text-sm text-muted-foreground">
                          <p>WhatsApp: +91 6282791439</p>
                          <p>Location: Malappuram, Vengara</p>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}