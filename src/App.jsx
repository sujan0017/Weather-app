import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCart from "./components/WeatherCart";
import axios from "axios";
import { FaCloud } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { GiWhirlwind } from "react-icons/gi";
import LoadingSpinner from "./components/LoadingSpinner";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("Manama");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  async function handleSearch() {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );
      setWeatherData(res.data);
    } catch {
      setError("City or county not found.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <div className=" relative bg-gray-200 dark:bg-gray-900 w-1/2  mx-auto p-5 flex flex-col gap-5 mt-10 rounded-3xl">
        {loading && <LoadingSpinner />}

        <h1 className="text-center dark:text-white text-2xl font-bold ">
          Weather App <button onClick={toggleDarkMode}>{isDark ? "☀️" : "🌙"}</button>
        </h1>
        <SearchBar
          setCity={setCity}
          onHandleSearch={handleSearch}
          city={city}
        />
        <div className="flex flex-wrap gap-3">
          <WeatherCart
            icon={<FaCloud />}
            title={city}
            data={
              weatherData
                ? `${weatherData.main.temp}°C ${weatherData.weather[0].main}`
                : "No Data"
            }
          />
          <WeatherCart
            icon={<IoIosWater className="text-xl" />}
            title={"Humidity"}
            data={weatherData ? `${weatherData.main.humidity}%` : "---"}
          />
          <WeatherCart
            icon={<GiWhirlwind className="text-xl" />}
            title={"Wind Speed"}
            data={weatherData ? `${weatherData.wind.speed} km/hr` : "---"}
          />
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </>
  );
}

export default App;
