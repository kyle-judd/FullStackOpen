import React, { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notifcation";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({});
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState({ type: null, content: null });

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

  const deletePersonHandler = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      phonebookService
        .deletePerson(person.id)
        .catch((err) => setMessage({ type: "error", content: err }));
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  const updatePerson = (person) => {
    if (
      window.confirm(
        `${person.name} is already added to the phonebook. This will update their number. Are you sure?`
      )
    ) {
      phonebookService
        .updatePerson(person.id, newPerson)
        .then((returnedPerson) => {
          const updatedArr = persons.map((p) =>
            p.id !== person.id ? p : returnedPerson
          );
          console.log(updatedArr);
          setPersons(updatedArr);
        });
    }
  };

  const createNewPerson = () => {
    phonebookService.createPerson(newPerson).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setMessage({
        type: "success",
        content: `Successfully added ${newPerson.name}`,
      });
      setTimeout(() => {
        setMessage({ type: null, content: null });
      }, 3000);
      setNewPerson({});
    });
  };

  const onQueryChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      persons.some((person) => {
        if (person.name === newPerson.name) {
          updatePerson(person);
        }
      })
    ) {
    } else {
      createNewPerson();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onQueryChangeHandler={onQueryChangeHandler} />
      <h1>add a new</h1>
      <Form
        submitHandler={onSubmitHandler}
        handleNameChange={onNameChangeHandler}
        handlePhoneNumberChange={onPhoneNumberChangeHandler}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} click={deletePersonHandler} />
    </div>
  );
};

export default App;
