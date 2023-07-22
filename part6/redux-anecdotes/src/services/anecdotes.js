import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createNew = async (content) => {
    const object = { content, id: Number((Math.random() * 1000000).toFixed(0)), votes: 0 };
    const res = await axios.post(baseUrl, object);
    return res.data;
};

const update = async (anecdote) => {
    const object = { ...anecdote, votes: anecdote.votes + 1 };
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, object);
    return res.data; // Return only the data property from the response
}

export default { getAll, createNew, update };