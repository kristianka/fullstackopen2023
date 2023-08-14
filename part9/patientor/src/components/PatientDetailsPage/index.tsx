import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patientsService from "../../services/patients";
import { Divider } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import DiagnosisForm from "./AddDiagnose/DiagnosisForm";

interface Props {
    diagnoses: Diagnosis[];
}

const PatientDetailsPage = (props: Props) => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | undefined>();

    useEffect(() => {
        if (id === undefined) return;
        const fetchPatient = async () => {
            const patient = await patientsService.getById(id);
            setPatient(patient);
        };
        fetchPatient();
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>{patient.name}
                {patient.gender === "male" && <MaleIcon />}
                {patient.gender === "female" && <FemaleIcon />}
                {patient.gender === "other" && <TransgenderIcon />}
            </h2>
            <Divider />
            <p>Gender: {patient.gender}</p>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>

            <h2>Add diagnose</h2>
            <Divider />
            <DiagnosisForm patient={patient} setPatient={setPatient} diagnoses={props.diagnoses} />


            <h2>Entries</h2>
            <Divider />
            {patient.entries.map((entry) => (
                <div style={{ border: "2px solid", margin: "5px", padding: "5px" }} key={entry.id}>
                    <p><b>{entry.date}</b> {entry.description}</p>
                    <p>Specialist: {entry.specialist}</p>
                    <EntryDetails entry={entry} diagnoses={props.diagnoses} />
                </div>
            ))}
        </div>
    )
}

export default PatientDetailsPage;