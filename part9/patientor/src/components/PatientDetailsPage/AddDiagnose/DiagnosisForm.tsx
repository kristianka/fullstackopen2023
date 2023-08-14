import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Patient, Diagnosis } from "../../../types";
import React from "react";
import { format } from "date-fns"; // Import date-fns format function
import { InputLabel, FormControl, Select, MenuItem, Button, OutlinedInput, SelectChangeEvent } from "@mui/material";
import Chooser from "./Chooser";
import { Theme, useTheme } from '@mui/material/styles';
import { EntryType, Entry } from "../../../types";
import patientService from "../../../services/patients";

interface DiagnosisFormProps {
    patient: Patient;
    diagnoses: Diagnosis[];
    setPatient: (value: Patient) => void;
}

function getStyles(name: string, diagnoses: string[], theme: Theme) {
    return {
        fontWeight:
            diagnoses.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const DiagnosisForm = (props: DiagnosisFormProps) => {
    const theme = useTheme();
    console.log("patient", props.patient);
    const today = new Date();
    const formattedToday = format(today, "yyyy-MM-dd");

    const [description, setDescription] = useState("");
    const [date, setDate] = useState(formattedToday);
    const [specialist, setSpecialist] = useState("");
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [visitType, setVisitType] = useState(EntryType.HealthCheck);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [discharge, setDischarge] = useState({ date: "", criteria: "" });
    const [employerName, setEmployerName] = useState("");
    const [sickLeave, setSickLeave] = useState({ startDate: "", endDate: "" });

    const handleSubmit = async () => {
        console.log("submitting");
        let newEntry = {} as Entry;
        switch (visitType) {
            case EntryType.HealthCheck:
                newEntry = await patientService.createDiagnosis(props.patient.id,
                    { date, type: visitType, specialist, diagnosisCodes, description, healthCheckRating });
                break;
            case EntryType.Hospital:
                newEntry = await patientService.createDiagnosis(props.patient.id,
                    { date, type: visitType, specialist, diagnosisCodes, description, discharge, });
                break;
            case EntryType.OccupationalHealthcare:
                newEntry = await patientService.createDiagnosis(props.patient.id,
                    { date, type: visitType, specialist, diagnosisCodes, description, sickLeave, employerName });
                break;
            default:
                break;
        }

        const updatedPatient = {
            ...props.patient,
            entries: [...props.patient.entries, newEntry]
        };
        if (newEntry) {
            props.setPatient(updatedPatient)
            setDescription("");
            setDate(formattedToday);
            setSpecialist("");
            setHealthCheckRating(0);
            setVisitType(EntryType.HealthCheck);
            setDiagnosisCodes([]);
            setDischarge({ date: "", criteria: "" });
            setEmployerName("");
            setSickLeave({ startDate: "", endDate: "" });
        }
    };
    console.log(diagnosisCodes, "diagnosisCodes")
    const handleChange = (event: SelectChangeEvent<unknown>) => {
        const selectedDiagnosisCodes = event.target.value as string[];
        setDiagnosisCodes(selectedDiagnosisCodes);
    };

    return (
        <div>
            <TextField margin="normal" multiline label="Description" variant="outlined" value={description}
                onChange={({ target }) => setDescription(target.value)} fullWidth />

            <div>
                <TextField margin="normal" label="Date" type="date" variant="outlined" value={date}
                    onChange={({ target }) => setDate(target.value)} InputLabelProps={{ shrink: true }} />
                <TextField margin="normal" label="Specialist" variant="outlined" value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)} />

                <FormControl margin="normal" >
                    <InputLabel shrink={true}>Type</InputLabel>
                    <Select aria-label="options" name="options" defaultValue="Choose a visit type" value={visitType}
                        onChange={({ target }) => setVisitType(target.value as EntryType)}>
                        <MenuItem value={EntryType.HealthCheck}>Health check</MenuItem>
                        <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
                        <MenuItem value={EntryType.OccupationalHealthcare}>Occupational healthcare</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <FormControl fullWidth>
                <InputLabel>Diagnosis codes</InputLabel>
                <Select multiple value={diagnosisCodes} onChange={handleChange} input={<OutlinedInput label="Diagnosis codes" />}>
                    {props.diagnoses.map((d) => (
                        <MenuItem key={d.code} value={d.code} style={getStyles(d.name, diagnosisCodes, theme)}>
                            {d.code} ({d.name})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Chooser entry={visitType} healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />
            <Button variant="contained" onClick={handleSubmit}>Add diagnose</Button>
        </div>
    )
}

export default DiagnosisForm;