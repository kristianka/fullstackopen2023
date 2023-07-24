import Note from "./Note";
/* eslint-disable react/prop-types */

const Notes = (props) => {
    return (
        <div>
            <h3>High priority notes</h3>
            <ul>
                {props.notes.map(n =>
                    n.content.toUpperCase().includes(props.noteToSearch.toUpperCase()) && n.important &&
                    <Note key={n.id} id={n.id} note={n} removeNote={props.removeNote} user={props.user} />)
                }
            </ul>
            <h3>Low priority notes</h3>
            <ul>
                {props.notes.map(n =>
                    n.content.toUpperCase().includes(props.noteToSearch.toUpperCase()) && !n.important &&
                    <Note key={n.id} id={n.id} note={n} removeNote={props.removeNote} user={props.user} />)
                }
            </ul>
        </div >
    );
};

export default Notes;