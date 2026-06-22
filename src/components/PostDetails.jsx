import React, { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Post Details Component
 */
function PostDetails({ post, onClose, onTagClick }) {
  // ======================
  // THEME
  // ======================
  const { theme } = useTheme();

  // ======================
  // THEME CLASSES (memoized)
  // ======================
  const themeClasses = useMemo(() => {
    return {
      card: theme === "dark" ? "bg-dark text-white" : "",
      badge: theme === "dark" ? "bg-light text-dark" : "bg-primary",
      button: theme === "dark" ? "btn btn-light" : "btn btn-dark",
    };
  }, [theme]);

  // ======================
  // EMPTY STATE
  // ======================
  if (!post) return null;

  return (
    <div className={`card mb-4 ${themeClasses.card}`}>
      {/* HEADER */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>

        <button
          className={`btn btn-sm ${themeClasses.button}`}
          onClick={onClose}
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="card-body">
        {/* CONTENT */}
        <p className="card-text">{post.body}</p>

        {/* META INFO */}
        <div className="mb-3">
          <small className="text-muted">
            👤 User ID: {post.userId} | ❤️ Reactions: {post.reactions}
          </small>
        </div>

        {/* TAGS */}
        <div>
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className={`badge me-1 ${themeClasses.badge}`}
              style={{ cursor: "pointer" }}
              onClick={() => onTagClick && onTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================
// OPTIMIZATION
// ======================
export default React.memo(PostDetails);