interface TotalProps {
    courseParts: {
        name: string,
        exerciseCount: number
    }[];
}

const Total = (props: TotalProps) => {
    // calculate all exercises
    const total = props.courseParts.reduce((total, part) => total + part.exerciseCount, 0);
    return (
        <p>Number of exercises: {total}</p>
    )

}

export default Total;