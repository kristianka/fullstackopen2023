import personsService from "../services/persons";

const Person = ({ id, name, number, setPersons, setNotification, setNotificationType }) => {

    const deletePerson = async () => {
        console.log("in remove person");
        if (!window.confirm(`Delete ${name}?`)) {
            console.log("deletion cancelled");
            return;
        }
        try {
            const removeRes = await personsService.remove(id);
            console.log("removed", id);
            const updateTable = await personsService.getAll();
            setPersons(updateTable.data);
            console.log("refreshed users", updateTable.data);
            setNotificationType("success");
            setNotification(`Successfully deleted ${name}`)
        } catch (error) {
            console.log("error", error);
            setNotificationType("error")
            setNotification(`${name} was already removed from the server. Please refresh the page.`);
            setTimeout(() => {
                setNotification("");
            }, 7500);
        }
    }

    return (
        <li>
            {name} - {number} <button onClick={deletePerson}>Delete</button>
        </li >)
}

export default Person;