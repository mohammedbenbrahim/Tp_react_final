import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer le stockage local
 * @param {string} key - La clé de stockage local
 * @param {any} initialValue - Valeur par défaut si rien dans localStorage
 * @returns {[any, function]} valeur + setter
 */
function useLocalStorage(key, initialValue) {
  // ======================
  // INIT STATE
  // ======================
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // ======================
  // SYNC WITH LOCALSTORAGE
  // ======================
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, value]);

  // ======================
  // RETURN
  // ======================
  return [value, setValue];
}

export default useLocalStorage;