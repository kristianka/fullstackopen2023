import React from "react";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";
import { EntryType } from "../../../types";
import { HealthCheckRating } from "../../../types";

interface ChooserProps {
    entry: EntryType;
    // healthcheck
    healthCheckRating: HealthCheckRating;
    setHealthCheckRating: (value: HealthCheckRating) => void;
    // hospital
    discharge: {
        date: string;
        criteria: string;
    }
    setDischarge: (value: { date: string; criteria: string }) => void;
    // occupational
    employerName: string;
    setEmployerName: (value: string) => void;
    sickLeave: {
        startDate: string;
        endDate: string;
    }
    setSickLeave: (value: { startDate: string; endDate: string }) => void;
}

const Chooser = ({ entry, healthCheckRating, setHealthCheckRating, discharge, setDischarge,
    employerName, setEmployerName, sickLeave, setSickLeave }: ChooserProps) => {
    console.log("entry", entry);
    switch (entry) {
        case "HealthCheck":
            return <HealthCheck healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />;
        case "Hospital":
            return <Hospital discharge={discharge} setDischarge={setDischarge} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare employerName={employerName} setEmployerName={setEmployerName}
                sickLeave={sickLeave} setSickLeave={setSickLeave} />
        default:
            return (<p>Choose a category :3</p>);
    }
};

export default Chooser;
