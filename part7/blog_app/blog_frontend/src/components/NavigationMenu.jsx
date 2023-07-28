/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavigationMenu = (props) => {

    const user = useSelector((state) => state.user);
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to={"/"}>Blogs</Button>
                <Button color="inherit" component={Link} to={"/users/"}>Users</Button>
                {user
                    ? <>
                        <p color="inherit">{user.name} logged in</p>
                        <Button color="inherit" onClick={props.logOut}>Logout</Button>
                    </>
                    : null}
            </Toolbar>
        </AppBar >
    );
};

export default NavigationMenu;