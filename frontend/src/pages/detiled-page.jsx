import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";

export default function DetailedPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL || ""}/api/notes/${id}`);
        const json = await res.json();
        console.log("note data:", json.data);

        setNote(json.data);
      } catch (error) {
        console.log("getting note operation failed", error);
      }
    }
    fetchNote();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    console.log("Updated:", { title: note?.title, content: note?.content });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL || ""}/api/notes/${note._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: note?.title, content: note?.content }),
        },
      );
      if (response.ok) {
        console.log("Note updated successfully");
        navigate("/");
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  return (
    <div className="min-h-dvh bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-10">
          <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">Edit Note</h1>
            <p className="text-zinc-400 mt-2 text-sm">
              Modify your note and save the updated version.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleUpdate}>
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Title</label>
              <input
                type="text"
                value={note?.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                placeholder="Update note title..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 
                   text-sm outline-none transition
                   focus:ring-2 focus:ring-[#00B7B5] focus:border-[#00B7B5]"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Content</label>
              <textarea
                rows="6"
                value={note?.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                placeholder="Update your content..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 
                   text-sm outline-none resize-none transition
                   focus:ring-2 focus:ring-[#00B7B5] focus:border-[#00B7B5]"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-5 py-3 rounded-xl text-sm font-medium
                   bg-zinc-800 border border-zinc-700
                   hover:bg-zinc-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-medium 
                   bg-[#00918e] hover:bg-[#00B7B5]
                   transition-all duration-200 
                   shadow-lg shadow-[#00B7B5]/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
