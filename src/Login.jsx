import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authServices from "./services/authServices";

const Login = () => {
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    setVerifying(true);
    setError(null);
    try {
        const response = await fetch(
          'http://localhost:3000/login', 
          {
            mode: "cors",
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          },
        );

        if (!response.ok) {
            setError("Incorrect username and/or password");
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        authServices.setLocalStorage(data);
        navigate("/");
    } catch (error) {
        console.log(error);
        navigate("/login");
    } finally {
        setVerifying(false);
    }
  }

  if (verifying) return <p>Verifying...</p>;

  return (
    <div>
        {error && <p>{error}</p>}
        <form method="POST" onSubmit={(e) => handleFormSubmit(e)} >
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <input type="submit" value="Submit" />
        </form>
    </div>
  );
};

export default Login;