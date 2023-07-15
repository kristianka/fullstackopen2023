/* eslint-disable react/prop-types */

const Blog = (props) => {
    return (
        <div>
            {props.blog.title} {props.blog.author}
        </div>
    );
};

export default Blog;