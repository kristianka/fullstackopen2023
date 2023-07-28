/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import usersService from "../services/users";
import { useEffect, useState } from "react";
import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";

const StatisticLine = ({ user }) => {
    return (
        <Link to={`/users/${user.id}`}>{user.name}</Link>
    );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        usersService
            .getAll()
            .then(res => setUsers(res.data));
    }, []);

    return (
        <div>
            <h2>Users</h2>
            {!users && <p>No users added</p>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Added blogs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>
                                    <StatisticLine key={u.id} user={u} />
                                </TableCell>
                                <TableCell>
                                    {u.blogs.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Users;