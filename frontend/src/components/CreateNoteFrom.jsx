import { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  console.log({title, content});

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted:", { title, content });
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL || ""}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        console.log("Note created successfully");
        navigate("/");
        setTitle("");
        setContent("");
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create New Note
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">
          Capture your thoughts clearly and structure them well.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note content here..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 
                           text-sm outline-none resize-none transition
                           focus:ring-2 focus:ring-[#00B7B5] focus:border-[#00B7B5]"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl text-sm font-medium 
                           bg-[#00918e] hover:bg-[#00B7B5]
                           transition-all duration-200 
                           shadow-lg shadow-[#00B7B5]/20 cursor-pointer"
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
}
