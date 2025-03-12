import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ParkProvider } from "./context/ParkContext";
import LandingPage from "./pages/LandingPage";
import ParkPage from "./pages/ParkPage";
import PrivateRoute from "../PrivateRoute.tsx"; // Protect parks page

function App() {
  return (
    <AuthProvider>
      <ParkProvider>
        <Routes>
          {/* Landing Page (Includes Login) */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Parks Page */}
          <Route
            path="/parks"
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
