
import React, { useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { useSeedProducts, useAllProducts } from '@/hooks/useSupabaseProducts';

const SupabaseInitializer: React.FC = () => {
  const { products } = useStore();
  const { seedProducts, isSeedComplete } = useSeedProducts();
  const { data: supabaseProducts } = useAllProducts();

  // Ensure we have products data available
  useEffect(() => {
    // We're now using the context products by default and can switch to 
    // Supabase products when needed using the component prop
    console.log("Store products available:", products.length);
    console.log("Supabase products available:", supabaseProducts?.length || 0);
  }, [products, supabaseProducts]);

  return null; // This component doesn't render anything
};

export default SupabaseInitializer;
