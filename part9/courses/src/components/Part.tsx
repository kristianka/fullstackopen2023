interface CoursePart {
    part: {
        name: string;
        exerciseCount?: number;
        kind?: "basic" | "group" | "background" | "special" | "description";
        description?: string;
        groupProjectCount?: number;
        backgroundMaterial?: string;
        requirements?: string[];
    }
}


const Part = (props: CoursePart) => {
    const part = props.part;
    console.log("part", part)
    switch (part.kind) {
        case 'description':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p><i>{part.description}</i></p>
                </div>
            );
        case 'group':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>Group project count: {part.groupProjectCount}</p>
                </div>
            );
        case 'background':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p><i>{part.description}</i></p>
                    <p>Submit to {part.backgroundMaterial}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p><i>{part.description}</i></p>
                    <p>Required skills: {part.requirements?.map(r => r).join(", ")}</p>
                </div >
            );
        default:
            return null;
    }
};

export default Part;
