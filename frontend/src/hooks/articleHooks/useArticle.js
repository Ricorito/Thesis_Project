import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../contexts/authContext";
import { useToast } from "@/hooks/use-toast";

const API_URL =
  import.meta.env.VITE_ENV === "production"
    ? import.meta.env.VITE_API_PROD
    : import.meta.env.VITE_API_LOCAL;

const POSTS_PER_PAGE = 5;

const interleavePostsByCategory = (postsByCategory) => {
  const categories = Object.keys(postsByCategory);
  const pointers = {};
  categories.forEach((cat) => (pointers[cat] = 0));

  const result = [];
  let added;
  do {
    added = false;
    for (const cat of categories) {
      const catPosts = postsByCategory[cat];
      const idx = pointers[cat];
      if (idx < catPosts.length) {
        result.push(catPosts[idx]);
        pointers[cat]++;
        added = true;
      }
    }
  } while (added);

  return result;
};

export const getTextFromHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export const useArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { toast } = useToast();
  const queryCat = location.search;
  const editState = location.state;

  // 🌐 Article list view
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 📝 Article editor view
  const [title, setTitle] = useState(editState?.title || "");
  const [desc, setDesc] = useState(editState?.desc || "");
  const [cat, setCat] = useState(editState?.cat || "");
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(editState?.img || "");
  const [saving, setSaving] = useState(false);

  // 📄 Single article view
  const [articleDetail, setArticleDetail] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const postId = location.pathname.split("/")[2];
  const [isAdmin, setIsAdmin] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

const fetchRelatedPosts = useCallback(async (cat, currentPostId) => {
  if (!cat) return;

  try {
    const res = await axios.get(`${API_URL}/api/posts/?cat=${cat}`,
      { withCredentials: true }
    );
    const filtered = res.data.filter(
      (post) => post.id !== Number(currentPostId)
    );
    setRelatedPosts(filtered);
  } catch (err) {
    console.error("Error fetching related posts:", err);
  }
}, []);

const checkIfAdmin = useCallback(async () => {
  try {
    const res = await axios.get(`${API_URL}/api/users/profile`, {
      withCredentials: true,
    });

    if (res.data.role === "admin") {
      setIsAdmin(true);
    }
  } catch (err) {
    console.error("Failed to fetch profile for admin check:", err);
  }
}, []);

useEffect(() => {
  checkIfAdmin();
}, [checkIfAdmin]);

  const upload = async () => {
    if (!file) return currentImage;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("context", "article");

      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  // 📝 Submit (new or update)
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setSaving(true);

    const imgUrl = await upload();

    try {
      if (editState?.id) {
        await axios.put(
          `${API_URL}/api/posts/${editState.id}`,
          { title, desc, cat, img: imgUrl || "" },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${API_URL}/api/posts`,
          {
            title,
            desc,
            cat,
            img: imgUrl || "",
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
          { withCredentials: true }
        );
      }

      navigate("/articles");
    } catch (err) {
      console.error("Article submission error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/posts/${postId}`, {
        withCredentials: true,
      });

      toast({
        title: "Post deleted",
        description: "The article has been successfully removed.",
      });

      navigate("/");
    } catch (err) {
      console.error("Deletion error:", err);
      toast({
        title: "Deletion failed",
        description: "Unable to delete the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchPosts = useCallback(async () => {
    try {
      const { data: allPosts } = await axios.get(`${API_URL}/api/posts${queryCat}`,
        { withCredentials: true }
      );

      const postsByCategory = allPosts.reduce((acc, post) => {
        if (!acc[post.cat]) acc[post.cat] = [];
        acc[post.cat].push(post);
        return acc;
      }, {});

      Object.keys(postsByCategory).forEach((cat) => {
        postsByCategory[cat] = postsByCategory[cat].slice(-3);
      });

      const rotatedPosts = interleavePostsByCategory(postsByCategory);

      setPosts(rotatedPosts);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, [queryCat]);

  const fetchArticle = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/posts/${postId}`,
        { withCredentials: true }
      );
      setArticleDetail(res.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error loading post",
        description: "Something went wrong while fetching the article.",
        variant: "destructive",
      });
    }
  }, [postId, toast]);

  useEffect(() => {
    if (location.pathname.startsWith("/post/")) {
      fetchArticle();
    } else {
      fetchPosts();
    }
  }, [location.pathname, fetchPosts, fetchArticle]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = useMemo(() => Math.ceil(posts.length / POSTS_PER_PAGE), [posts]);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  return {
    currentPosts,
    totalPages,
    currentPage,
    setCurrentPage,
    getTextFromHTML,

    title,
    setTitle,
    desc,
    setDesc,
    cat,
    setCat,
    file,
    setFile,
    currentImage,
    saving,
    handleSubmit,

    articleDetail,
    postId,
    currentUser,
    showConfirm,
    setShowConfirm,
    handleDelete,

    isAdmin,

    relatedPosts,
  fetchRelatedPosts,
  };
};
