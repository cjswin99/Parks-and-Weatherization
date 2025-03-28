import { useState } from "react";
import WeatherDisplay from "@/components/WeatherDisplay";

interface Park {
  id: string;
  fullName: string;
  description: string;
  latitude: string;
  longitude: string;
  images?: { url: string; title: string }[];
}

const ParkPage = () => {
  const [stateCode, setStateCode] = useState("");
  const [parks, setParks] = useState<Park[]>([]);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    try {
      setSelectedPark(null);
      const response = await fetch(`/api/parks/${stateCode}`);
      const data = await response.json();
      if (data.length === 0) {
        setError("No parks found for this state code.");
      } else {
        setError("");
        setParks(data);
      }
    } catch (err) {
      console.error("❌ Parks API error:", err);
      setError("Failed to load parks.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="page-title">Find a Park</h1>

      <div className="search-bar">
        <input
          type="text"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value.toUpperCase())}
          placeholder="Enter state code (e.g., UT)"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          Search State
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="park-grid">
        {parks.map((park) => (
          <div
            key={park.id}
            className="park-card"
            onClick={() => setSelectedPark(park)}
          >
            <h2>{park.fullName}</h2>
          </div>
        ))}
      </div>

      {selectedPark && (
        <div className="selected-park-section">
          <h2 className="page-title">{selectedPark.fullName}</h2>
          <p>{selectedPark.description}</p>

          {selectedPark.images && selectedPark.images.length > 0 && (
            <div className="park-images-grid">
              {selectedPark.images.slice(0, 4).map((img, index) => (
                <div key={index} className="park-image-card">
                  <img src={img.url} alt={img.title} />
                  <p>{img.title}</p>
                </div>
              ))}
            </div>
          )}

          <WeatherDisplay
            lat={parseFloat(selectedPark.latitude)}
            lon={parseFloat(selectedPark.longitude)}
          />
        </div>
      )}
    </div>
  );
};

export default ParkPage;
