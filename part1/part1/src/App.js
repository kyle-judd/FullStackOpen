import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.course.parts[0].name}
        exercises={props.course.parts[0].exercises}
      />
      <Part
        part={props.course.parts[1].name}
        exercises={props.course.parts[1].exercises}
      />
      <Part
        part={props.course.parts[2].name}
        exercises={props.course.parts[2].exercises}
      />
    </div>
  );
};

const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
  const course = {
    course: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  course.totalExercises =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;

  return (
    <div>
      <Header course={course.course} />
      <Content course={course} />
      <Total total={course.totalExercises} />
    </div>
  );
};

export default App;
