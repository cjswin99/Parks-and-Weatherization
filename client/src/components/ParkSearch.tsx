import { useState } from 'react';
import { usePark } from '../context/ParkContext';

const ParkSearch = () => {
  const [state, setState] = useState('');
  const { selectedPark, setSelectedPark, setWeather } = usePark();
  const [parks, setParks] = useState<string[]>([]);
  
  // Fetch parks from Express API
  const fetchParks = async () => {
    try {
      const response = await fetch(`/api/park/${state}`);
      const data = await response.json();
      setParks(data);
    } catch (error) {
      console.error("Error fetching parks:", error);
    }
  };

  // Fetch weather for selected park
  const fetchWeather = async (park: string) => {
    try {
      setSelectedPark(park);
      const response = await fetch(`/api/weather?location=${park}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">Find a National Park</h2>
      
      <input
        type="text"
        placeholder="Enter state (e.g., UT)"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={fetchParks} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Search
      </button>

      {parks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Select a Park:</h3>
          <ul>
            {parks.map((park) => (
              <li key={park.id} className="cursor-pointer text-blue-600" 
              // onClick={() => fetchWeather(park)}
              >
                {park.fullName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedPark && (
        <div className="mt-4 p-3 bg-white shadow rounded">
          <h3 className="text-lg font-bold">{selectedPark} Weather</h3>
          <WeatherDisplay />
        </div>
      )}
    </div>
  );
};

export default ParkSearch;