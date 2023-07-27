/* eslint-disable react/prop-types */

import { useState } from "react";
import { useSelector } from "react-redux";

const BlogView = ({ blog, likeBlog, removeBlog, addComment }) => {
    const user = useSelector((state) => state.user);
    const [newComment, setNewComment] = useState("");

    if (!blog) {
        return (
            <div>Blog not found</div>
        );
    }
    const handleLike = async (event) => {
        event.preventDefault();
        likeBlog(blog);
    };

    const handleDelete = async () => {
        if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
            removeBlog(blog);
        }
    };

    const handleNewCommentChange = async (event) => {
        setNewComment(event.target.value);
    };
    const handleCommentCreation = async (event) => {
        event.preventDefault();
        addComment({ id: blog.id, comment: newComment });
        setNewComment("");
    };


    return (

        <div className="blog" >
            <h3>{blog.title} by {blog.author}</h3>
            <ul className="allInfo">
                <li>Link: <a href={blog.url} rel="noreferrer">{blog.url}</a></li>
                <li>Likes: {blog.likes} <button className="likeButton"
                    data-testid="addLike" onClick={handleLike}>Like +1</button></li>
                <li>Added by: {blog.user.name}</li>
                {blog?.user?.name === user?.name && (
                    <li>
                        <button onClick={handleDelete}>Delete</button>
                    </li>
                )}
            </ul>
            <h3>Comments</h3>
            <form action="" onSubmit={handleCommentCreation}>
                <input value={newComment} onChange={handleNewCommentChange} type="text" />
                <button>Add comment</button>
            </form>
            <ul>
                {blog && blog.comments.map(b => (
                    <li key={b.id}>{b.content}</li>
                ))}
            </ul>
        </div>

    );
};

export default BlogView;