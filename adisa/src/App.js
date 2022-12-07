import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register"
import Dashboard from "./Dashboard"
import Reset from './Reset';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route  path="/register" element={<Register />} />
          <Route  path="/reset" element={<Reset />} />
          <Route  path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
