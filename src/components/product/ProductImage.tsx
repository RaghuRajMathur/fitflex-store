
import React, { useState } from "react";
import LazyImage from "@/components/LazyImage";

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // If no image src is provided, use a fallback image
  const imageSrc = src || "https://images.unsplash.com/photo-1561214078-f3247647fc5e?w=800&auto=format&fit=crop";

  return (
    <div 
      className="aspect-square md:sticky md:top-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <div className="relative w-full h-full overflow-hidden">
        <LazyImage
          src={imageSrc}
          alt={alt}
          className={`rounded-xl overflow-hidden h-full w-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-110' : 'scale-100'}`}
        />
      </div>
    </div>
  );
};

export default ProductImage;
