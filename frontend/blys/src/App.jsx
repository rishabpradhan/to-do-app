import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SigninPage from "./components/SiginPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/login" element={<SigninPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />
        </Routes>
      </Router>
    </>
  );
}
