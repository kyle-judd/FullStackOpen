import React from "react";
import Country from "./Country";

const FilteredCountries = ({
  countries,
  handleShow,
  query,
  selectedCountry,
}) => {
  let displayCountries = null;
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    displayCountries = <Country country={country} />;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    displayCountries = (
      <React.Fragment>
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name}>
              {country.name}
              <button onClick={() => handleShow(country.name)}>show</button>
            </li>
          ))}
        </ul>
        {selectedCountry ? <Country country={selectedCountry} /> : null}
      </React.Fragment>
    );
  } else if (query !== "" && filteredCountries.length > 10) {
    displayCountries = <p>Too many matches, be more specific</p>;
  }
  return displayCountries;
};

export default FilteredCountries;
