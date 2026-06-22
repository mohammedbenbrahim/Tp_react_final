import React, { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Composant de recherche de posts
 */
function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = "",
}) {
  const [searchInput, setSearchInput] = useState("");

  // ======================
  // THEME
  // ======================
  const { theme } = useTheme();

  // ======================
  // SEARCH HANDLER (optimized)
  // ======================
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchInput(value);
      onSearch(value);
    },
    [onSearch]
  );

  // ======================
  // CLEAR SEARCH
  // ======================
  const clearSearch = () => {
    setSearchInput("");
    onSearch("");
  };

  // ======================
  // THEME CLASSES
  // ======================
  const themeClasses =
    theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";

  return (
    <div className={`mb-4 p-3 rounded ${themeClasses}`}>
      <div className="row">
        {/* SEARCH INPUT */}
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
            />

            {/* CLEAR BUTTON */}
            {searchInput && (
              <button
                className="btn btn-outline-secondary"
                onClick={clearSearch}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* TAG SELECTOR */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedTag}
            onChange={(e) => onTagSelect(e.target.value)}
          >
            <option value="">Tous les tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// ======================
// PERFORMANCE OPTIMIZATION
// ======================
export default React.memo(PostSearch);