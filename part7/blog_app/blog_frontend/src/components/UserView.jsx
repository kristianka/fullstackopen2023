/* eslint-disable react/prop-types */
import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";

const UserView = ({ user }) => {

    if (!user) {
        return (
            <div>User not found</div>
        );
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {user.blogs.map(b => (
                            <TableRow key={b.id}>
                                <TableCell>
                                    {b.title}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default UserView;