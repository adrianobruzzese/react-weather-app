import React, { useState } from 'react';
import WeatherInput from './components/WeatherInput';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]);

  const API_KEY = '194b9db0252039b9150907ebf9577786';

  const searchWeather = (searchQuery, onSuccess) => {
    // Aggiunto parametro onSuccess
    if (typeof searchQuery === 'string') {
      const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${API_KEY}`;
      fetch(GEOCODING_API_URL)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            const { lat, lon, name } = data[0];
            fetchWeatherDetails(name, lat, lon, onSuccess); // Passo onSuccess a fetchWeatherDetails
          } else {
            alert('Città non trovata.');
          }
        });
    } else if (
      typeof searchQuery === 'object' &&
      searchQuery.latitude &&
      searchQuery.longitude
    ) {
      const REVERSE_GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${searchQuery.latitude}&lon=${searchQuery.longitude}&limit=1&appid=${API_KEY}`;
      fetch(REVERSE_GEOCODING_API_URL)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            const { name } = data[0];
            fetchWeatherDetails(
              name,
              searchQuery.latitude,
              searchQuery.longitude,
              onSuccess
            ); // Passa onSuccess ->
          } else {
            fetchWeatherDetails(
              'Posizione sconosciuta',
              searchQuery.latitude,
              searchQuery.longitude
            );
          }
        });
    }
  };

  const fetchWeatherDetails = (cityName, lat, lon, onSuccess) => {
    // Aggiunto parametro onSuccess
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`;

    fetch(WEATHER_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.list) {
          const current = data.list[0];
          setCurrentWeather({
            city: cityName,
            temp: current.main.temp.toFixed(1),
            wind: current.wind.speed.toFixed(1),
            humidity: current.main.humidity,
            description: current.weather[0].description,
            icon: current.weather[0].icon,
            date: current.dt_txt,
          });

          const dailyForecast = data.list
            .filter((item, index) => index % 8 === 0)
            .map((item) => ({
              temp: item.main.temp.toFixed(1),
              wind: item.wind.speed.toFixed(1),
              humidity: item.main.humidity,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
              date: item.dt_txt,
            }));

          setForecast(dailyForecast);
          if (onSuccess) {
            onSuccess(cityName); // Passo il nome della città se la ricerca ha successo
          }
        }
      });
  };

  return (
    <div className="App">
      <h1>Dashboard Meteo</h1>
      <div className="container">
        <WeatherInput
          onSearch={(query) =>
            searchWeather(query, (cityName) => {
              if (!searchedCities.includes(cityName)) {
                setSearchedCities([...searchedCities, cityName]); // Aggiorna la cronologia solo se la ricerca ha successo
              }
            })
          }
        />
        {/* <div>
          {searchedCities.map((city) => (
            <Button
              key={city}
              variant="success"
              id="historyBtn"
              onClick={() => searchWeather(city)}
            >
              {city}
            </Button>
          ))}
          </div> */}
         {/*Componente della cronologia eliminato per mancanza di tempo, ci lavorerò nei prossimi giorni*/}
        <div className="weatherData">
          <CurrentWeather weather={currentWeather} />
          <Forecast forecast={forecast} />
        </div>
      </div>
    </div>
  );
}

export default App;
