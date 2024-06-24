import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
