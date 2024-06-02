import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templates from "./pages/Templates";
import Help from "./pages/Help";
import Price from "./pages/Price";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/templates" element={<Templates />} />
      <Route path="/help" element={<Help />} />
      <Route path="/price" element={<Price />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;