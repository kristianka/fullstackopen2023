/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry, { parseDiagnosisCodes } from "../utils";
import { Entry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send(patientsService.getEntryById(id));
});

router.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientsService.addEntry(newPatientEntry);
        res.json(newPatient);
    } catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
        const healthCheckRatings = [0, 1, 2, 3];
        const { id } = req.params;
        const newDiagnosis = req.body as Entry;
        newDiagnosis.diagnosisCodes = parseDiagnosisCodes(req.body);

        //check that no required fields are missing
        if (!newDiagnosis.type || !newDiagnosis.description || !newDiagnosis.date || !newDiagnosis.specialist) {
            return res.status(400).json({ error: "Missing required field" });
        }

        // check no diagnoses are missing
        if ((newDiagnosis.type === "Hospital" || newDiagnosis.type === "OccupationalHealthcare") && newDiagnosis.diagnosisCodes.length === 0) {
            return res.status(400).json({ error: "Missing diagnosis codes" });
        }

        // check entry type is valid
        if (newDiagnosis.type !== "Hospital" && newDiagnosis.type !== "OccupationalHealthcare" && newDiagnosis.type !== "HealthCheck") {
            return res.status(400).json({ error: "Invalid entry type" });
        }

        // check healthcheck rating is valid
        if (newDiagnosis.type === "HealthCheck" && !healthCheckRatings.includes(newDiagnosis.healthCheckRating)) {
            return res.status(400).json({ error: "Invalid health check value, not 0-3." });
        }

        // check discharge date and criteria are valid
        if (newDiagnosis.type === "Hospital" && !newDiagnosis.discharge?.criteria && !newDiagnosis.discharge?.date) {
            return res.status(400).json({ error: "Invalid hospital entry, missing discharge date and/or criteria." });
        }

        // check employer name is valid
        if (newDiagnosis.type === "OccupationalHealthcare" && !newDiagnosis.employerName) {
            return res.status(400).json({ error: "Invalid occupational healthcare entry, missing employer name." });
        }

        const diagnosis = patientsService.addDiagnoseToPatient(id, newDiagnosis);
        if (diagnosis === null) {
            return res.status(404).json({ error: "Patient not found" });
        }
        return res.json(diagnosis);
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;