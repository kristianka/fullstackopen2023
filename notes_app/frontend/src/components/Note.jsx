/* eslint-disable react/prop-types */

const Note = ({ note, removeNote, user }) => {

    const deleteNote = async () => {
        if (window.confirm(`Delete ${note.content}?`)) {
            removeNote(note);
        }
    };
    return (
        <li className="note">
            {note.content}
            {note?.user?.name === user?.name && (
                <button onClick={deleteNote}>Delete</button>
            )}
        </li >);
};

export default Note;