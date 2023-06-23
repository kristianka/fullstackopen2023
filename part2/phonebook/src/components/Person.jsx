import personsService from "../services/persons";

const Person = ({ id, name, number, setPersons, errorMsg, setErrorMsg }) => {

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
        } catch (error) {
            console.log("error", error);
            setErrorMsg(`${name} was already removed from the server`);
            setTimeout(() => {
                setErrorMsg("");
            }, 7500);
        }
    }

    return (
        <li>
            {name} - {number} <button onClick={deletePerson}>Delete</button>
        </li >)
}

export default Person;