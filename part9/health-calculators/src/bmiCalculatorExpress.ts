interface bmiInput {
    height: number;
    weight: number;
}

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
};

const parseArguments = (height: string, weight: string): bmiInput => {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        return {
            height: Number(height),
            weight: Number(weight)
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

export { calculateBmi, parseArguments };