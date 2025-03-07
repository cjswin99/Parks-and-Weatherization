import { createContext, useContext, useState, ReactNode } from 'react';

interface ParkContextType {
  selectedPark: string | null;
  setSelectedPark: (park: string) => void;
  weather: any;
  setWeather: (data: any) => void;
}

const ParkContext = createContext<ParkContextType | undefined>(undefined);

export const ParkProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPark, setSelectedPark] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);

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
