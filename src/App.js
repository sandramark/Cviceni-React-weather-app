import React, { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import loader from "./assets/Loader.gif";
import { getTimefromUnix } from "./utils";
import cities from "./cities";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [forecast, setForecast] = useState(null);

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_MY_API_ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      });
  };

  const fetchForecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_MY_API_ID}`
    )
      .then((response) => response.json())
      .then((dataD) => {
        setForecast(dataD.list.filter((_, index) => index % 8 === 0));
      });
  };

  useEffect(() => {
    fetchWeather();
    fetchForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  // const handleClick = (event) => {
  //   setCity(event.target.innerText);

  // };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>My Weather App </h1>{" "}
        <form className="select-wrapper">
          <select
            className="select"
            name="cityselect"
            id="cityselect"
            onChange={handleChange}
          >
            {cities.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </form>
        <div className="weather">
          {/* <div className="button-group">
            <button className="button" onClick={handleClick}>
              Prague{" "}
            </button>{" "}
            <button className="button" onClick={handleClick}>
              Reykjavik{" "}
            </button>{" "}
            <button className="button" onClick={handleClick}>
              Tenerife{" "}
            </button>{" "}
          </div> */}

          {weather ? (
            <Weather
              weatherData={weather}
              cityData={city}
              sunrise={getTimefromUnix(weather?.sys?.sunrise)}
              sunset={getTimefromUnix(weather?.sys?.sunset)}
            />
          ) : (
            <img src={loader} alt="loader" />
          )}

          <div className="weather__forecast" id="predpoved">
            {forecast ? (
              // eslint-disable-next-line no-undef
              forecast.map((item) => <Forecast forecast={item} key={item.dt} />)
            ) : (
              <img src={loader} alt="loader" />
            )}
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default App;
