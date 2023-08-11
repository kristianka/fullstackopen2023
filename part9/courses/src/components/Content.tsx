import Part from "./Part";

interface ContentProps {
    courseParts: {
        name: string,
        exerciseCount: number
    }[];
}

const Content = (props: ContentProps) => {
    console.log(props.courseParts)
    return (
        <div>
            <h2>Course content</h2>
            {props.courseParts.map(part => (
                <Part key={part.name} part={part} />
            ))}

            {/* <ul>
                {props.courseParts.map((part, index: number) => (
                    <li key={index}>
                        {part.name} - Exercises: {part.exerciseCount}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default Content;