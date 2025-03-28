export interface Park {
    id: string;
    fullName: string;
    latitude: string;
    longitude: string;
  }
  
  export interface Weather {
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  }
  
  export interface ParkContextType {
    selectedPark: Park | null;
    setSelectedPark: (park: Park | null) => void;
    parks: Park[];
    setParks: (parks: Park[]) => void;
    weather: Weather | null;
    setWeather: (weather: Weather | null) => void;
    fetchWeather: (lat: string, lon: string) => Promise<void>;
  }
  