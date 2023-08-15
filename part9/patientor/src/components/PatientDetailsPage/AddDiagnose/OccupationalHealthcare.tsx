import { TextField } from "@mui/material";

interface OccupationalHealthcareProps {
    employerName: string;
    setEmployerName: (value: string) => void;
    sickLeave: {
        startDate: string;
        endDate: string;
    }
    setSickLeave: (value: { startDate: string; endDate: string }) => void;

}
const OccupationalHealthcare = ({ employerName, setEmployerName, sickLeave, setSickLeave }: OccupationalHealthcareProps) => {
    return (
        <div>
            <TextField margin="normal" label="Sick leave start date" type="date" variant="outlined" value={sickLeave.startDate}
                onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })} InputLabelProps={{ shrink: true }} />
            <TextField margin="normal" label="Sick leave end date" type="date" variant="outlined" value={sickLeave.endDate}
                onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })} InputLabelProps={{ shrink: true }} />
            <TextField margin="normal" label="Employer name" variant="outlined" value={employerName}
                onChange={({ target }) => setEmployerName(target.value)} />
        </div>
    )
}

export default OccupationalHealthcare;