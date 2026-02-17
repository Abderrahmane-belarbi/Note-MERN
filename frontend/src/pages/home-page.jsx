import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
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
    {rateLimited && <RateLimitedUI />}
    {notes.map((note) => (
      <p className="text-white" key={note.title}>{note.title}</p>
    ))}
  </div>;
}
