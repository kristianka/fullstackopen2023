import { TextField } from "@mui/material";

interface HospitalProps {
    discharge: {
        date: string;
        criteria: string;
    }
    setDischarge: (value: { date: string; criteria: string }) => void;
}
const Hospital = ({ discharge, setDischarge }: HospitalProps) => {
    return (
        <div>
            <TextField margin="normal" label="Discharge date" type="date" variant="outlined" value={discharge.date}
                onChange={({ target }) => setDischarge({ ...discharge, date: target.value })} InputLabelProps={{ shrink: true }} />
            <TextField margin="normal" label="Discharge criteria" variant="outlined" value={discharge.criteria}
                onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })} />
        </div>
    )
}

export default Hospital;