// import React, { useState } from 'react';
// import WeatherInput from './components/WeatherInput';
// import CurrentWeather from './components/CurrentWeather';
// import Forecast from './components/Forecast';
// import './App.css'; 


// function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);

//   const API_KEY = '194b9db0252039b9150907ebf9577786';

//   // Funzione per cercare i dettagli meteo utilizzando il nome della città
//   const searchWeather = (city) => {
//     const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

//     // Fetch delle coordinate geografiche basate sul nome della città
//     fetch(GEOCODING_API_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.length > 0) {
//           const { lat, lon, name } = data[0];
//           fetchWeatherDetails(name, lat, lon);
//         } else {
//           alert('Città non trovata.');
//         }
//       });
//   };

//   // Funzione per ottenere i dettagli meteo e la previsione per i prossimi 5 giorni
//   const fetchWeatherDetails = (cityName, lat, lon) => {
//     const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`;

//     fetch(WEATHER_API_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.list) {
//           const current = data.list[0];
//           setCurrentWeather({
//             city: cityName,
//             temp: current.main.temp.toFixed(1),
//             wind: current.wind.speed.toFixed(1),
//             humidity: current.main.humidity,
//             description: current.weather[0].description,
//             icon: current.weather[0].icon,
//             date: current.dt_txt,
//           });

//           // Filtraggio dei dati per ottenere una previsione per i prossimi 5 giorni
//           const dailyForecast = data.list
//             .filter((item, index) => index % 8 === 0)
//             .map((item) => ({
//               temp: item.main.temp.toFixed(1),
//               wind: item.wind.speed.toFixed(1),
//               humidity: item.main.humidity,
//               description: item.weather[0].description,
//               icon: item.weather[0].icon,
//               date: item.dt_txt,
//             }));

//           setForecast(dailyForecast);
//         }
//       });
//   };

//   return (
//     <div className="App">
//       <h1>Dashboard Meteo</h1>
//       <div className="container">
//         <WeatherInput onSearch={searchWeather} />
//         <div className="weatherData">
//           <CurrentWeather weather={currentWeather} />
//           <Forecast forecast={forecast} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import WeatherInput from './components/WeatherInput';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { Button } from 'react-bootstrap'; // Assicurati di avere react-bootstrap installato
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]); // Aggiunto per tenere traccia delle città cercate

  const API_KEY = '194b9db0252039b9150907ebf9577786';

  const searchWeather = (city) => {
    if (!searchedCities.includes(city)) {
      setSearchedCities([...searchedCities, city]); // Aggiunge la città all'elenco se non già presente
    }

    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

    fetch(GEOCODING_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon, name } = data[0];
          fetchWeatherDetails(name, lat, lon);
        } else {
          alert('Città non trovata.');
        }
      });
  };

  const fetchWeatherDetails = (cityName, lat, lon) => {
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
        }
      });
  };

  return (
    <div className="App">
      <h1>Dashboard Meteo</h1>
      <div className="container">
        <WeatherInput onSearch={searchWeather} />
        {/* Bottoni delle città cercate */}
        <div className="searched-cities mt-3">
          {searchedCities.map((city) => (
            <Button key={city} variant="success" className="me-2" onClick={() => searchWeather(city)}>
              {city}
            </Button>
          ))}
        </div>
        <div className="weatherData">
          <CurrentWeather weather={currentWeather} />
          <Forecast forecast={forecast} />
        </div>
      </div>
    </div>
  );
}

export default App;


