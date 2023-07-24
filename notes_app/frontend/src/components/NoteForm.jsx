/* eslint-disable react/prop-types */
import { useState } from "react";

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState("");
    const [newImportant, setNewImportant] = useState(false);

    const addNote = (event) => {
        event.preventDefault();
        const noteObj = {
            content: newNote,
            important: newImportant
        };
        createNote({ noteObj });
        setNewNote("");
    };

    return (
        <div>
            <form onSubmit={addNote}>
                <div>
                    <label htmlFor="name">Text </label>
                    <input id="newNoteName" name="name" type="text" value={newNote} onChange={(event) => setNewNote(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="important">Priority </label>
                    <select id="newNoteImportance" name="important" value={newImportant} onChange={(event) => setNewImportant(event.target.value)}>
                        <option value={true}>High</option>
                        <option value={false}>Low</option>
                    </select>
                    <button id="submitNewNote" type="submit">Add</button>
                </div>

            </form>
        </div>
    );
};

export default NoteForm;