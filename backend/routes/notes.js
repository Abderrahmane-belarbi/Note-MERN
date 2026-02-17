import express from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/notes_controller.js";

const note_router = express.Router();

note_router.get("/", getNotes);

note_router.get("/:id", getNoteById);

note_router.post("/", createNote);

note_router.put("/:id", updateNote);

note_router.delete("/:id", deleteNote);

export default note_router;