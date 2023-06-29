import { useEffect, useState } from "react";
/* eslint-disable react/prop-types */
import React from "react";

import "./index.css";

import personsService from "./services/persons";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personToSearch, setPersonToSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    personsService.getAll()
      .then(res => {
        setPersons(res.data);
      });
  }, []);


  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    try {
      // make sure persons is up to date
      personsService.getAll()
        .then(res => {
          setPersons(res.data);
        });

      // check if person already exists
      if (persons.some(p => p.name === newName)) {
        if (!window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
          return;
        }
        const personToUpdate = persons.find(p => p.name === newName);

        // If user accepts, then overwrite the person
        personsService
          .update(personToUpdate.id, personObject)
          .then(res => {
            // creates a new array without old person
            const updatedPersons = persons.map(p => p.id === personToUpdate.id ? res.data : p);
            setPersons(updatedPersons);
            setNotificationType("success");
            setNotification(`Successfully updated ${personObject.name}`);
          });

      }
      // if person doesn't already exist, just create one
      else {
        personsService
          .create(personObject)
          .then(res => {
            setPersons(persons.concat(res.data));
            setNotificationType("success");
            setNotification(`Successfully added ${personObject.name}`);
          });
      }
    }
    catch (error) {
      setNotificationType("error");
      setNotification(`An error has occured: ${error.message}`);
    }
    // reset notification and fields
    setTimeout(() => {
      setNotification("");
    }, 7500);
    setNewName("");
    setNewNumber("");
  };


  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <Search personToSearch={personToSearch} setPersonToSearch={setPersonToSearch} />
      </div>

      <div>
        <h2>Add a new user</h2>
        <Notification msg={notification} type={notificationType} />
        <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNewNumber={setNewNumber} />
      </div>

      <div>
        <h2>Numbers</h2>

        <Numbers persons={persons} personToSearch={personToSearch} setPersons={setPersons} notification={notification} setNotification={setNotification}
          setNotificationType={setNotificationType} />
      </div>
    </>
  );

};

export default App;