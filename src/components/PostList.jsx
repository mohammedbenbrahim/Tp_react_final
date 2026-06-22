import React, { useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Post List Component
 */
function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true,
}) {
  // ======================
  // THEME
  // ======================
  const { theme } = useTheme();

  // ======================
  // INFINITE SCROLL OBSERVER
  // ======================
  const [observerRef, isVisible] = useIntersectionObserver({
    enabled: infiniteScroll,
    threshold: 0.1,
  });

  // Trigger load more when visible
  React.useEffect(() => {
    if (isVisible && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [isVisible, hasMore, onLoadMore]);

  // ======================
  // HANDLERS
  // ======================
  const handlePostClick = useCallback(
    (post) => {
      if (onPostClick) onPostClick(post);
    },
    [onPostClick]
  );

  const handleTagClick = useCallback(
    (e, tag) => {
      e.stopPropagation();
      if (onTagClick) onTagClick(tag);
    },
    [onTagClick]
  );

  // ======================
  // EMPTY STATE
  // ======================
  if (!loading && posts.length === 0) {
    return <p className="text-center mt-4">No posts found</p>;
  }

  return (
    <div className={`post-list ${theme}`}>
      {/* POSTS */}
      {posts.map((post) => (
        <div
          key={post.id}
          className={`card mb-3 ${theme === "dark" ? "bg-dark text-white" : ""}`}
          onClick={() => handlePostClick(post)}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">
              {post.body.length > 120
                ? post.body.slice(0, 120) + "..."
                : post.body}
            </p>

            {/* TAGS */}
            <div>
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="badge bg-primary me-1"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* LOADING */}
      {loading && <LoadingSpinner />}

      {/* INFINITE SCROLL TRIGGER */}
      {infiniteScroll && hasMore && (
        <div ref={observerRef} style={{ height: 20 }} />
      )}

      {/* LOAD MORE BUTTON (fallback mode) */}
      {!infiniteScroll && hasMore && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={onLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

// ======================
// OPTIMIZATION
// ======================
export default React.memo(PostList);