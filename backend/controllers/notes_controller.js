import Note from "../models/Note.js";

export async function getNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    if (notes) console.log("Notes:", notes);
    res.status(200).json({ data: notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching notes.`, error: error.message });
  }
}

export async function getNoteById(req, res) {
  try {
    const _id = req.params.id;
    const note = await Note.findById(_id);
    if (!note) res.status(404).json({ message: "Note not found" });
    res.status(200).json({ data: note });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching note.`, error: error.message });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const createdNote = await Note.create({ title, content });
    res.status(201).json(createdNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error Creating Note.`, error: error.message });
  }
}

export async function updateNote(req, res) {
  try {
    const _id = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id },
      { title, content },
      { new: true },
    );
    if (!updatedNote) res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error Updating Note.`, error: error.message });
  }
}

export async function deleteNote(req, res) {
  try {
    const _id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(_id);
    if (!deletedNote) res.status(404).json({ message: "Note not found" });
    res.status(200).json(deletedNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error Deleting Note.`, error: error.message });
  }
}
