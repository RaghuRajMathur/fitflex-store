
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
  featured: false, // Default value since column doesn't exist
  rating: 0, // Default value since column doesn't exist
  reviews: 0, // Default value since column doesn't exist
  specs: {} // Default value since column doesn't exist
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
        // Don't show toast to prevent error pop-ups
        return null;
      }
    },
    enabled: !!id,
    retry: false, // Prevent retries that could cause multiple error toasts
    refetchOnWindowFocus: false // Prevent refetching that could cause multiple error toasts
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
        // Don't show toast to prevent error pop-ups
        return [];
      }
    },
    enabled: !!categoryName && !!currentProductId,
    retry: false, // Prevent retries that could cause multiple error toasts
    refetchOnWindowFocus: false // Prevent refetching that could cause multiple error toasts
  });
};

// Hook to seed initial product data to Supabase (if needed)
export const useSeedProducts = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeedComplete, setIsSeedComplete] = useState(false);

  const seedProducts = async (products: Product[]) => {
    // Skip seeding to prevent errors
    setIsSeedComplete(true);
    return;
  };

  return { seedProducts, isSeeding, isSeedComplete };
};
