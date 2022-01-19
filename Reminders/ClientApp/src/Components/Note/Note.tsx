import React, { ReactNode } from "react";
import "./Note.css";
import { NotesData } from "../../NotesData";
import { NoteFooter } from "../NoteFooter/NoteFooter";

interface Props {
  note: NotesData;
  deleteBtnFlag: boolean;
  bundelId: number;
  deleteHandler: any;
}

export const Note = ({ note, deleteBtnFlag, bundelId, deleteHandler }: Props) => {
  const noteColor = {
    backgroundColor: note.color,
  };

  const renderDeleteBtn = (): ReactNode => {
    return <i className="fas fa-window-close delete-icon" onClick={deleteHandler.bind(this, note.id, bundelId)}></i>;
  };

  const renderFooter = (): ReactNode => {
    if (note.time && note.timeToRemind) {
      return (
        <div>
          <NoteFooter time={note.time} timeToRemind={note.timeToRemind} />
          <hr className="divide-line" />
        </div>
      );
    } else {
      return false;
    }
  };

  return (
    <div className="Note" style={noteColor}>
      {renderFooter()}
      <p className="content">{note.content}</p>
      {deleteBtnFlag ? renderDeleteBtn() : false}
    </div>
  );
};
