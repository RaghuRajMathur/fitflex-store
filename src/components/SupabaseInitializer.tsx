
import React, { useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { useSeedProducts } from '@/hooks/useSupabaseProducts';

const SupabaseInitializer: React.FC = () => {
  const { products } = useStore();
  const { seedProducts, isSeedComplete } = useSeedProducts();

  // Skip automatic seeding to prevent errors
  useEffect(() => {
    // We're skipping seeding to prevent database errors
    // If you need to seed the database, use a proper UUID format for IDs
  }, []);

  return null; // This component doesn't render anything
};

export default SupabaseInitializer;
