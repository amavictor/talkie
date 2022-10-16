import {Route, Routes} from "react-router-dom";
import Home from "./Routes/home/Home";
import Navbar from "./components/Navbar/Navbar";
import Register from "./Routes/Register/Register";
import Login from "./Routes/Login/login";
import RequireAuth from "./Route protection/RequireAuth";
import Profile from "./Routes/Profile/profile";

function App() {
  return (
      <>
          <Navbar/>
          <Routes>
              <Route path={"/"} element={<RequireAuth><Home/></RequireAuth>}/>
              <Route path={"/register"} element={<Register/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/profile"} element={<RequireAuth><Profile/></RequireAuth>}/>
          </Routes>
      </>


  );
}

export default App;
