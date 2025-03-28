import { createContext, useContext, useState, ReactNode } from 'react';
import { Weather } from '../types';

interface Park {
  id: string;
  fullName: string;
  latitude: string;
  longitude: string;
}

interface ParkContextType {
  selectedPark: Park | null;
  setSelectedPark: (park: Park | null) => void;
  weather: Weather | null;
  setWeather: (data: Weather | null) => void;
}

const ParkContext = createContext<ParkContextType | undefined>(undefined);

export const ParkProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  return (
    <ParkContext.Provider value={{ selectedPark, setSelectedPark, weather, setWeather }}>
      {children}
    </ParkContext.Provider>
  );
};

export const usePark = () => {
  const context = useContext(ParkContext);
  if (!context) {
    throw new Error("usePark must be used within a ParkProvider");
  }
  return context;
};
