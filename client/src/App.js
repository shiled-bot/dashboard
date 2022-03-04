import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<h1>Welcom To Home Page</h1>}></Route>
        <Route path="*" element={<h1>No Match Route</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
