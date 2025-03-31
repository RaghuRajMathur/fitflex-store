
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/context/StoreContext";
import { toast } from "sonner";

// Type for Supabase product data
type SupabaseProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  description?: string;
  stock: number;
  featured?: boolean;
  rating?: number;
  reviews?: number;
  specs?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
};

// Helper function to convert Supabase product to app Product type
const mapSupabaseProductToAppProduct = (data: SupabaseProduct): Product => ({
  id: data.id,
  name: data.name,
  category: data.category,
  price: Number(data.price),
  image: data.image_url || "",
  description: data.description || "",
  inStock: (data.stock || 0) > 0,
  featured: data.featured || false,
  rating: data.rating || 0,
  reviews: data.reviews || 0,
  specs: data.specs || {}
});

// Hook to fetch a single product from Supabase
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        
        if (!data) {
          throw new Error("Product not found");
        }

        // Transform Supabase product to match our application's Product type
        return mapSupabaseProductToAppProduct(data as SupabaseProduct);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        toast.error(error.message || "Error fetching product");
        return null;
      }
    },
    enabled: !!id
  });
};

// Hook to fetch related products (same category) from Supabase
export const useRelatedProducts = (categoryName: string, currentProductId: string) => {
  return useQuery({
    queryKey: ["relatedProducts", categoryName, currentProductId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", categoryName)
          .neq("id", currentProductId)
          .limit(4);

        if (error) throw error;

        // Transform Supabase products to match our application's Product type
        return (data || []).map((item: SupabaseProduct) => 
          mapSupabaseProductToAppProduct(item)
        );
      } catch (error: any) {
        console.error("Error fetching related products:", error);
        toast.error("Error fetching related products");
        return [];
      }
    },
    enabled: !!categoryName && !!currentProductId
  });
};

// Hook to seed initial product data to Supabase (if needed)
export const useSeedProducts = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeedComplete, setIsSeedComplete] = useState(false);

  const seedProducts = async (products: Product[]) => {
    setIsSeeding(true);
    
    try {
      const { data: existingProducts, error: countError } = await supabase
        .from("products")
        .select("id")
        .limit(1);
      
      if (countError) throw countError;
      
      // Only seed if there are no products yet
      if (existingProducts && existingProducts.length === 0) {
        for (const product of products) {
          const { error } = await supabase
            .from("products")
            .insert({
              id: product.id,
              name: product.name,
              category: product.category,
              price: product.price,
              image_url: product.image,
              description: product.description,
              stock: product.inStock ? 10 : 0,
              featured: product.featured || false,
              rating: product.rating || 0,
              reviews: product.reviews || 0,
              specs: product.specs || {}
            });
            
          if (error) throw error;
        }
        toast.success("Products seeded successfully");
      }
      
      setIsSeedComplete(true);
    } catch (error: any) {
      console.error("Error seeding products:", error);
      toast.error(error.message || "Error seeding products");
    } finally {
      setIsSeeding(false);
    }
  };

  return { seedProducts, isSeeding, isSeedComplete };
};
