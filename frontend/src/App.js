import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

import { AuthProvider } from './Authentication/AuthContext';
import LoginPage from './Authentication/LoginPage';
import PrivateComponent from './Authentication/PrivateComponent';
import BookingForm from "./BookingForm";

function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route 
              path="/" 
              element={<PrivateComponent><BookingForm /></PrivateComponent>} 
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<h2>Error 404</h2>} />
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
