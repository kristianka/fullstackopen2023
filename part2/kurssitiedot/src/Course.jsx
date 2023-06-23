const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content courseParts={course.parts} />
        </div>
    )
}

const Header = ({ courseName }) => {
    return (
        <div>
            <h2>{courseName}</h2>
        </div>
    )
}

const Content = ({ courseParts }) => {
    return (
        <div>
            <div>
                {courseParts.map(c =>
                    <Part key={c.id} course={c} />
                )}
            </div>
            <Total courseParts={courseParts} />
        </div>
    )
}

const Part = ({ course }) => {
    return (
        <div>
            <p>
                {course.name} {course.exercises}
            </p>
        </div>
    )
}

const Total = ({ courseParts }) => {
    const total = courseParts.reduce((acc, p) => acc + p.exercises, 0);
    return (
        <div>
            <p><b>Exercises in total {total}</b></p>
        </div>
    )
}

export default Course;