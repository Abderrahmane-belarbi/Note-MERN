import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
export default function HomePage() {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function initNotes() {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL || ""}/api/notes`);
        const json = await res.json();
        console.log("data:", json);
        setNotes(json.data);
      } catch (error) {
        console.log("getting notes opeartion failed", error);
      } finally {
        setLoading(false)
      }
    }
    initNotes();
  }, [])
  return <div className="bg-[#181818] min-h-dvh">
    <Navbar />
    <div className="max-w-7xl mx-auto mt-8">
      {rateLimited && <RateLimitedUI />}
      {loading && <p className="w-full flex items-center justify-center text-white mx-auto my-20">Loading...</p>}
      { notes.length > 0 ? <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {notes.map((note) => <NoteCard key={note._id} note={note} setNotes={setNotes}/>)}
      </div> : !loading && <p className="text-white text-center mt-20">No notes found. Create your first note!</p>}
    </div>
  </div>;
}
