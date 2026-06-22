import { useState, useEffect, useRef } from "react";

/**
 * Hook personnalisé pour détecter la visibilité d’un élément
 */
function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = "0px",
} = {}) {
  // ======================
  // STATE
  // ======================
  const [isIntersecting, setIsIntersecting] = useState(false);

  // ======================
  // REF
  // ======================
  const ref = useRef(null);

  // ======================
  // OBSERVER
  // ======================
  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [enabled, threshold, rootMargin]);

  // ======================
  // RETURN
  // ======================
  return [ref, isIntersecting];
}

export default useIntersectionObserver;