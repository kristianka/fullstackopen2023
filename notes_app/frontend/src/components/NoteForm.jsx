/* eslint-disable react/prop-types */
import React from "react";


const NoteForm = ({ addNote, newNote, setNewNote, newImportant, setNewImportant }) => {
    return (
        <div>
            <form onSubmit={addNote}>
                <div>
                    <label htmlFor="name">Text </label>
                    <input name="name" type="text" value={newNote} onChange={(event) => setNewNote(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="important">Priority </label>
                    <select name="important" value={newImportant} onChange={(event) => setNewImportant(event.target.value)}>
                        <option value={true}>High</option>
                        <option value={false}>Low</option>
                    </select>
                    <button type="submit">Add</button>
                </div>

            </form>
        </div>
    );
};

export default NoteForm;