import React from "react";

const Country = ({ country }) => (
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
    <img
      style={{ height: 100, width: 100 }}
      src={country.flag}
      alt={`Flag of ${country.name}`}
    />
  </div>
);

export default Country;
