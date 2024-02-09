import React, { useState } from 'react';

function WeatherInput({ onSearch }) {
  const [city, setCity] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    // Chiama onSearch passando il nome della città
    onSearch(city, (result) => {
      // Questa callback viene chiamata solo se la ricerca ha successo
      if (result && !searchHistory.includes(city)) {
        setSearchHistory((prevHistory) => [...prevHistory.slice(-4), city]);
      }
    });
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch({ latitude, longitude }, (result) => {
            // Gestisci qui la logica per la ricerca basata sulla posizione, se necessario
          });
        },
        (error) => {
          console.error("Errore nell'ottenere la posizione", error);
          alert(
            'Impossibile ottenere la posizione attuale. Verifica i permessi del browser.'
          );
        }
      );
    } else {
      console.error('Geolocalizzazione non supportata dal tuo browser.');
      alert('Il tuo browser non supporta la geolocalizzazione.');
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
      <div className="searchHistory">
        {searchHistory.map((item, index) => (
          <button
            key={index}
            id="historyBtn"
            onClick={() => onSearch(item, () => {})}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="separator"></div>
      <button className="locationBtn" onClick={handleLocationSearch}>
        Utilizza posizione attuale
      </button>
      
    </div>
  );
}

export default WeatherInput;
