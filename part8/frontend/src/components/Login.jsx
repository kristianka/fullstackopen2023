/* eslint-disable react/prop-types */
import { useState } from "react";
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
}`

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useMutation(LOGIN);

    if (!props.show) {
        return null
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const token = await login({ variables: { username, password } });
        props.login(token);
        setUsername("");
        setPassword("");
    }

    if (props.user) {
        return (
            <div>
                <p>Logged in!</p>
            </div>
        )
    }
    if (!props.user) {
        return (
            <form onSubmit={handleLogin}>
                <div>Username
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    Password
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        )
    }
}

export default Login;