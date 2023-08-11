import { HospitalEntry, Diagnosis } from "../../types";
import { getDiagnosisName } from "../../utils";

const Hospital = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[] }) => {
    console.log("in Hospital", entry);
    return (
        <div>
            <p>Entry type: Hospital</p>
            {entry.diagnosisCodes && (
                <ul>
                    {entry.diagnosisCodes?.map(code => (
                        <li key={code}>
                            {code} - {getDiagnosisName(code, diagnoses)}
                        </li>
                    ))}
                </ul>
            )}
            {entry.discharge && (
                <p>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</p>
            )}
        </div>
    );
}

export default Hospital;