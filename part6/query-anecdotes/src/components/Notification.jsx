/* eslint-disable react/prop-types */
import { useNotificationValue } from "../NotificationContext"

const Notification = ({ res }) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    const notification = useNotificationValue();
    return (
        <div style={style}>
            {res.isLoading && <p>Loading data from server...</p>}
            {res.isError && <p>An error has occured while fetching from server. Please try again later.</p>}
            {notification && <p>{notification.message}</p>}
        </div>
    )
}

export default Notification