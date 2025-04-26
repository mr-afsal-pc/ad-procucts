'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  
  // Handle cases where no images are provided
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">No image available</span>
      </div>
    );
  }

  // If only one image is provided, display it without thumbnails
  if (images.length === 1) {
    return (
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute top-4 right-4 bg-background/80 p-2 rounded-full hover:bg-background/100 transition-colors z-10">
              <ZoomIn className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative h-[80vh] w-full">
              <Image
                src={images[0]}
                alt="Product image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </DialogContent>
        </Dialog>
        <Image
          src={images[0]}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'contain' }}
          priority
          className="p-6"
        />
      </div>
    );
  }

  // For multiple images, display with thumbnails and navigation
  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute top-4 right-4 bg-background/80 p-2 rounded-full hover:bg-background/100 transition-colors z-10">
              <ZoomIn className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative h-[80vh] w-full">
              <Image
                src={images[activeImage]}
                alt={`Product image ${activeImage + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </DialogContent>
        </Dialog>
        
        <Image
          src={images[activeImage]}
          alt={`Product image ${activeImage + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'contain' }}
          priority
          className="p-6"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background/100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background/100 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={cn(
                "relative h-20 w-20 border rounded-md overflow-hidden transition-all",
                activeImage === index ? "border-primary ring-2 ring-primary/20" : "border-border"
              )}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                fill
                sizes="80px"
                style={{ objectFit: 'contain' }}
                className="p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}