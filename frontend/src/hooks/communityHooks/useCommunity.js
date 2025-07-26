const BASE_URL =
  import.meta.env.VITE_ENV === "production"
    ? import.meta.env.VITE_API_PROD
    : import.meta.env.VITE_API_LOCAL;

const request = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}/api/community${endpoint}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  } catch (err) {
    console.error("Community API Error:", err);
    throw err;
  }
};

const useCommunity = {
  createPost: (body) =>
    request("/community-posts", {
      method: "POST",
      body: JSON.stringify(body),
    }),

    // Create/read/update/delete forum posts 

  updatePost: (id, body) =>
    request(`/community-posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  reportPost: (id, reason) =>
    request(`/community-posts/${id}/report`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),

  deletePost: (id) => request(`/community-posts/${id}`, { method: "DELETE" }),

  upvotePost: (id) =>
    request(`/community-posts/${id}/upvote`, { method: "POST" }),

  downvotePost: (id) =>
    request(`/community-posts/${id}/downvote`, { method: "POST" }),

  getPosts: (category, sort = "newest", offset = 0, limit = 10) => {
    const q = new URLSearchParams();
    if (category && category !== "all" && String(category).trim())
    q.append("category", category);
    q.append("sort", sort);
    q.append("offset", offset);
    q.append("limit", limit);
    return request(`/community-posts?${q.toString()}`);
  },

  getSinglePost: (id) => request(`/community-posts/${id}`),

  // Create/read/update/delete comments on posts

  addComment: (postId, body) =>
    request(`/community-posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateComment: (commentId, content) =>
    request(`/community-comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    }),

  deleteComment: (commentId) =>
    request(`/community-comments/${commentId}`, { method: "DELETE" }),

  upvoteComment: (commentId) =>
    request(`/community-comments/${commentId}/upvote`, { method: "POST" }),

  downvoteComment: (commentId) =>
    request(`/community-comments/${commentId}/downvote`, { method: "POST" }),

  reportComment: (commentId, reason) =>
    request(`/community-comments/${commentId}/report`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),

  getCommentsForPost: (postId, { limit = 20, offset = 0 } = {}) =>
    request(
      `/community-posts/${postId}/comments?limit=${limit}&offset=${offset}`
    ),
};

export default useCommunity;
