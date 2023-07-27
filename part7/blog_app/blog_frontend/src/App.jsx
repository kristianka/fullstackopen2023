import { useEffect, useState, useRef } from "react";
/* eslint-disable react/prop-types */
import "./index.css";

import blogsService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import NavigationMenu from "./components/NavigationMenu";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setBlogs, addBlog, likeBlog, deleteBlog, addComment } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { Routes, Route, useMatch } from "react-router-dom";
import { setUsers } from "./reducers/usersReducer";



const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const blogFormRef = useRef();

    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.users);

    // fetch all blogs and users
    useEffect(() => {
        blogsService.getAll()
            .then(res => {
                dispatch(setBlogs(res.data));
            });
        usersService.getAll()
            .then(res => {
                dispatch(setUsers(res.data));
            });
    }, []);

    const userMatch = useMatch("/users/:id");
    const blogMatch = useMatch("/blogs/:id");
    const matchedUser = userMatch ? users.find(a => a.id === userMatch.params.id) : null;
    const matchedBlog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null;
    console.log("matched blog", matchedBlog)

    useEffect(() => {
        console.log("Redux Store Blogs State:", blogs);
        console.log("Redux Store Users State:", users);
    }, [blogs, users]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogsService.setToken(user.token);
        }
    }, []);

    const logOut = async (event) => {
        event.preventDefault();
        try {
            window.localStorage.removeItem("loggedBlogAppUser");
            dispatch(setUser(null));
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
            const user = await loginService.login({ username, password });
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
            blogsService.setToken(user.token);
            dispatch(setUser(user));
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

    const addNewBlog = async (blogObj) => {
        try {
            const newBlog = await blogsService.create(blogObj);
            // this so blog creator is shown locally before page refresh
            newBlog.data.user = user;
            dispatch(addBlog(newBlog.data));
            dispatch(setNotification({
                title: `Successfully added ${blogObj.title} by ${blogObj.author}`, type: "success", seconds: 5
            }));
            blogFormRef.current.toggleVisibility();
        } catch (error) {
            console.log(error);
            dispatch(setNotification({
                title: "Error while adding a new blog. Please try again later!", type: "error", seconds: 5
            }));
        }
    };

    const addLikeToBlog = async (blogObj) => {
        try {
            await blogsService.update(blogObj.id);
            dispatch(likeBlog({ id: blogObj.id, likes: blogObj.likes + 1 }));
            dispatch(setNotification({
                title: `Liked ${blogObj.title} by ${blogObj.author}`, type: "success", seconds: 5
            }));
        } catch (error) {
            dispatch(setNotification({
                title: "Error while liking a blog. Please try again later!", type: "error", seconds: 5
            }));
        }
    };

    const addCommentToBlog = async ({ id, comment }) => {
        try {
            const newComment = await blogsService.createComment(id, comment);
            dispatch(addComment(newComment.data));
            dispatch(setNotification({
                title: `Added a new comment "${comment}"`, type: "success", seconds: 5
            }));
        } catch (error) {
            dispatch(setNotification({
                title: "Error while adding a comment. Please try again later!", type: "error", seconds: 5
            }));
        }
    };

    const removeBlog = async (blogObj) => {
        try {
            await blogsService.remove(blogObj.id);
            dispatch(deleteBlog(blogObj.id));
            dispatch(setNotification({ title: `Successfully deleted ${blogObj.title}`, type: "success", seconds: 5 }));
        } catch (error) {
            dispatch(setNotification({
                title: "Error while removing a blog. Please try again later!", type: "error", seconds: 5
            }));
        }
    };

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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
            <NavigationMenu logOutForm={logOutForm} />
            <div>
                <h1>Blogs</h1>
            </div>
            <div>
                <h2>Add a new blog</h2>
                <Notification />
            </div>
            <Routes>
                <Route path="/users" element={<Users />}></Route>
                <Route path="/users/:id" element={<UserView user={matchedUser} />}></Route>
                <Route path="/blogs/:id" element={<BlogView blog={matchedBlog}
                    likeBlog={addLikeToBlog} removeBlog={removeBlog} addComment={addCommentToBlog} />}></Route>
                <Route path="/" element={
                    <>
                        <Togglable buttonLabel="Create a blog" ref={blogFormRef}>
                            <BlogForm createBlog={addNewBlog} />
                        </Togglable>
                        <Blogs sortedBlogs={sortedBlogs}
                            likeBlog={addLikeToBlog} removeBlog={removeBlog} />
                    </>}>
                </Route>
            </Routes>
        </div >
    );
};

export default App;