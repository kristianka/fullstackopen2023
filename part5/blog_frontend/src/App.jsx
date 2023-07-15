import { useEffect, useState } from "react";
/* eslint-disable react/prop-types */
import "./index.css";

import blogsService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <BlogForm addBlog={addBlog} newBlog={newBlog} setNewBlog={setNewBlog} />
  );

  const addBlog = (event) => {
    event.preventDefault();
    const newBlogCopy = newBlog;
    console.log(newBlogCopy)
    // make sure notes is up to date
    blogsService.getAll()
      .then(res => {
        setBlogs(res.data);
      })
      .catch(err => {
        setNotificationType("error");
        setNotification(`An error has occured: ${err}`);
      });

    blogsService.create(newBlogCopy)
      .then(res => {
        setBlogs(blogs.concat(res.data));
        setNotificationType("success");
        setNotification(`Successfully added ${newBlogCopy.title} by ${newBlogCopy.author}`);
      })
      .catch(err => {
        setNotificationType("error");
        setNotification(`An error has occured: ${err}`);
      });

    // reset notification and fields
    setTimeout(() => {
      setNotification("");
    }, 7500);
    setNewBlog({ author: "", title: "", url: "" });
  };


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

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
          {blogForm()}
        </div>
        }
      </div>

      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  );
};

export default App;