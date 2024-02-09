import React from 'react';

// Mostra le previsioni meteo
function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null; // Non renderizza nulla se non ci sono dati

  return (
    <div className="daysForecast">
      <h2>Le previsioni nei prossimi 5 giorni</h2>
      <ul className="weatherCards">
        {forecast.map((day, index) => (
          <li key={index} className="card">
            <h3>({new Date(day.date).toLocaleDateString()})</h3>
            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="Weather icon" />
            <h4>Temperatura: {day.temp}°C</h4>
            <h4>Vento: {day.wind} m/s</h4>
            <h4>Umidità: {day.humidity}%</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forecast;
