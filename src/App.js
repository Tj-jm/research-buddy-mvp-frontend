import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import FutureDevelopment from "./pages/FutureDevelopment";
import Copyright from "./components/Copyright";
import { Box } from "@mui/material";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PaperPage from "./pages/PaperPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import FacultyScraper from "./pages/FacultyScrapper";
import SavedScraperList from "./pages/SavedScrapperList";
import SavedScraperDetail from "./pages/SavedScraperDetail";
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/future" element={<FutureDevelopment />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paper/:id"
            element={
              <ProtectedRoute>
                <PaperPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-scraper"
            element={
              <ProtectedRoute>
                <FacultyScraper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-scrapper-list"
            element={
              <ProtectedRoute>
                <SavedScraperList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-scrapper/:id"
            element={
              <ProtectedRoute>
                <SavedScraperDetail />
              </ProtectedRoute>
            }
          />


        </Routes>
        <Box>
          <Copyright />
        </Box>
      </Router>
    </AuthProvider>
  );
}
