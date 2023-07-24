/* eslint-disable react/prop-types */

const Search = ({ notesToSearch, setNoteToSearch }) => {

    return (
        < div >
            <form action="" onSubmit={(event) => event.preventDefault()} >
                <label htmlFor="">Search for notes</label>
                <input type="text" value={notesToSearch} onChange={(event) => setNoteToSearch(event.target.value)} />
            </form>
        </div >
    );
};

export default Search;