import React from "react";
import "../../App.css";

const Weather = ({ weatherData, cityData, sunrise, sunset }) => {
  return (
    <div
      className={`weather__current ${
        weatherData?.main.temp < 10 ? "weather__current--cold" : " "
      }`}
    >
      <h2 className="weather__city" id="mesto">
        {cityData}, Country
      </h2>
      <div className="weather__inner weather__inner--center">
        <div className="weather__section weather__section--temp">
          <span className="weather__temp-value" id="teplota">
            {Math.round(weatherData?.main?.temp)}
          </span>
          <span className="weather__temp-unit">°C</span>
          <div className="weather__description" id="popis">
            {weatherData?.weather[0].main}
          </div>
        </div>
        <div className="weather__section weather__section--icon" id="ikona">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
            alt="current weather icon"
          />
        </div>
      </div>
      <div className="weather__inner">
        <div className="weather__section">
          <h3 className="weather__title">Wind</h3>
          <div className="weather__value">
            <span id="wind">{weatherData?.wind.speed}</span> km/h
          </div>
        </div>
        <div className="weather__section">
          <h3 className="weather__title">Humidity</h3>
          <div className="weather__value">
            <span id="humidity">{weatherData?.main.humidity}</span> %
          </div>
        </div>
      </div>
      <div className="weather__inner">
        <div className="weather__section">
          <h3 className="weather__title">Sunrise</h3>
          <div className="weather__value">
            <span id="sunrise">{sunrise}</span>
          </div>
        </div>
        <div className="weather__section">
          <h3 className="weather__title">Sunset</h3>
          <div className="weather__value">
            <span id="sunset">{sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
