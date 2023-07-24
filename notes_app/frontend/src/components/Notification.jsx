/* eslint-disable react/prop-types */

const Notification = ({ msg, type }) => {
    if (msg === null) {
        return null;
    }

    return (
        <div className={type}>
            {msg}
        </div>
    );
};

export default Notification;