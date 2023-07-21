import { useEffect, useState, useRef } from "react";
/* eslint-disable react/prop-types */
import "./index.css";

import blogsService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        blogsService.getAll()
            .then(res => {
                setBlogs(res.data);
            });
    }, []);


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogsService.setToken(user.token);
        }
    }, []);

    const logOut = async (event) => {
        event.preventDefault();
        try {
            window.localStorage.removeItem("loggedBlogAppUser");
            setUser(null);
            setNotificationType("success");
            setNotification("Logged out");
            setTimeout(() => {
                setNotification(null);
            }, 5000);

        } catch (err) {
            setNotificationType("error");
            setNotification("Error while logging out. Please try again!");
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
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
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
            blogsService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
            setNotificationType("success");
            setNotification(`Welcome back ${user.name}! 👋`);
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        } catch (exception) {
            setNotificationType("error");
            setNotification("Wrong credentials");
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input id="loginUsername" type="text" value={username} name="Username"
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input id="loginPassword" type="password" value={password} name="Password"
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const addBlog = (blogObj) => {
        blogsService.create(blogObj)
            .then(res => {
                setBlogs(blogs.concat(res.data));
                setNotificationType("success");
                setNotification(`Successfully added ${blogObj.title} by ${blogObj.author}`);
                blogFormRef.current.toggleVisibility();
                blogsService.getAll()
                    .then(res => {
                        setBlogs(res.data);
                    });
                setTimeout(() => {
                    setNotification("");
                }, 7500);
            })
            .catch(err => {
                setNotificationType("error");
                setNotification(`An error has occured: ${err}`);
            });
    };

    const likeBlog = async (blogObj) => {
        try {
            await blogsService.update(blogObj.id);
            setNotificationType("success");
            setNotification(`Liked ${blogObj.title} by ${blogObj.author}`);
        } catch (error) {
            setNotificationType("error");
            setNotification(`An error has occured: ${error}`);
        }
    };

    const removeBlog = async (blogObj) => {
        try {
            await blogsService.remove(blogObj.id);
            const updateTable = await blogsService.getAll();
            setBlogs(updateTable.data);
            setNotificationType("success");
            setNotification(`Successfully deleted ${blogObj.title}`);
        } catch (error) {
            setNotificationType("error");
            setNotification(`${error}`);
            setTimeout(() => {
                setNotification("");
            }, 7500);
        }
    };

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification msg={notification} type={notificationType} />
                {loginForm()}
            </div>
        );
    }

    const sortedBlogs = [].concat(blogs).sort((a, b) => b.likes - a.likes);

    return (
        <>
            <div>
                <h1>Blogs</h1>
            </div>
            <div>
                <h2>Add a new blog</h2>
                <Notification msg={notification} type={notificationType} />
                {user && logOutForm()}
                {user && <div>
                    <p>{user.name} logged in</p>
                    <div>
                        <Togglable buttonLabel="Create a blog" ref={blogFormRef}>
                            <BlogForm createBlog={addBlog} />
                        </Togglable>
                    </div>
                </div>
                }
            </div>
            <div>
                <h2>Blogs</h2>
                {sortedBlogs.map(blog =>
                    <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
                )}
            </div>
        </>
    );
};

export default App;