import { useState, useEffect, useCallback, useMemo } from "react";
import useDebounce from "./useDebounce";

const API = "https://dummyjson.com/posts";

function usePosts({
  searchTerm = "",
  tag = "",
  limit = 10,
  infinite = true,
} = {}) {
  // ======================
  // STATES
  // ======================
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Selected post (Exercice 4)
  const [selectedPost, setSelectedPost] = useState(null);

  // Debounced search (Exercice 2)
  const debouncedSearch = useDebounce(searchTerm, 500);

  // ======================
  // BUILD API URL
  // ======================
  const buildApiUrl = useCallback(
    (skipValue = 0) => {
      let url = `${API}?limit=${limit}&skip=${skipValue}`;

      if (debouncedSearch) {
        url = `${API}/search?q=${debouncedSearch}`;
        return url;
      }

      if (tag) {
        url = `${API}/tag/${tag}?limit=${limit}&skip=${skipValue}`;
      }

      return url;
    },
    [debouncedSearch, tag, limit]
  );

  // ======================
  // FETCH POSTS
  // ======================
  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const currentSkip = reset ? 0 : skip;
      const url = buildApiUrl(currentSkip);

      const res = await fetch(url);
      const data = await res.json();

      const newPosts = data.posts || [];

      if (reset || !infinite) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setSkip(currentSkip + limit);

      setHasMore(newPosts.length === limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // LOAD MORE (infinite scroll)
  // ======================
  const loadMore = () => {
    if (!loading && hasMore && infinite) {
      fetchPosts(false);
    }
  };

  // ======================
  // FETCH SINGLE POST
  // ======================
  const fetchPostById = async (id) => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/${id}`);
      const data = await res.json();

      setSelectedPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // UNIQUE TAGS (useMemo)
  // ======================
  const tags = useMemo(() => {
    const allTags = posts.flatMap((p) => p.tags || []);
    return [...new Set(allTags)];
  }, [posts]);

  // ======================
  // EFFECT: reload when filters change
  // ======================
  useEffect(() => {
    setSkip(0);
    fetchPosts(true);
  }, [debouncedSearch, tag]);

  // ======================
  // INIT LOAD
  // ======================
  useEffect(() => {
    fetchPosts(true);
  }, []);

  // ======================
  // RETURN
  // ======================
  return {
    posts,
    loading,
    error,

    // pagination
    hasMore,
    loadMore,

    // selection
    selectedPost,
    setSelectedPost,
    fetchPostById,

    // extras
    tags,

    // manual reload
    refetch: () => fetchPosts(true),
  };
}

export default usePosts;