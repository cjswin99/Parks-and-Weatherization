import { useEffect, useState } from "react";
import { getWeatherByCoords, getForecastByCoords } from "@/service/weatherService";

interface WeatherDisplayProps {
  lat: number;
  lon: number;
}

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastEntry {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

const WeatherDisplay = ({ lat, lon }: WeatherDisplayProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getWeatherByCoords(lat, lon)
      .then((data: WeatherData) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Weather fetch error:", err);
        setError("Failed to load weather data.");
        setLoading(false);
      });
  
    getForecastByCoords(lat, lon)
      .then((data: { list: ForecastEntry[] }) => {
        const daily = data.list.filter((entry) =>
          entry.dt_txt.includes("12:00:00")
        );
        setForecast(daily.slice(0, 5));
      })
      .catch((err: unknown) => {
        console.error("Forecast error:", err);
      });
  }, [lat, lon]);
  

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return null;

  const current = weather.weather[0];

  return (
    <div className="mt-6 p-4 border rounded bg-blue-50 shadow">
      <h3 className="text-xl font-semibold mb-2">
        Weather in {weather.name}
      </h3>
      <div className="bg-gradient-to-r from-sky-100 to-blue-200 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`}
          alt={current.description}
          className="w-24 h-24 sm:w-28 sm:h-28"
        />
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-1">
            {weather.name}
          </h3>
          <p className="text-lg capitalize text-gray-800 mb-2">
            {current.description}
          </p>
          <div className="space-y-1 text-gray-700 text-sm sm:text-base">
            <p>🌡️ Temp: <span className="font-semibold">{weather.main.temp.toFixed(1)}°F</span></p>
            <p>💨 Feels Like: {weather.main.feels_like.toFixed(1)}°F</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} mph</p>
          </div>
        </div>
      </div>


      {/* 5-day forecast */}
      {forecast.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3 text-center sm:text-left text-gray-700">
            5-Day Forecast
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((entry, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-blue-100 to-blue-200 p-4 rounded-2xl shadow-md flex flex-col items-center text-center transition-transform hover:scale-105"
              >
                <p className="text-sm font-semibold text-blue-800">
                  {new Date(entry.dt_txt).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                  alt={entry.weather[0].description}
                  className="w-16 h-16 my-1"
                />
                <p className="capitalize text-sm text-gray-700">{entry.weather[0].description}</p>
                <p className="text-xl font-bold text-blue-900">{entry.main.temp.toFixed(0)}°F</p>
              </div>
            ))}
    </div>
  </div>
)}
    </div>
  );
};

export default WeatherDisplay;
