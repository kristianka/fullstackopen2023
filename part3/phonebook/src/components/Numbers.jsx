import Person from "./Person";
/* eslint-disable react/prop-types */
import React from "react";

const Numbers = (props) => {
    return (
        <div>
            {props.persons.map(p =>
                p.name.toUpperCase().includes(props.personToSearch.toUpperCase()) &&
                <Person key={p.id} id={p.id} name={p.name} number={p.number} setPersons={props.setPersons}
                    setNotification={props.setNotification} setNotificationType={props.setNotificationType} />)
            }
        </div>
    );
};

export default Numbers;