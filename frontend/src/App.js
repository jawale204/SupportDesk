import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateTicket from "./pages/CreateTicket";
import PrivateRoute from "./components/PrivateRoute";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" exact element={<Register />}></Route>
            <Route path="/new-ticket" exact element={<PrivateRoute />}>
              <Route
                path="/new-ticket"
                exact
                element={<CreateTicket />}
              ></Route>
            </Route>
            <Route path="/tickets" exact element={<PrivateRoute />}>
              <Route path="/tickets" exact element={<Tickets />}></Route>
            </Route>
            <Route path="/ticket/:ticketId" exact element={<PrivateRoute />}>
              <Route
                path="/ticket/:ticketId"
                exact
                element={<Ticket />}
              ></Route>
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
