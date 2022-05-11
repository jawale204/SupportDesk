import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
