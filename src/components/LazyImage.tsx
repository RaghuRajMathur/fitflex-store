
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage = ({ src, alt, className, style }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    // When an image fails to load, use a fallback image
    setImageSrc("https://images.unsplash.com/photo-1561214078-f3247647fc5e?w=800&auto=format&fit=crop");
  };

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default LazyImage;
