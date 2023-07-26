/* eslint-disable react/prop-types */
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });

    const handleTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value });
    };
    const handleAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value });
    };
    const handleUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value });
    };

    const addBlog = (event) => {
        event.preventDefault();
        const newBlogCopy = newBlog;
        createBlog(newBlogCopy);
        setNewBlog({ author: "", title: "", url: "" });
    };

    return (
        <div className="formDiv">
            <form onSubmit={addBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="titleInput" role="titleInput" name="title" type="text"
                        value={newBlog.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label aria-label="author" htmlFor="author">Author</label>
                    <input id="authorInput" role="authorInput" name="author" type="text"
                        value={newBlog.author} onChange={handleAuthorChange} />
                </div>
                <div>
                    <label aria-label="url" htmlFor="url">Link</label>
                    <input id="urlInput" role="urlInput" name="url" type="text"
                        value={newBlog.url} onChange={handleUrlChange} />
                </div>
                <div>
                    <button id="submitNewBlog" type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;