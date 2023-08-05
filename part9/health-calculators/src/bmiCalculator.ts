
const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow(height / 100, 2);
    let message: string = "";
    if (bmi < 18.5) {
        message = "Underweight (unhealthy weight)";
    } else if (bmi < 25) {
        message = "Normal (healthy weight)";
    } else if (bmi < 30) {
        message = "Overweight (unhealthy weight)";
    } else {
        message = "Obese (very unhealthy weight)";
    }
    return message;
}
// console.log(calculateBmi(180, 49));
// console.log(calculateBmi(180, 74));
// console.log(calculateBmi(180, 85));
// console.log(calculateBmi(180, 120));
// console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

interface bmiInput {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): bmiInput => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error("Provided values were not numbers!");
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(`${height} cm and ${weight} kg is ` + calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = "Something bad happened."
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}