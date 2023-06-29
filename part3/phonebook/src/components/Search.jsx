/* eslint-disable react/prop-types */
import React from "react";

const Search = ({ personToSearch, setPersonToSearch }) => {

    return (
        < div >
            <form action="" onSubmit={(event) => event.preventDefault()} >
                <label htmlFor="">Search for users</label>
                <input type="text" value={personToSearch} onChange={(event) => setPersonToSearch(event.target.value)} />
            </form>
        </div >
    );
};

export default Search;