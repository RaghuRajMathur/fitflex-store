
import React from "react";
import LazyImage from "@/components/LazyImage";

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div className="aspect-square md:sticky md:top-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <LazyImage
        src={src}
        alt={alt}
        className="rounded-xl overflow-hidden h-full hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

export default ProductImage;
