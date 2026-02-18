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
        const res = await fetch('http://localhost:3000/api/notes');
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
      {loading && <p className="text-white">Loading...</p>}
      { notes.length > 0 && <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {notes.map((note) => <NoteCard key={note._id} note={note}/>)}
      </div>}
    </div>
  </div>;
}
