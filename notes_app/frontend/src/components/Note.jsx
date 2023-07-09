import notesService from "../services/notes";
/* eslint-disable react/prop-types */
import React from "react";

const Note = ({ id, content, setNotes, setNotification, setNotificationType }) => {

    const deleteNote = async () => {
        if (window.confirm(`Delete ${content}?`)) {
            try {
                await notesService.remove(id);
                const updateTable = await notesService.getAll();
                setNotes(updateTable.data);
                setNotificationType("success");
                setNotification(`Successfully deleted ${content}`);
            } catch (error) {
                setNotificationType("error");
                setNotification(`${content} was already removed from the server. Please refresh the page.`);
                setTimeout(() => {
                    setNotification("");
                }, 7500);
            }
        }
    };
    return (
        <li>
            {content} <button onClick={deleteNote}>Delete</button>
        </li >);
};

export default Note;