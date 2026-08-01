import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  PlusIcon,
} from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../lib/api.js";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too quickly.", {
          icon: "⚠️",
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="btn btn-ghost gap-2 mb-6">
          <ArrowLeftIcon className="size-5" />
          Back
        </Link>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-6">
              Create New Note
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="label">
                  <span className="label-text font-medium">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter note title..."
                  className="input input-bordered w-full"
                  value={title}
                  disabled={loading}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="label">
                  <span className="label-text font-medium">
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="Write your thoughts..."
                  className="textarea textarea-bordered w-full h-64 resize-none"
                  value={content}
                  disabled={loading}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <PlusIcon className="size-4" />
                      Create Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;