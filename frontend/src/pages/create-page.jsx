"use client";

import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import CreateNoteForm from "../components/CreateNoteFrom.jsx";

export default function CreateNotePage() {

  return (
    <div className="min-h-dvh bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <CreateNoteForm />
      </div>
    </div>
  );
}
