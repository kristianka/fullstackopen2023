import React from "react";
import { Entry, Diagnosis } from "../../types";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} diagnoses={diagnoses} />;
        case "Hospital":
            return <Hospital entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />
        default:
            return (<p>Missing info</p>);
    }
};

export default EntryDetails;
