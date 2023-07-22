import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer.js";

const Filter = () => {
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const text = event.target.value;
        dispatch(setFilter(text))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    );
};

export default Filter;