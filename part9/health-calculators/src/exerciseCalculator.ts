
interface ExercisesResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
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
    console.log(percentage)
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
        ratingDescription = "Super Excellent!"
    }

    const results: ExercisesResult = {
        periodLength: totalDays,
        trainingDays: exercisedDays,
        success: succeeded,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avgHours
    }
    return results;
}

// const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
// const dailyExerciseHourGoal = 2;
// console.log(calculateExercises(dailyExerciseHours, dailyExerciseHourGoal));

interface ExerciseInput {
    daysTarget: number,
    exercisedHoursPerDay: number[]
};

const parseArguments = (args: string[]): ExerciseInput => {
    if (args.length < 5) throw new Error("Not enough arguments");

    // remove unnecessary stuff, target and check that every input is a number
    const userInput = args.slice(3);
    userInput.forEach(element => {
        if (isNaN(Number(element))) {
            throw new Error("Every value must be a number!")
        }
    });

    // remove target from array
    const hours: number[] = userInput.map(Number);
    console.log("hours", hours)
    return {
        exercisedHoursPerDay: hours,
        daysTarget: Number(args[2])
    }
}

try {
    const { exercisedHoursPerDay, daysTarget } = parseArguments(process.argv);
    console.log(calculateExercises(exercisedHoursPerDay, daysTarget));
} catch (error) {
    let errorMessage = "Something bad happened."
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}

export { };