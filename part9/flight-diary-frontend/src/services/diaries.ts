import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const apiBaseUrl = "http://localhost:3000/api";

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
    return data;
};

const create = async (object: NewDiaryEntry) => {
    return await axios.post<DiaryEntry>(
        `${apiBaseUrl}/diaries`, object
    );
};

const pingServer = async () => {
    void axios.get<void>(`http://localhost:3000/ping`);
}

export default { getAll, create, pingServer };