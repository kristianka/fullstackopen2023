/* eslint-disable react/prop-types */

const BlogForm = ({ addBlog, newBlog, setNewBlog }) => {
    const handleTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value })
    }
    const handleAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value })
    }
    const handleUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value })
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" value={newBlog.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input name="author" type="text" value={newBlog.author} onChange={handleAuthorChange} />
                </div>
                <div>
                    <label htmlFor="url">Link</label>
                    <input name="url" type="text" value={newBlog.url} onChange={handleUrlChange} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;