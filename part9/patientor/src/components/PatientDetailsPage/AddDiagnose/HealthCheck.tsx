import { HealthCheckRating } from '../../../types';
import { FormLabel, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface HealthCheckProps {
    healthCheckRating: HealthCheckRating;
    setHealthCheckRating: (value: HealthCheckRating) => void;
}

const HealthCheck = ({ healthCheckRating, setHealthCheckRating }: HealthCheckProps) => {
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Healthcheck rating:</FormLabel>
                <RadioGroup row aria-label="options" name="options" value={healthCheckRating}
                    onChange={({ target }) => setHealthCheckRating(Number(target.value))}>
                    <FormControlLabel value={HealthCheckRating.Healthy} control={<Radio />} label="Healthy" />
                    <FormControlLabel value={HealthCheckRating.LowRisk} control={<Radio />} label="Low risk" />
                    <FormControlLabel value={HealthCheckRating.HighRisk} control={<Radio />} label="High risk" />
                    <FormControlLabel value={HealthCheckRating.CriticalRisk} control={<Radio />} label="Critical risk" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default HealthCheck;