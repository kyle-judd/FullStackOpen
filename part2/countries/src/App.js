import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
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

  let displayCountries = null;

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );
  if (query !== "" && filteredCountries.length > 10) {
    displayCountries = <p>Too many matches, be more specific</p>;
  } else if (query !== "" && filteredCountries.length > 1) {
    displayCountries = (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    );
  } else if (query !== "" && filteredCountries.length === 1) {
    const country = filteredCountries[0];
    displayCountries = (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>
          population{" "}
          {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img style={{ height: 100, width: 100 }} src={country.flag} />
      </div>
    );
  }

  return (
    <div>
      find countries <input onChange={queryChangedHandler} />
      {displayCountries}
    </div>
  );
};

export default App;
