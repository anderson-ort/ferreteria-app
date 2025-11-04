import { useEffect, useState } from 'react';
import { productServiceAPIQuery } from '../lib/services/products/productServiceAPIQuery';




export const useFetchProductsAPIQuery = (query, debounceTime = 1000) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    // Creamos un timeout para debounce
    const handler = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productServiceAPIQuery.getProducts(query);

        const productos = await data.results.map((product) => {

          const { _, ...cleanProduct } = product

          return cleanProduct
        })
        console.log(productos);

        setProducts(productos);
      } catch (err) {
        setError(err.message || 'Error al obtener los productos');
      } finally {
        setLoading(false);
      }
    }, debounceTime);

    // Limpiamos el timeout si query cambia antes de que se cumpla debounceTime
    return () => clearTimeout(handler);

  }, [query, debounceTime]);

  return { products, loading, error };
};
