
interface exercisesResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exerciseHours: number[], target: number): exercisesResult => {
    const totalHours = exerciseHours.reduce((a, b) => a + b, 0);
    const avgHours = totalHours / exerciseHours.length;
    const totalDays = exerciseHours.length;
    const exercisedDays = exerciseHours.filter((n) => n !== 0).length;

    let succeeded = false;
    if (totalDays >= target) {
        succeeded = true;
    }

    // algorithm for deciding rating
    let rating = 0;
    let ratingDescription = "";
    const percentage: number = (totalHours / (target * 7)) * 100;
    if (percentage <= 50) {
        rating = 1;
        ratingDescription = "You can do better!";
    } else if (percentage <= 75) {
        rating = 2;
        ratingDescription = "Good but little more to go!";
    } else if (percentage >= 90) {
        rating = 3;
        ratingDescription = "Excellent!";
    }

    const results: exercisesResult = {
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

const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const dailyExerciseHourGoal = 2;
console.log(calculateExercises(dailyExerciseHours, dailyExerciseHourGoal));