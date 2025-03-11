import React from "react";
import { usePark } from "../context/ParkContext";
import Card from "./Card";

const ParkList: React.FC = () => {
  const { parks, fetchWeather } = usePark();

  if (parks.length === 0) return null;

  return (
    <div className="cards-container">
      {parks.map((park, index) => (
        <Card key={index} title={park.name} description={park.description} onClick={() => fetchWeather(park.name)} />
      ))}
    </div>
  );
};

export default ParkList;
