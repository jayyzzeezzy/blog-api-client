import { Link } from "react-router-dom";
import * as authServices from "./services/authServices";

function Logout() {
  authServices.logout();

  return (
    <>
      <p>You have logged out.</p>
      <Link to="/login">Click here to log in again</Link>
    </>
  );
};

export default Logout;