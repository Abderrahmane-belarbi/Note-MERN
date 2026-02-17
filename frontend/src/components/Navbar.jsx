import { BookOpenText, PlusIcon } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <header className="bg-[#262626] w-full p-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-[#00B7B5] font-bold tracking-tighter">
            <BookOpenText size={32} className="inline-block mr-2" />
            Note
          </h1>
          <Link to="/create">
            <button className="flex items-center gap-1 bg-[#005461] text-[#30caca] hover:bg-[#004450] text-sm font-medium cursor-pointer rounded-xl px-4 py-2">
            <PlusIcon size={16}/>
              Create Note
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
