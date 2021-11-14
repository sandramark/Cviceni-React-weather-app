import React from "react";
import { getDatefromUnix } from "../../utils";
import "../../App.css";

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast">
      <div className="forecast__day"> {getDatefromUnix(forecast?.dt)} </div>{" "}
      <div className="forecast__icon">
        {" "}
        <img
          src={`http://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`}
          alt="current weather icon"
        />{" "}
      </div>{" "}
      <div className="forecast__temp">
        {" "}
        {Math.round(forecast?.main?.temp)}°C{" "}
      </div>{" "}
    </div>
  );
};

export default Forecast;
