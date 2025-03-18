import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface Park {
  id: string;
  fullName: string;
}

const ParkPage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [stateCode, setStateCode] = useState("");
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchParks = async () => {
    if (!stateCode) {
      setError("Please select a state.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Fetching parks from API...");
      const response = await fetch(`${API_BASE_URL}/api/parks?stateCode=${stateCode}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch parks.");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setParks(data.data || []);
    } catch (err) {
      setError("Error fetching parks. Try again.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Find National Parks</h1>
      <label>
        Select State:
        <select value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
        <option value="">-- Select a State --</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
        </select>
      </label>
      <button onClick={fetchParks} disabled={loading}>
        {loading ? "Searching..." : "Find Parks"}
      </button>

      {error && <p className="error">{error}</p>}

      <ul>
        {parks.length > 0 ? (
          parks.map((park) => (
            <li key={park.id}>
              <a href={`/weather/${park.id}`}>{park.fullName}</a>
            </li>
          ))
        ) : (
          <p>No parks found.</p>
        )}
      </ul>
    </div>
  );
};

export default ParkPage;
