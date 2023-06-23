import Person from "./Person";

const Numbers = (props) => {
    return (
        <div>
            {props.persons.map(p =>
                p.name.toUpperCase().includes(props.personToSearch.toUpperCase()) &&
                <Person key={p.id} id={p.id} name={p.name} number={p.number} setPersons={props.setPersons} setErrorMsg={props.setErrorMsg} />)
            }
        </div>
    )
}

export default Numbers;