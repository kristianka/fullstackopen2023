import data from "../data/patients";
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

import { v1 as uuid } from "uuid";

const patients: Patient[] = data;

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getEntryById = (id: string): Patient | object => {
    const patient = patients.find(p => p.id === id);
    if (patient) {
        patient.entries = [];
        return patient;
    } else {
        return { message: `Couldn't find anyone with that id :(` };
    }
};

const addEntry = (entry: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
    getEntryById
};