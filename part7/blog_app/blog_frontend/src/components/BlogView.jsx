/* eslint-disable react/prop-types */

import { useState } from "react";
import { useSelector } from "react-redux";
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from "@mui/material";

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
            <h2>Blog info</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Likes</TableCell>
                            <TableCell>Added by</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={blog.id}>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell>{blog.author}</TableCell>
                            <TableCell>{blog.url}</TableCell>
                            <TableCell>{blog.likes}</TableCell>
                            <TableCell>{blog.user.name}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <Button onClick={handleLike}>Like blog</Button>
                {blog?.user?.name === user?.name && (
                    <Button onClick={handleDelete}>Delete blog</Button>
                )}
            </div>

            <h3>Comments</h3>
            <form action="" onSubmit={handleCommentCreation}>
                <TextField value={newComment} onChange={handleNewCommentChange}></TextField>
                <Button type="submit">Add comment</Button>
            </form>

            <TableContainer>
                <Table>
                    <TableBody>
                        <TableCell>
                            {blog && blog.comments.map(b => (
                                <TableRow key={b.id}>
                                    {b.content}
                                </TableRow>
                            ))}
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BlogView;