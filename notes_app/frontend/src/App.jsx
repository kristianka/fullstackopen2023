import { useEffect, useState } from "react";
/* eslint-disable react/prop-types */
import React from "react";
import "./index.css";

import notesService from "./services/notes";
import Search from "./components/Search";
import Notification from "./components/Notification";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newImportant, setNewImportant] = useState(false);
  const [noteToSearch, setNoteToSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    notesService.getAll()
      .then(res => {
        setNotes(res.data);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObj = {
      content: newNote,
      important: newImportant
    };

    // make sure notes is up to date
    notesService.getAll()
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => {
        setNotificationType("error");
        setNotification(`An error has occured: ${err.response.data}`);
      });

    notesService.create(noteObj)
      .then(res => {
        setNotes(notes.concat(res.data));
        setNotificationType("success");
        setNotification(`Successfully added ${noteObj.content}`);
      })
      .catch(err => {
        setNotificationType("error");
        setNotification(`An error has occured: ${err.response.data}`);
      });

    // reset notification and fields
    setTimeout(() => {
      setNotification("");
    }, 7500);
    setNewNote("");
  };

  return (
    <>
      <div>
        <h1>Notes</h1>
        <Search noteToSearch={noteToSearch} setNoteToSearch={setNoteToSearch} />
      </div>

      <div>
        <h2>Add a new note</h2>
        <Notification msg={notification} type={notificationType} />
        <NoteForm addNote={addNote} newNote={newNote} setNewNote={setNewNote}
          newImportant={newImportant} setNewImportant={setNewImportant} />
      </div>

      <div>
        <h2>Notes</h2>
        <Notes notes={notes} noteToSearch={noteToSearch} setNotes={setNotes} notification={notification} setNotification={setNotification}
          setNotificationType={setNotificationType} />
      </div>
    </>
  );
};

export default App;