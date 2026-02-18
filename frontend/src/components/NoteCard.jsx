import { Edit, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../../../backend/lib/utils.js";

export default function NoteCard({ note }) {
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
          <button onClick={() => {}}>
            <Edit className="text-gray-100 cursor-pointer" size={16}/>
          </button>
          <button onClick={() => {}}>
            <Trash2Icon className="text-red-400 cursor-pointer" size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}
