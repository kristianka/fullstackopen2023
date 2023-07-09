import Note from "./Note";
/* eslint-disable react/prop-types */
import React from "react";

const Notes = (props) => {
    return (
        <div>
            <h3>High priority notes</h3>
            <ul>
                {props.notes.map(n =>
                    n.content.toUpperCase().includes(props.noteToSearch.toUpperCase()) && n.important &&
                    <Note key={n.id} id={n.id} content={n.content} setNotes={props.setNotes}
                        setNotification={props.setNotification} setNotificationType={props.setNotificationType} />)
                }
            </ul>
            <h3>Low priority notes</h3>
            <ul>
                {props.notes.map(n =>
                    n.content.toUpperCase().includes(props.noteToSearch.toUpperCase()) && !n.important &&
                    <Note key={n.id} id={n.id} content={n.content} setNotes={props.setNotes}
                        setNotification={props.setNotification} setNotificationType={props.setNotificationType} />)
                }
            </ul>
        </div>
    );
};

export default Notes;