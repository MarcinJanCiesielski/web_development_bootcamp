import React from "react";
import Note from "./Note";
import notes from "../notes.js";

function Keeper() {
  return notes.map(note =>
  (<Note
    key={note.key}
    title={note.title}
    content={note.content}>
    </Note>));
};

export default Keeper;
