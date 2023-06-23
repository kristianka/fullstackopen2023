const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.course.part} {props.course.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part course={props.course.parts[0]} />
      <Part course={props.course.parts[1]} />
      <Part course={props.course.parts[2]} />
    </div>
  )
}

// Most ideal way to do this but exercise tells to do it other way
// const Content = (props) => {
//   return (
//     <div>
//       {props.course.parts.map(element => {
//         return (
//           <p key={element.part}>
//             {element.part} {element.exercises}
//           </p>
//         )
//       })}
//     </div>
//   )
// }

const Total = (props) => {
  let amount = 0;
  props.course.parts.forEach(element => {
    amount += element.exercises
  });
  return (
    <div>
      <p>Number of exercises {amount}</p>
    </div>
  )
}


const App = () => {
  const courseInfo = {
    name: "Half Stack application development",
    parts: [
      {
        part: "Fundamentals of React",
        exercises: 10
      },
      {
        part: "Using props to pass data",
        exercises: 7
      },
      {
        part: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header courseName={courseInfo.name} />
      <Content course={courseInfo} />
      <Total course={courseInfo} />
    </div >
  )
}

export default App