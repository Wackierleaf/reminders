import React from "react";
import { Note } from "../Note/Note";
import "./NotesContainer.css";
import { NotesData } from "../../NotesData";

interface Props {
  notes: NotesData[];
  flag: boolean;
  bundelId: number;
  deleteHandler: any;
}

export const NotesContainer = ({ notes, flag, bundelId, deleteHandler }: Props) => (
  <div className="NotesContainer">
    {notes.map((note) => (
      <Note key={note.id} note={note} deleteBtnFlag={flag} bundelId={bundelId} deleteHandler={deleteHandler} />
    ))}
  </div>
);
