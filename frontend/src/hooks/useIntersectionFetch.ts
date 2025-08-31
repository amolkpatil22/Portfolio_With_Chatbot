import { useState, useEffect, useCallback } from 'react';

export const useIntersectionFetch = <T>(
  fetchFn: () => Promise<T>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    if (hasLoaded || loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn();
      setData(result);
      setHasLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, hasLoaded, loading]);

  useEffect(() => {
    if (!ref || hasLoaded) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchData();
        observer.disconnect();
      }
    }, options);
    
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, hasLoaded, fetchData, options]);

  return { data, loading, error, setRef, refetch: fetchData };
};