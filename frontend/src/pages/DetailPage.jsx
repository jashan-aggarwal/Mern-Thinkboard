import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  LoaderIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../lib/api.js";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <h2 className="text-2xl font-bold">Note not found</h2>
          <Link to="/" className="btn btn-primary">
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="btn btn-ghost gap-2">
            <ArrowLeftIcon className="size-5" />
            Back
          </Link>
          <button
            className="btn btn-outline btn-error gap-2"
            disabled={saving}
            onClick={handleDelete}
          >
            <Trash2Icon className="size-4" />
            Delete
          </button>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="mb-5">
              <label className="label">
                <span className="label-text font-medium">
                  Title
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter note title..."
                value={note.title}
                onChange={(e) =>
                  setNote({
                    ...note,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-medium">
                  Content
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-64 resize-none"
                placeholder="Write your thoughts..."
                value={note.content}
                onChange={(e) =>
                  setNote({
                    ...note,
                    content: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-60">
                Created {formatDate(new Date(note.createdAt))}
              </span>
              <button
                className="btn btn-primary gap-2"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="size-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;