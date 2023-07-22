import { useSelector } from "react-redux";
import { useEffect } from "react";
import { clearNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    const { title, seconds } = useSelector((state) => state.notification);
    const dispatch = useDispatch();

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
        <div style={style}>
            {title}
        </div>
    )
}

export default Notification