import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Login from "pages/Login";
import Logout from "pages/Logout";
import Support from "pages/Support";
import Commands from "pages/Commands";
import NotFound from "./pages/NotFound";
import ServerPicker from "pages/dashboard/ServerPicker";
import GuardAuth from "guards/GuardAuth";

// Redux
import { Provider } from "react-redux";
import store from "redux/store.js";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/commands" element={<Commands />}></Route>
          <Route
            path="/dashboard"
            element={
              <GuardAuth>
                <ServerPicker />
              </GuardAuth>
            }
          />
          <Route path="/" element={<h1>Welcom To Home Page</h1>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
