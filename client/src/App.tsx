import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ParkProvider } from "./context/ParkContext";
import LandingPage from "./pages/LandingPage";
import ParkPage from "./pages/ParkPage";
import PrivateRoute from "../PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <ParkProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/park"
            element={
              <PrivateRoute>
                <ParkPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </ParkProvider>
    </AuthProvider>
  );
}

export default App;
