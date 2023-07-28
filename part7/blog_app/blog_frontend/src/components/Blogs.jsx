/* eslint-disable react/prop-types */
import Blog from "./Blog";
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";

const Blogs = ({ sortedBlogs, likeBlog, removeBlog }) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {sortedBlogs.map(b => (
                            <TableRow key={b.id}>
                                <TableCell>
                                    <Blog key={b.id} blog={b} likeBlog={likeBlog} removeBlog={removeBlog} />
                                </TableCell>
                                <TableCell>
                                    Made by {b.author}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export default Blogs;