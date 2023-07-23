/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useEffect } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            return { ...state, message: action.message };
        case "RESET_MESSAGE":
            return { ...state, message: "" };
        default:
            return state;
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {
        message: ""
    });

    // reset message after five seconds
    useEffect(() => {
        if (notification.message !== "") {
            setTimeout(() => {
                notificationDispatch({ type: "RESET_MESSAGE" });
            }, 5000);
        }
    }, [notification.message]);

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export const useNotificationValue = () => {
    const { notification } = useContext(NotificationContext);
    return notification
}

export const useNotificationDispatch = () => {
    const { notificationDispatch } = useContext(NotificationContext);
    return notificationDispatch;
}

export default NotificationContext