import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes((previousNotes) => {
      return ([...previousNotes, note])
    })
  };

  function deleteNote(id) {
    setNotes(notes.filter((note, index) => {
      return index != id;
    }))
  }

  return (
    <div>
      <Header />

      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => {
        return <Note key={index} id={index} note={note} onDel={deleteNote} />
      })}
      
      <Footer />
    </div>
  );
}

export default App;
