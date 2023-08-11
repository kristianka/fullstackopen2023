import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientsService from "../../services/patients";
import { Divider } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientDetailsPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | undefined>();
    console.log("id", id);

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
    console.log("patient", patient)
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
        </div>
    )
}


export default PatientDetailsPage;