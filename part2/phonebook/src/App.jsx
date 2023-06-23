import { useEffect, useState } from 'react'

import "./index.css";

import personsService from "./services/persons"
import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import Notification from "./components/Notification"


const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personToSearch, setPersonToSearch] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    console.log("in effect");

    personsService.getAll()
      .then(res => {
        setPersons(res.data)
      })
  }, []);

  console.log("rendering", persons.length, "persons")

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    try {
      personsService.getAll()
        .then(res => {
          setPersons(res.data)
        });

      if (persons.some(p => p.name === newName)) {
        if (!window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
          return;
        }
        const personToUpdate = persons.find(p => p.name === newName);
        console.log("replacing", personToUpdate)

        // If user accepts, then overwrite the person
        console.log(personToUpdate.id)
        personsService
          .update(personToUpdate.id, personObject)
          .then(res => {
            // creates a new array without old person
            const updatedPersons = persons.map(p => p.id === personToUpdate.id ? res.data : p);
            console.log(updatedPersons);
            setPersons(updatedPersons);
          })

      }
      else {
        personsService
          .create(personObject)
          .then(res => {
            setPersons(persons.concat(res.data));
            console.log(res);
          })
      }
    }
    catch {
      console.log("error", error);
      setNotification(`Error`);
      setTimeout(() => {
        setNotification("");
      }, 7500);
    }
    setNewName("");
    setNewNumber("");
  }


  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <Search personToSearch={personToSearch} setPersonToSearch={setPersonToSearch} />
      </div>

      <div>
        <h2>Add a new user</h2>
        <Notification msg={notification} />
        <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNewNumber={setNewNumber} />
      </div>

      <div>
        <h2>Numbers</h2>

        <Numbers persons={persons} personToSearch={personToSearch} setPersons={setPersons} notification={notification} setNotification={setNotification} />
      </div>
    </>
  )

}

export default App