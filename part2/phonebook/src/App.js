import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onNameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists!`);
    } else {
      setPersons(persons.concat({ name: newName }));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input onChange={onNameChangeHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
