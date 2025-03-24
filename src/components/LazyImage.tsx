
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

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={error ? "https://images.unsplash.com/photo-1561214078-f3247647fc5e?w=800&auto=format&fit=crop" : src}
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
