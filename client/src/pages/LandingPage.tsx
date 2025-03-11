import React, { useState } from "react";
import ParkSearch from "../components/ParkSearch";
import ParkList from "../components/ParkList";
import WeatherDisplay from "../components/WeatherDisplay";
import { usePark } from "../context/ParkContext";

const LandingPage: React.FC = () => {
  const { selectedPark } = usePark();

  return (
    <div className="container">
      <h1 className="title">Welcome to Parks and Weather</h1>
      <p className="description">
        Enter your destination state to find the top parks and get weather-based product recommendations.
      </p>

      {/* Search Component */}
      <ParkSearch />

      {/* Display Parks */}
      <ParkList />

      {/* Show Weather if a park is selected */}
      {selectedPark && <WeatherDisplay />}
    </div>
  );
};

export default LandingPage;
