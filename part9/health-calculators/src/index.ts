/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import bodyParser from "body-parser";
import { calculateBmi, parseArguments } from "./bmiCalculatorExpress";
import { calculateExercises, parseBodyArguments, ExerciseInput, ExercisesResult } from "./exerciseCalculatorExpress";
const app = express();
app.use(bodyParser.json());

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/hello", (_req, res) => {
    res.send("Hello Full stack!");
});

app.get("/bmi", (req, res, next) => {
    try {
        const { height, weight } = req.query;
        console.log("Height", height);
        console.log("Weight", weight);
        const { height: verifiedHeight, weight: verifiedWeight } = parseArguments(String(height), String(weight));
        const message = calculateBmi(verifiedHeight, verifiedWeight);
        console.log(`${height} cm and ${weight} kg is ` + message);
        res.status(200).json({
            weight: weight,
            height: height,
            bmi: message
        });
    } catch (error: unknown) {
        next(error);
    }
});


app.post("/exercises", (req, res, next) => {
    try {
        const { daily_exercises, target }: ExerciseInput = req.body as ExerciseInput;
        const { daily_exercises: verifiedExercises, target: verifiedTarget } = parseBodyArguments(daily_exercises, target);
        const body: ExercisesResult = calculateExercises(verifiedExercises, verifiedTarget);
        res.status(200).json(body);
    } catch (error: unknown) {
        next(error);
    }
});

// consolelog and send errors better
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Error:", err.message);
    res.status(400).json({ error: err.message });
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}: http://localhost:${PORT}`);
});