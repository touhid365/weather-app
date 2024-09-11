import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/weather.css'; // Import the CSS file

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [inputCity, setInputCity] = useState(''); // For user input

  const apiKey = '5027d22331b53814cd6ac520c92a09ae'; // Replace with your actual API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric'
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  const handleCityChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleSubmit = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity(''); // Clear input field after submitting
    }
  };

  if (loading) {
    return <div className="weather-loading">Loading...</div>;
  }

  if (error) {
    return <div className="weather-error">Error: {error.response ? error.response.data.message : error.message}</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card weather-card">
        <div className="card-body">
          <h1 className="card-title mb-4 text-success">Weather App</h1>
          <div className="weather-input mb-4">
            <input
              type="text"
              className="form-control mb-2"
              value={inputCity}
              onChange={handleCityChange}
              placeholder="Enter city"
            />
            <button className="btn btn-primary" onClick={handleSubmit}>Get Weather</button>
          </div>
          {weatherData && (
            <div className="weather-info">
              <h2 className="card-subtitle mb-2 text-info">Weather in {weatherData.name}</h2>
              <div className="weather-details">
                <p className="card-text">Temperature: {weatherData.main.temp} °C</p>
                <p className="card-text">Weather: {weatherData.weather[0].description}</p>
                <p className="card-text">Humidity: {weatherData.main.humidity} %</p>
                <p className="card-text">Wind Speed: {weatherData.wind.speed} m/s</p>
                <p className="card-text">Pressure: {weatherData.main.pressure} hPa</p>
                <img 
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                  alt={weatherData.weather[0].description}
                  className="weather-icon"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
