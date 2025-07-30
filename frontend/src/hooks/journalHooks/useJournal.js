import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const isDev = import.meta.env.VITE_ENV === "development";
const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_LOCAL + "/api/journals"
  : import.meta.env.VITE_API_PROD + "/api/journals";

export const useJournal = () => {
  const [journals, setJournals] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const entriesPerPage = 5;

  const { toast } = useToast();

  const handleError = (err, fallback = "An error occurred.") => {
    console.error(fallback, err);
    setError(err);
    toast({
      title: "Error!",
      description: err?.response?.data?.error || fallback,
      variant: "error",
    });
  };

  const fetchJournals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_BASE_URL, { withCredentials: true });
      setJournals(res.data);
    } catch (err) {
      handleError(err, "Failed to retrieve log entries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const totalPages = Math.ceil(journals.length / entriesPerPage);
  const currentEntries = journals.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error!",
        description: "Please fill in all fields!",
        variant: "error",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (editingJournal) {
        await axios.put(`${API_BASE_URL}/${editingJournal.id}`, formData, {
          withCredentials: true,
        });
        toast({ title: "Success!", description: "Journal entry updated!" });
      } else {
        await axios.post(API_BASE_URL, formData, { withCredentials: true });
        toast({
          title: "Success!",
          description: "New journal entry created!",
          variant: "success",
        });
      }

      await fetchJournals();
      setFormData({ title: "", content: "" });
      setEditingJournal(null);
      setIsDialogOpen(false);
    } catch (err) {
      handleError(err, "Failed to save journal entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_BASE_URL}/${id}`, { withCredentials: true });
      toast({ title: "Deleted!", description: "Journal entry deleted!" });
      await fetchJournals();

      const newTotalPages = Math.ceil((journals.length - 1) / entriesPerPage);
      setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
    } catch (err) {
      handleError(err, "Failed to delete journal entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setFormData({ title: journal.title, content: journal.content });
    setIsDialogOpen(true);
  };

  const handleNewEntry = () => {
    setEditingJournal(null);
    setFormData({ title: "", content: "" });
    setIsDialogOpen(true);
  };

  return {
    journals,
    currentEntries,
    totalPages,
    currentPage,
    setCurrentPage,
    isDialogOpen,
    setIsDialogOpen,
    editingJournal,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleNewEntry,
    loading,
    error,
    fetchJournals,
  };
};
