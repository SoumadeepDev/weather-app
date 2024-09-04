import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_day_icon from "../assets/Clear_Day.gif";
import clear_night_icon from "../assets/Clear-Night.gif";
import cloudy_icon from "../assets/cloudy.gif";
import rainy_icon from "../assets/rainy.gif";
import partly_cloudy from "../assets/partly-cloudy.gif";
import snow_icon from "../assets/snow.gif";
import thunderstorm from "../assets/thunderstorm-1.gif";
import mist from "../assets/mist.gif";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import loading_icon from "../assets/loading.gif";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("C");
  const [location, setLocation] = useState("");
  const [searchLoc, setSearchLoc] = useState(
    localStorage.getItem("searchLoc") || "New York"
  );
  const [cities, setCities] = useState([]);

  const allIcons = {
    "01d": clear_day_icon,
    "01n": clear_night_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": partly_cloudy,
    "04n": cloudy_icon,
    "09d": rainy_icon,
    "09n": rainy_icon,
    "10d": rainy_icon,
    "10n": rainy_icon,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist,
    "50n": mist,
  };

  const backgroundColorClass = {
    "01d": "clear_day",
    "01n": "clear_night",
    "02d": "cloudy",
    "02n": "cloudy",
    "03d": "cloudy",
    "03n": "cloudy",
    "04d": "partly_cloudy",
    "04n": "cloudy",
    "09d": "rainy",
    "09n": "rainy",
    "10d": "rainy",
    "10n": "rainy",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snow",
    "13n": "snow",
    "50d": "mist",
    "50n": "mist",
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("No city found. Please try again.");
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://dev.api.propacity.in/api/v1/public/getAllCities?searchText=a"
      );
      const result = await response.json();
      setCities(result.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCities();
    search(searchLoc);
  }, [searchLoc]);

  const convertTemperature = (kelvin) => {
    if (unit === "C") {
      return (kelvin - 273.15).toFixed(0);
    } else {
      return ((kelvin - 273.15) * (9 / 5) + 32).toFixed(0);
    }
  };

  const toSentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (!weatherData) {
    return <div className="loading-icon"></div>;
  }

  const icon = allIcons[weatherData.weather[0].icon] || clear_day_icon;
  const back_color = backgroundColorClass[weatherData.weather[0].icon];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchLoc(location);
    localStorage.setItem("searchLoc", location); // Save to localStorage
  };

  const handleClear = () => {
    setLocation("");
  };

  return (
    <div className={`weather ${back_color}`}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list="cities"
          />
          {location && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              X
            </button>
          )}
        </div>
        <datalist id="cities">
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}, {city.state}
            </option>
          ))}
        </datalist>
        <button type="submit">
          <img src={search_icon} alt="Search" />
        </button>
      </form>

      {weatherData && (
        <>
          <img src={icon} alt="Weather Icon" className="weather-icon" />
          <p className="weather-summary">
            {toSentenceCase(weatherData.weather[0].description)}
          </p>
          <p className="temperature">
            {convertTemperature(weatherData.main.temp)}°{unit}
          </p>
          <button
            className="temperature_button"
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
          >
            Change to °{unit === "C" ? "F" : "C"}
          </button>
          <p className="location">{weatherData.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.wind.speed} Km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
