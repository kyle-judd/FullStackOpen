import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import FilteredCountries from "./components/FilteredCountries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log(res);
      setCountries(res.data);
    });
  }, []);

  const queryChangedHandler = (event) => {
    setQuery(event.target.value);
  };

  const showCountryHandler = (name) => {
    setSelectedCountry(
      countries[countries.map((country) => country.name).indexOf(name)]
    );
  };

  return (
    <div>
      <Filter onChangeHandler={queryChangedHandler} />
      <FilteredCountries
        countries={countries}
        query={query}
        selectedCountry={selectedCountry}
        handleShow={showCountryHandler}
      />
    </div>
  );
};

export default App;
