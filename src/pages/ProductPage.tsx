
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import LazyImage from "@/components/LazyImage";
import QuantitySelector from "@/components/QuantitySelector";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, StarHalf, Truck, ShieldCheck, RotateCcw, ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn, formatCurrency } from "@/lib/utils";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, toggleLike, isLiked, addToCart, getProductsByCategory } = useStore();
  const [quantity, setQuantity] = useState(1);
  const product = getProductById(id || "");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <Layout>
        <div className="max-container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const liked = isLiked(product.id);
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  
  const handleToggleLike = () => {
    toggleLike(product.id);
  };
  
  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("Sorry, this product is out of stock");
      return;
    }
    
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  
  return (
    <Layout>
      <div className="max-container py-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square md:sticky md:top-24">
            <LazyImage
              src={product.image}
              alt={product.name}
              className="rounded-xl overflow-hidden h-full"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="capitalize mb-3">
                {product.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < Math.ceil(product.rating) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.reviews} reviews)
                  </span>
                </div>
              )}
            </div>
            
            {/* Price */}
            <div>
              <p className="text-2xl font-semibold">
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>
            
            {/* Add to Cart */}
            <div className="pt-2">
              <div className="flex items-center space-x-4 mb-6">
                <QuantitySelector
                  quantity={quantity}
                  onChange={handleQuantityChange}
                  max={10}
                />
                
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-full",
                    liked && "text-primary border-primary"
                  )}
                  onClick={handleToggleLike}
                >
                  <Heart className={cn("h-5 w-5", liked && "fill-primary")} />
                  <span className="sr-only">
                    {liked ? "Remove from favorites" : "Add to favorites"}
                  </span>
                </Button>
              </div>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span className="text-sm">Free shipping over {formatCurrency(10000)}</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span className="text-sm">10-year warranty</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span className="text-sm">30-day returns</span>
                </div>
              </div>
            </div>
            
            {/* Product Details Tabs */}
            <Tabs defaultValue="specifications" className="mt-8">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="warranty">Warranty</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="pt-4">
                {product.specs ? (
                  <div className="space-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex py-2 border-b last:border-0">
                        <span className="w-1/3 font-medium">{key}</span>
                        <span className="w-2/3 text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Detailed specifications not available for this product.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="shipping" className="pt-4">
                <div className="space-y-4">
                  <p>
                    We offer free standard shipping on all orders over {formatCurrency(10000)}. Orders under {formatCurrency(10000)} have a flat shipping rate of {formatCurrency(895)}.
                  </p>
                  <p>
                    <strong>Delivery times:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Standard Shipping: 3-5 business days</li>
                    <li>Express Shipping: 1-2 business days (additional {formatCurrency(1295)})</li>
                  </ul>
                  <p>
                    International shipping is available for select countries. Rates and delivery times vary by location.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="warranty" className="pt-4">
                <div className="space-y-4">
                  <p>
                    All FlexFitness products come with our industry-leading 10-year warranty against manufacturing defects.
                  </p>
                  <p>
                    Our warranty covers:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Structural failures due to materials or workmanship</li>
                    <li>Welds and moving parts</li>
                    <li>Surface finish against peeling or cracking</li>
                  </ul>
                  <p>
                    Normal wear and tear, improper assembly, and damage due to misuse are not covered by the warranty.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-display font-bold mb-8">
              You might also like
            </h2>
            <ProductGrid products={relatedProducts} variant="default" columns={4} />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
