import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  console.log(country);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const api_key = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((res) => {
        console.log(res.data);
        setWeatherData(res.data);
        setLoading(!loading);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const content = loading ? (
    <div></div>
  ) : (
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
      <h2>Weather in {country.capital}</h2>
      <p>
        <strong>temperature: {weatherData.current.temperature}</strong>
      </p>
      <img
        style={{ height: 75, width: 75 }}
        src={weatherData.current.weather_icons}
        alt={`Current weather`}
      />
      <p>
        <strong>wind:</strong> mph {weatherData.current.wind_speed} direction{" "}
        {weatherData.current.wind_dir}
      </p>
    </div>
  );

  return content;
};

export default Country;
