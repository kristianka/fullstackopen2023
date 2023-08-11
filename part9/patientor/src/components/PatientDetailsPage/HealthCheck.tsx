import { HealthCheckEntry, Diagnosis } from "../../types";
import { getDiagnosisName } from "../../utils";

const HealthCheck = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => {
    return (
        <div>
            <p>Entry type: Health check</p>
            <ul>
                {entry.diagnosisCodes?.map(code => (
                    <li key={code}>
                        {code} - {getDiagnosisName(code, diagnoses)}
                    </li>
                ))}
            </ul>
            <p>Health check rating: {entry.healthCheckRating}</p>
        </div>
    );
}

export default HealthCheck;