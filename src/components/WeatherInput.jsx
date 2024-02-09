import React, { useState } from 'react';

function WeatherInput({ onSearch }) {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
  };

  // Gestisce il click su Btn della posizione attuale
  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Ho provato di tutto ma non sta funzionando, mi sa che mi sono incasinato troppo.
          // Logica utilizzata: 
          // 1. Richiedo il permesso invocando navigator.geolocation.getCurrentPosition. Il browser mostra all'utente il prompt per richiedere il permesso di accedere alla posizione. Se l'utente concede il permesso, la funzione dovrebbe proseguire e ottenere le coordinate della posizione attuale.
          // 2. una volta ottenuta la posizione, la funzione di callback di getCurrentPosition viene eseguita con i dettagli della posizione, inclusi latitudine e longitudine. Questi dati dovrebbero quindi essere utilizzati per effettuare una ricerca meteo basata sulla posizione attuale dell'utente, ma non compare niente né in app né in console
        },
        (error) => {
          console.error("Errore nell'ottenere la posizione", error);
          // Errore
        }
      );
    } else {
      console.error('Non è stato possibile trovare la tua posizione');
      // Informa l'utente che la geolocalizzazione non è disponibile
    }
  };

  return (
    <div className="weatherInput">
      <h3>Ricerca per città...</h3>
      <input
        className="cityInput"
        type="text"
        placeholder="E.s. New York, Londra, Tokyo, Foggia"
        value={city}
        onChange={handleChange}
      />
      <button className="searchBtn" onClick={handleSearch}>
        Cerca
      </button>
      <div className="separator"></div>
      <button className="locationBtn" onClick={handleLocationSearch}>
        Utilizza posizione attuale
      </button>
    </div>
  );
}

export default WeatherInput;
