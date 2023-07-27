/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavigationMenu = (props) => {

    const style = {
        "marginRight": "10px",
        "display": "flex",
        "justifyContent": "space-between",
        "backgroundColor": "gray",
        "padding": "10px"
    };

    const user = useSelector((state) => state.user);
    return (
        <div style={style}>
            <Link to={"/"}>Blogs</Link>
            <Link to={"/users/"}>Users</Link>
            {user ? (
                <>
                    <p>{user.name} logged in</p>
                    {props.logOutForm()}
                </>
            ) : null}
        </div>
    );
};

export default NavigationMenu;