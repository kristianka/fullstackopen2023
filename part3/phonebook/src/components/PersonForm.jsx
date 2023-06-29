/* eslint-disable react/prop-types */
import React from "react";

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <label htmlFor="name">Name:</label>
                <input name="name" type="text" value={newName} onChange={(event) => setNewName(event.target.value)} />

                <label htmlFor="number">Number:</label>
                <input name="number" type="text" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />

                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default PersonForm;