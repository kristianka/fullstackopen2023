import { Diagnosis } from "./types";

export const getDiagnosisName = (code: string, diagnoses: Diagnosis[]) => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : "Unknown diagnosis";
};
