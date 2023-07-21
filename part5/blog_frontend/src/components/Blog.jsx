import { useState } from "react";
import PropTypes from "prop-types"
const Blog = (props) => {
    const [view, setView] = useState(false);
    const [likes, setLikes] = useState(props.blog.likes);

    const blogStyle = {
        borderRadius: 5,
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }
    const changeView = () => {
        setView(!view);
    };

    const addLike = async (event) => {
        try {
            event.preventDefault();
            props.likeBlog(props.blog)
            setLikes(likes + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBlog = async () => {
        if (window.confirm(`Delete blog ${props.blog.title} by ${props.blog.author}?`)) {
            props.removeBlog(props.blog);
        }
    };

    // vitest breaks with multiple tags
    // <li>Link: <a href={props.blog.url} rel="noreferrer">{props.blog.url}</a></li>
    return (
        <div style={blogStyle} className="blog" >
            <p>{props.blog.title} by {props.blog.author}</p>
            <button onClick={changeView}>{view ? "Hide" : "Show more"}</button>
            {view ? (
                <ul className="allInfo">
                    <li>Link: <a href={props.blog.url} rel="noreferrer">{props.blog.url}</a></li>
                    <li>Link: {props.blog.url}</li>
                    <li>Likes: {likes} <button className="likeButton"
                        data-testid="addLike" onClick={addLike}>Like +1</button></li>
                    <li>Added by: {props.blog.user.name}</li>
                    {props.blog?.user?.name === props?.user?.name && (
                        <li>
                            <button onClick={deleteBlog}>Delete</button>
                        </li>
                    )}
                </ul>
            ) : null}
        </div>
    );
};

Blog.propTypes = {
    removeBlog: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    // setBlogs: PropTypes.func.isRequired,
    // setNotificationType: PropTypes.func.isRequired,
    // setNotification: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}

export default Blog;