import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const createDiagnosis = async (id: string, diagnosis: EntryWithoutId) => {
  return await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, diagnosis);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getById, create, createDiagnosis };

