import { useEffect, useState, useRef } from "react";
/* eslint-disable react/prop-types */
import "./index.css";

import notesService from "./services/notes";
import loginService from "./services/login";
import Search from "./components/Search";
import Notification from "./components/Notification";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [noteToSearch, setNoteToSearch] = useState("");
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const noteFormRef = useRef();

    // fetch notes
    useEffect(() => {
        async function fetchNotes() {
            const res = await notesService.getAll();
            setNotes(res.data);
        }
        fetchNotes();
    }, []);

    // login user
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            notesService.setToken(user.token);
        }
    }, []);

    // adding note
    const addNote = async ({ noteObj }) => {
        try {
            const res = notesService.create(noteObj);
            setNotes(notes.concat(res.data));
            setNotificationType("success");
            setNotification(`Successfully added ${noteObj.content}`);
            noteFormRef.current.toggleVisibility();
        } catch (err) {
            setNotificationType("error");
            setNotification(`An error has occured: ${err.response.data}`);
        }
        // reset notification and fields
        setTimeout(() => {
            setNotification("");
        }, 7500);
    };

    // logging out
    const logOut = async (event) => {
        event.preventDefault();
        try {
            window.localStorage.removeItem("loggedNoteAppUser");
            setUser(null);
            setNotificationType("success");
            setNotification("Logged out");
        } catch (err) {
            setNotificationType("error");
            setNotification("Error while logging out. Please try again!");
        }
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const logOutForm = () => (
        <form onSubmit={logOut}>
            <button>Logout</button>
        </form>
    );

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password, });
            window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
            notesService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
            setNotificationType("success");
            setNotification(`Welcome back ${user.name}! 👋`);
        } catch (exception) {
            setNotificationType("error");
            setNotification("Wrong credentials");
        }
        setTimeout(() => {
            setNotification("");
        }, 5000);
    };

    const removeNote = async (note) => {
        try {
            await notesService.remove(note.id);
            const updateTable = await notesService.getAll();
            setNotes(updateTable.data);
            setNotificationType("success");
            setNotification(`Successfully deleted ${note.content}`);
        } catch (error) {
            setNotificationType("error");
            setNotification(`${note.content} was already removed from the server. Please refresh the page.`);
        }
        setTimeout(() => {
            setNotification("");
        }, 7500);
    };

    return (
        <>
            <div>
                <h1>Notes</h1>
                {user && <p>Logged in as {user.name}</p>} {user && logOutForm()}
                <Search noteToSearch={noteToSearch} setNoteToSearch={setNoteToSearch} />
            </div>

            <div>
                <h2>Add a new note</h2>
                <Notification msg={notification} type={notificationType} />
                {!user &&
                    <Togglable buttonLabel="Login">
                        <LoginForm username={username} password={password}
                            handleUsernameChange={({ target }) => setUsername(target.value)}
                            handlePasswordChange={({ target }) => setPassword(target.value)}
                            handleSubmit={handleLogin} />
                    </Togglable>
                }
                {user &&
                    <div>
                        <Togglable buttonLabel="Create a note" ref={noteFormRef}>
                            <NoteForm createNote={addNote} />
                        </Togglable>
                    </div>
                }
            </div >

            <div>
                <h2>Notes</h2>
                <Notes notes={notes} noteToSearch={noteToSearch} removeNote={removeNote} user={user} />
            </div>
        </>
    );
};

export default App;