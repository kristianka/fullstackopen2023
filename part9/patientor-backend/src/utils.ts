import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): string => {
    if (typeof text !== 'string') {
        throw new Error("Incorrect data: some fields are not a string!");
    }
    return text;
};
const parseGender = (gender: unknown): Gender => {
    if (typeof gender !== 'string' || !Object.values(Gender).includes(gender as Gender)) {
        throw new Error("Invalid gender value");
    }
    return gender as Gender;
};

/// validate name, ssn, dateOfBirth, occupation and gender
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ("name" in object && "ssn" in object && "dateOfBirth" in object
        && "occupation" in object && "gender" in object) {
        const newEntry: NewPatientEntry = {
            name: isString(object.name),
            ssn: isString(object.ssn),
            dateOfBirth: isString(object.dateOfBirth),
            occupation: isString(object.occupation),
            gender: parseGender(object.gender)
        };
        return newEntry;
    }
    throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;