
import React, { useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { useSeedProducts } from '@/hooks/useSupabaseProducts';

const SupabaseInitializer: React.FC = () => {
  const { products } = useStore();
  const { seedProducts, isSeedComplete } = useSeedProducts();

  useEffect(() => {
    // Seed products from the store to Supabase if not already done
    if (!isSeedComplete && products.length > 0) {
      seedProducts(products);
    }
  }, [products, seedProducts, isSeedComplete]);

  return null; // This component doesn't render anything
};

export default SupabaseInitializer;
