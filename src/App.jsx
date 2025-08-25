import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import './App.css'


function App() {

  return (
    <>
      <NavBar />
      <h1>Welcome to the Home page</h1>
      <hr />
      <Outlet />
    </>
  );
};

export default App
