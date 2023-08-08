
interface ExercisesResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseInput {
    daily_exercises: number[],
    target: number
}

const calculateExercises = (exerciseHours: number[], target: number): ExercisesResult => {
    const totalHours = exerciseHours.reduce((a, b) => a + b, 0);
    const avgHours = totalHours / exerciseHours.length;
    const totalDays = exerciseHours.length;
    const exercisedDays = exerciseHours.filter((n) => n !== 0).length;

    let succeeded = false;
    if (exerciseHours.every((h) => h >= 2)) {
        succeeded = true;
    }

    // algorithm for deciding rating
    let rating = 0;
    let ratingDescription = "";
    const percentage: number = (totalHours / (target * 7)) * 100;
    console.log(percentage);
    if (percentage <= 50) {
        rating = 1;
        ratingDescription = "You can do better!";
    } else if (percentage <= 75) {
        rating = 2;
        ratingDescription = "Good but little more to go!";
    } else if (percentage <= 100) {
        rating = 3;
        ratingDescription = "Excellent!";
    } else {
        rating = 3;
        ratingDescription = "Super Excellent!";
    }

    const results: ExercisesResult = {
        periodLength: totalDays,
        trainingDays: exercisedDays,
        success: succeeded,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avgHours
    };
    return results;
};

const parseArguments = (days_exercised: unknown[], target: unknown): ExerciseInput => {
    if (!days_exercised || !target) {
        throw new Error("Missing arguments");
    }

    if (typeof target !== "number") {
        throw new Error("Malformatted Parameters");
    }

    // remove unnecessary stuff, target and check that every input is a number
    days_exercised.forEach(element => {
        if (isNaN(Number(element))) {
            throw new Error("Every value must be a number!");
        }
    });

    const hours: number[] = days_exercised.map(Number);
    return {
        daily_exercises: hours,
        target: Number(target)
    };
};

export { calculateExercises, parseArguments as parseBodyArguments, ExerciseInput, ExercisesResult };