import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { AuthProvider } from './Authentication/AuthContext';
import LoginPage from './Authentication/LoginPage';
import RegisterPage from "./Authentication/RegisterPage";
import PrivateComponent from './Authentication/PrivateComponent';
import BookingForm from "./Components/BookingForm/BookingForm";
import BookingsTable from "./Components/BookingTable/BookingsTable";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={<PrivateComponent><Header /><BookingsTable /></PrivateComponent>} 
          />
          <Route 
            path="form" 
            element={<PrivateComponent><Header /><BookingForm /></PrivateComponent>} 
          />
          <Route path="*" element={<h2>Error 404</h2>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
