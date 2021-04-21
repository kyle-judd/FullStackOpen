import React, { useState } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [query, setQuery] = useState("");

  const onNameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const onPhoneNumberChangeHandler = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const onQueryChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists!`);
    } else {
      setPersons(persons.concat({ name: newName, number: newPhoneNumber }));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onQueryChangeHandler={onQueryChangeHandler} />
      <h1>add a new</h1>
      <Form
        submitHandler={onSubmitHandler}
        handleNameChange={onNameChangeHandler}
        handlePhoneNumberChange={onPhoneNumberChangeHandler}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} />
    </div>
  );
};

export default App;
