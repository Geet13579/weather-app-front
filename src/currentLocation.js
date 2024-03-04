
import React, { useState, useEffect } from 'react';

import Clock from "react-live-clock";
import Forcast from "./forcast";

function CurrentLocation() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [icon, setIcon] = useState("CLEAR_DAY");


 

  useEffect(() => {
    let isMounted = true;

    const fetchWeatherData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if (isMounted) {
              setLocation({ latitude, longitude });
            }

            try {
              const response = await fetch('https://weather-app-back-iqb6.onrender.com/api/weather', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  latitude,
                  longitude
                })
              });
              if (!response.ok) {
                throw new Error('Failed to fetch weather data');
              }
              const data = await response.json();
              if (isMounted) {
                setWeatherData(data);
                switch (data.main) {
                  case "Haze":
                    setIcon("CLEAR_DAY" );
                    break;
                  case "Clouds":
                    setIcon("CLOUDY" );
                    break;
                  case "Rain":
                    setIcon("RAIN" );
                    break;
                  case "Snow":
                    setIcon("SNOW" );
                    break;
                  case "Dust":
                    setIcon("WIND" );
                    break;
                  case "Drizzle":
                    setIcon("SLEET" );
                    break;
                  case "Fog":
                    setIcon("FOG" );
                    break;
                  case "Smoke":
                    setIcon("FOG");
                    break;
                  case "Tornado":
                    setIcon("WIND");
                    break;
                  default:
                    setIcon("CLEAR_DAY");
                }
              }
            } catch (error) {
              console.error('Error fetching weather data:', error);
            }
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

    return () => {
      isMounted = false;
    };
  }, []);


 

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

 

  return (
    <React.Fragment>
      {console.log('weatherData', weatherData)}
      {console.log('location', location)}

      {weatherData && location && (
        <div>
        <div className="city">
          <div className="title">
            <h2>{weatherData.location}</h2>
            <h3>{weatherData.country}</h3>
          </div>
         
       
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
              </div>
              <div className="temperature">
                <p>
                {Math.round(weatherData.temperature -273)}°<span>C</span>

                </p>
             
              </div>
            </div>
            </div>
            <Forcast icon={icon} weather={weatherData}  />
          </div>
      )}
    </React.Fragment>
  );
}

export default CurrentLocation;
