import React, { useState, useCallback } from "react";
import "./App.css";

// Components
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import PostDetails from "./components/PostDetails";
import ThemeToggle from "./components/ThemeToggle";

// Hooks
import usePosts from "./hooks/usePosts";
import useLocalStorage from "./hooks/useLocalStorage";

// Theme
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  // ======================
  // STATES
  // ======================
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // ======================
  // LOCAL STORAGE (scroll mode)
  // ======================
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage(
    "infiniteScroll",
    true
  );

  // ======================
  // POSTS HOOK
  // ======================
  const {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    selectedPost,
    setSelectedPost,
    fetchPostById,
    tags,
  } = usePosts({
    searchTerm,
    tag: selectedTag,
    infinite: infiniteScroll,
  });

  // ======================
  // HANDLERS (optimized)
  // ======================
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleTagSelect = useCallback((tag) => {
    setSelectedTag(tag);
  }, []);

  const handlePostClick = useCallback((post) => {
    fetchPostById(post.id);
  }, [fetchPostById]);

  const handleCloseDetails = () => {
    setSelectedPost(null);
  };

  // ======================
  // UI
  // ======================
  return (
    <ThemeProvider>
      <div className="container py-4">

        {/* HEADER */}
        <header className="pb-3 mb-4 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold">Blog</h1>
            <ThemeToggle />
          </div>
        </header>

        {/* SEARCH */}
        <PostSearch
          onSearch={handleSearchChange}
          onTagSelect={handleTagSelect}
          availableTags={tags}
          selectedTag={selectedTag}
        />

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* POST DETAILS */}
        {selectedPost && (
          <PostDetails
            post={selectedPost}
            onClose={handleCloseDetails}
            onTagClick={handleTagSelect}
          />
        )}

        {/* POSTS LIST */}
        <PostList
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onPostClick={handlePostClick}
          onTagClick={handleTagSelect}
          infiniteScroll={infiniteScroll}
        />

        {/* FOOTER */}
        <footer className="pt-3 mt-4 text-center border-top">
          <p>
            TP React Hooks Blog · {new Date().getFullYear()}
          </p>
        </footer>

      </div>
    </ThemeProvider>
  );
}

export default App;