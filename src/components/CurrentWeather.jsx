import React from 'react';

// Componente per mostrare i dettagli del meteo attuale
function CurrentWeather({ weather }) {
  if (!weather) return null; // Non renderizzare nulla se non ci sono dati

  return (
    <div className="currentWeather">
      <div className="details">
        <h2>{weather.city} ({new Date(weather.date).toLocaleDateString()})</h2>
        <h4>Temperatura: {weather.temp}°C</h4>
        <h4>Vento: {weather.wind} m/s</h4>
        <h4>Umidità: {weather.humidity}%</h4>
      </div>
      <div className="icon">
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="Weather icon" />
        <h4>{weather.description}</h4>
      </div>
    </div>
  );
}

export default CurrentWeather;
