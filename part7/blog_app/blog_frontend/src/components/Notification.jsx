import { useSelector } from "react-redux";
import { useEffect } from "react";
import { clearNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
    const { title, type, seconds } = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    const infoColour = type === "success" ? "green" : type === "error" ? "red" : "black";
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        color: infoColour
    };

    // clear the notification automatically
    useEffect(() => {
        if (title && seconds) {
            setTimeout(() => {
                dispatch(clearNotification());
            }, seconds * 1000);
        }
    }, [title, seconds, dispatch]);

    if (!title) {
        return null;
    }

    return (
        <Alert severity={type}>
            {title}
        </Alert>
    );
};

export default Notification;