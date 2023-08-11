import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import { getDiagnosisName } from "../../utils";

const OccupationalHealthcare = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {

    return (
        <div>
            <p>Entry type: Occupational Healthcare</p>
            <p>Employer: {entry.employerName}</p>
            <ul>
                {entry.diagnosisCodes?.map(code => (
                    <li key={code}>
                        {code} - {getDiagnosisName(code, diagnoses)}
                    </li>
                ))}
            </ul>
            {entry.sickLeave && (
                <p>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
            )}
        </div>
    );
}

export default OccupationalHealthcare;