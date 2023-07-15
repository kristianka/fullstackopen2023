import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}

const getAll = () => {
    return axios.get(baseUrl);
};

const create = (newObject) => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.post(baseUrl, newObject, config);
};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove, setToken };