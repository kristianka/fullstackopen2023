/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

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
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;