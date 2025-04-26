'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<string>('1000');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync with URL params on load
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories([category]);
    }
    
    const min = searchParams.get('min_price');
    const max = searchParams.get('max_price');
    
    if (min) setMinPrice(min);
    if (max) setMaxPrice(max);
    if (min && max) setPriceRange([parseInt(min), parseInt(max)]);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    setMinPrice(value[0].toString());
    setMaxPrice(value[1].toString());
  };

  const handlePriceInputChange = (type: 'min' | 'max', value: string) => {
    if (type === 'min') {
      setMinPrice(value);
      if (value && !isNaN(parseInt(value))) {
        setPriceRange([parseInt(value), priceRange[1]]);
      }
    } else {
      setMaxPrice(value);
      if (value && !isNaN(parseInt(value))) {
        setPriceRange([priceRange[0], parseInt(value)]);
      }
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Handle categories
    if (selectedCategories.length === 1) {
      params.set('category', selectedCategories[0]);
    } else if (selectedCategories.length > 1) {
      // Most APIs don't support multiple categories, but we'll include it in the params
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('category');
      params.delete('categories');
    }
    
    // Handle price range
    if (minPrice && parseInt(minPrice) > 0) {
      params.set('min_price', minPrice);
    } else {
      params.delete('min_price');
    }
    
    if (maxPrice && parseInt(maxPrice) < 1000) {
      params.set('max_price', maxPrice);
    } else {
      params.delete('max_price');
    }
    
    router.push(`/products?${params.toString()}`);
    setShowMobileFilters(false);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setMinPrice('0');
    setMaxPrice('1000');
    router.push('/products');
    setShowMobileFilters(false);
  };

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'jewelery', name: 'Jewelry' },
    { id: "men's clothing", name: "Men's Clothing" },
    { id: "women's clothing", name: "Women's Clothing" },
  ];

  return (
    <>
      {/* Mobile Filters Toggle */}
      <div className="md:hidden mb-6">
        <Button 
          onClick={() => setShowMobileFilters(!showMobileFilters)} 
          variant="outline" 
          className="w-full"
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Filters */}
      <div className={`space-y-6 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
        <div className="bg-card rounded-lg shadow-sm border border-border p-5">
          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories" className="border-none">
              <AccordionTrigger className="py-2">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label 
                        htmlFor={category.id} 
                        className="text-sm font-normal cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price" className="border-none">
              <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={handleSliderChange}
                    className="my-6"
                  />
                  
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <Label htmlFor="min-price" className="text-xs mb-1 block">Min</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="min-price"
                          type="number"
                          min="0"
                          max="999"
                          value={minPrice}
                          onChange={(e) => handlePriceInputChange('min', e.target.value)}
                          className="pl-7"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="max-price" className="text-xs mb-1 block">Max</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="max-price"
                          type="number"
                          min="1"
                          max="1000"
                          value={maxPrice}
                          onChange={(e) => handlePriceInputChange('max', e.target.value)}
                          className="pl-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
    </>
  );
}