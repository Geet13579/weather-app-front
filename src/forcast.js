import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
 

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

console.log(props.weather)

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather.main}</h3>
      
        <ul>
          {typeof props.weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {props.weather.location}, {props.weather.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${props.weather.icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {/* {Math.round(weather.main.temp)}°c ({weather.weather[0].main}) */}
                {Math.round(props.weather.temperature -273)}°<span>C</span>

                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(props.weather.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(props.weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(props.weather.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
         
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
