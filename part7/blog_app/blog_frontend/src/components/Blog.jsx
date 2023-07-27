import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = (props) => {
    const [view, setView] = useState(false);
    const user = useSelector((state) => state.user);

    const blogStyle = {
        borderRadius: 5,
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    };

    const changeView = () => {
        setView(!view);
    };

    const handleLike = async (event) => {
        event.preventDefault();
        props.likeBlog(props.blog);
    };

    const handleDelete = async () => {
        if (window.confirm(`Delete blog ${props.blog.title} by ${props.blog.author}?`)) {
            props.removeBlog(props.blog);
        }
    };

    return (
        // <div style={blogStyle} className="blog" >
        //     <p>{props.blog.title} by {props.blog.author}</p>
        //     <button onClick={changeView}>{view ? "Hide" : "Show more"}</button>
        //     {view ? (
        //         <ul className="allInfo">
        //             <li>Link: <a href={props.blog.url} rel="noreferrer">{props.blog.url}</a></li>
        //             <li>Link: {props.blog.url}</li>
        //             <li>Likes: {props.blog.likes} <button className="likeButton"
        //                 data-testid="addLike" onClick={handleLike}>Like +1</button></li>
        //             <li>Added by: {props.blog.user.name}</li>
        //             {props.blog?.user?.name === user?.name && (
        //                 <li>
        //                     <button onClick={handleDelete}>Delete</button>
        //                 </li>
        //             )}
        //         </ul>
        //     ) : null}
        // </div>
        <div>
            <Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link>
        </div>
    );
};

Blog.propTypes = {
    removeBlog: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
};

export default Blog;