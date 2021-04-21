import React, { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({});
  const [query, setQuery] = useState("");

  useEffect(
    () => phonebookService.getAll().then((persons) => setPersons(persons)),
    []
  );

  const onNameChangeHandler = (event) => {
    const newPersonDTO = { ...newPerson, name: event.target.value };
    console.log(newPersonDTO);
    setNewPerson(newPersonDTO);
  };

  const onPhoneNumberChangeHandler = (event) => {
    const newPersonDTO = { ...newPerson, number: event.target.value };
    console.log(newPersonDTO);
    setNewPerson(newPersonDTO);
  };

  const onQueryChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} already exists!`);
    } else {
      phonebookService.createPerson(newPerson).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewPerson({});
      });
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
