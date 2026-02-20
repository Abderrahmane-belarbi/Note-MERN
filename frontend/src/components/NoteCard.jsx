import { Edit, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../../../backend/lib/utils.js";

export default function NoteCard({ note, setNotes }) {
  const navigator = useNavigate();
  async function handleDelete(id) {
    try {
      const deleted = await fetch(`${import.meta.env.VITE_BASE_URL || ""}/api/notes/${id}`, {
        method: "DELETE",
      });
      if(!deleted) console.log("Note not found, can't delete");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log("deleting note operation failed");
    }
  } 
  return (
    <div
      key={note.title}
      className="flex flex-col justify-between min-w-sm h-44 bg-[#262626] border-t-4 border-[#00B7B5] rounded-lg p-6 hover:shadow-xl transition-shadow duration-200"
    >
      <Link to={`/notes/${note._id}`} className="flex flex-col gap-2">
        <h1 className="text-[22px] capitalize font-bold text-white">{note.title}</h1>
        <p className="text-[16px] text-gray-400 line-clamp-3">{note.content}</p>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-gray-400 text-sm">{formatDate(note.createdAt)}</p>
        <div className="flex items-center gap-4">
          <button onClick={() => {navigator(`/note/${note._id}`)}}>
            <Edit className="text-gray-100 cursor-pointer" size={16}/>
          </button>
          <button onClick={() => {handleDelete(note._id)}}>
            <Trash2Icon className="text-red-400 cursor-pointer" size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}
