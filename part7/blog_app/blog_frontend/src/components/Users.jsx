/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import usersService from "../services/users";
import { useEffect, useState } from "react";

const StatisticLine = ({ user }) => {
    console.log("user", user);
    return (
        <tr>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
        </tr>
    );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        usersService
            .getAll()
            .then(res => setUsers(res.data));
    }, []);
    console.log("in users", users);

    return (
        <div>
            <h2>Users</h2>
            {!users && <p>No users added</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(u => (
                        <StatisticLine key={u.id} user={u} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;