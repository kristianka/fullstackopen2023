import React from "react";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";
import { EntryType } from "../../../types";
import { HealthCheckRating } from "../../../types";

interface ChooserProps {
    entry: EntryType;
    healthCheckRating: HealthCheckRating;
    setHealthCheckRating: (value: HealthCheckRating) => void;
}

const Chooser = ({ entry, healthCheckRating, setHealthCheckRating }: ChooserProps) => {
    console.log("entry", entry);
    switch (entry) {
        case "HealthCheck":
            return <HealthCheck healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />;
        case "Hospital":
            return <Hospital />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare />
        default:
            return (<p>Choose a category :3</p>);
    }
};

export default Chooser;
