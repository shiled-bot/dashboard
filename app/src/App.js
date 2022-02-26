import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcom To Home Page</h1>}></Route>
        <Route path="*" element={<h1>No Match Route</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}