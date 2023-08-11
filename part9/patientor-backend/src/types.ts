export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge?: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: SickLeave
}

interface SickLeave {
    startDate: string,
    endDate: string
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;