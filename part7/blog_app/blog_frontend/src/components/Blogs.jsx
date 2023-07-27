/* eslint-disable react/prop-types */
import Blog from "./Blog";

const Blogs = ({ sortedBlogs, addLikeToBlog, removeBlog }) => {
    return (
        <div>
            <h2>Blogs</h2>
            {sortedBlogs.map(b =>
                <Blog key={b.id} blog={b} likeBlog={addLikeToBlog} removeBlog={removeBlog} />
            )}
        </div>
    )
}


export default Blogs;