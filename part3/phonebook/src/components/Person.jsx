import personsService from "../services/persons";
/* eslint-disable react/prop-types */
import React from "react";

const Person = ({ id, name, number, setPersons, setNotification, setNotificationType }) => {

    const deletePerson = async () => {
        if (window.confirm(`Delete ${name}?`)) {
            try {
                await personsService.remove(id);
                const updateTable = await personsService.getAll();
                setPersons(updateTable.data);
                setNotificationType("success");
                setNotification(`Successfully deleted ${name}`);
            } catch (error) {
                setNotificationType("error");
                setNotification(`${name} was already removed from the server. Please refresh the page.`);
                setTimeout(() => {
                    setNotification("");
                }, 7500);
            }
        }
    };

    return (
        <li>
            {name} - {number} <button onClick={deletePerson}>Delete</button>
        </li >);
};

export default Person;