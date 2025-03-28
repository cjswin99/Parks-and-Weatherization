export const getWeatherByCoords = async (lat: number, lon: number) => {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return await res.json();
};

export const getForecastByCoords = async (lat: number, lon: number) => {
  const res = await fetch(`/api/weather/forecast?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return await res.json();
};
