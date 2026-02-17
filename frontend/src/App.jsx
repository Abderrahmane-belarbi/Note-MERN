import { Route, Routes } from "react-router";
import HomePage from "./pages/home-page";
import CreateNotePage from "./pages/create-page";
import NoteDetailedPage from "./pages/note-detiled-page";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<HomePage />}/>
        <Route path="/create" element={<CreateNotePage />}/>
        <Route path="/note/:id" element={<NoteDetailedPage />}/>
      </Routes>
    </div>
  )
}