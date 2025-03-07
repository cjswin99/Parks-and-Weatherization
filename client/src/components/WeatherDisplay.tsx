import { usePark } from "../context/ParkContext";

const WeatherDisplay = () => {
  const { weather } = usePark();

  if (!weather) return <p>No weather data available.</p>;

  return (
    <div className="mt-2">
      <h4 className="font-bold">Weather Forecast:</h4>
      <ul>
        {weather.forecast.map((day: any, index: number) => (
          <li key={index} className="text-gray-700">{day.date}: {day.condition}, {day.temp}°F</li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;
