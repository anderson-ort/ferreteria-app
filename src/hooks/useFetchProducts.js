import { useState, useEffect, useCallback } from 'react';
import { productServiceSupabase } from '../lib/services/products/productServiceSupabase';
import { useProductsStore } from '../store/productStore';

export const useFetchProducts = () => {
  const { products, setProducts } = useProductsStore();
  const [loading, setLoading] = useState(products.length === 0);
  const [error, setError] = useState(null);


  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productServiceSupabase.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    } else {
      setLoading(false);
    }
  }, [products.length, loadProducts]);

  return { products, loading, error, refresh: loadProducts };
};
