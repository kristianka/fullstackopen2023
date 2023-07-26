import { useEffect, useState, useRef } from "react";
/* eslint-disable react/prop-types */
import "./index.css";

import blogsService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
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
            dispatch(setNotification({ title: "Logged out", type: "success", seconds: 5 }));

        } catch (err) {
            dispatch(setNotification({ title: "Error while logging out. Please try again", type: "error", seconds: 5 }));
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
            dispatch(setNotification({ title: `Welcome back ${user.name}! 👋`, type: "success", seconds: 5 }));
        } catch (exception) {
            dispatch(setNotification({ title: "Wrong credentials. Please try again!", type: "error", seconds: 5 }));
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
                dispatch(setNotification({
                    title: `Successfully added ${blogObj.title} by ${blogObj.author}`, type: "success", seconds: 5
                }));
                blogFormRef.current.toggleVisibility();
                blogsService.getAll()
                    .then(res => {
                        setBlogs(res.data);
                    });
            })
            .catch(err => {
                console.log(err);
                dispatch(setNotification({
                    title: "Error while adding a new blog. Please try again later!", type: "error", seconds: 5
                }));
            });
    };

    const likeBlog = async (blogObj) => {
        try {
            await blogsService.update(blogObj.id);
            dispatch(setNotification({
                title: `Liked ${blogObj.title} by ${blogObj.author}`, type: "success", seconds: 5
            }));
        } catch (error) {
            dispatch(setNotification({
                title: "Error while liking a blog. Please try again later!", type: "error", seconds: 5
            }));
        }
    };

    const removeBlog = async (blogObj) => {
        try {
            await blogsService.remove(blogObj.id);
            const updateTable = await blogsService.getAll();
            setBlogs(updateTable.data);
            dispatch(setNotification({ title: `Successfully deleted ${blogObj.title}`, type: "success", seconds: 5 }));
        } catch (error) {
            dispatch(setNotification({
                title: "Error while removing a blog. Please try again later!", type: "error", seconds: 5
            }));
        }
    };

    const sortedBlogs = [].concat(blogs).sort((a, b) => b.likes - a.likes);

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                {loginForm()}
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>Blogs</h1>
            </div>
            <div>
                <h2>Add a new blog</h2>
                <Notification />
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
        </div>
    );
};

export default App;