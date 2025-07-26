import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const API_URL =
  import.meta.env.VITE_ENV === 'production'
    ? import.meta.env.VITE_API_PROD
    : import.meta.env.VITE_API_LOCAL;

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/profile`, {
        withCredentials: true,
      });
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast({
        title: "Demo Mode",
        description: "Failed to load profile. Displaying demo data instead.",
        variant: "destructive",
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const { name, username, email, img, newPassword } = profile;
      const payload = { name, username, email, img };
      if (newPassword) {
        payload.newPassword = newPassword;
      }

      await axios.put(`${API_URL}/api/users/profile`, payload, {
        withCredentials: true,
      });

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
        variant: "success",
      });
    } catch (err) {
      console.error("Update failed:", err);
      toast({
        title: "Save failed (Demo Mode)",
        description: "Changes were saved locally only.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
      setIsEditing(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const filename = res.data;
      handleChange({ target: { name: "img", value: `/upload/${filename}` } });
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isEditing,
    loading,
    saving,
    uploading,
    error,
    setIsEditing,
    handleChange,
    handleUpdate,
    handleFileUpload,
  };
};
