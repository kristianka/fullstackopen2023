/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_TITLE":
            return state = action.title
        default:
            return state;
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "")

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
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