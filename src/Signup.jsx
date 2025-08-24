import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authServices from "./services/authServices";

const Signup = () => {
    const [error, setError] = useState(null);
    const [registering, setRegistering] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const secretCode = e.target.secretCode.value;

        setRegistering(true);
        setError(null);
        try {
            const response = await fetch(
                'http://localhost:3000/signup', 
                {
                    mode: "cors",
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, confirmPassword, secretCode }),
                },
            );
            const data = await response.json();

            if (!response.ok) {
                console.log("Errors: ", data.errors);
                setError(data.errors);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            authServices.setLocalStorage(data);
            navigate("/");
        } catch (error) {
            console.log(error);
            navigate("/signup");
        } finally {
            setRegistering(false);
        }
    }

    if (registering) return <p>Registering...</p>;

    return (
        <div>
            {error && error.length > 0 && error.map((item, index) => {
                return <p key={index}>{item.msg}</p>
            })}

            <form method="POST" onSubmit={(e) => handleFormSubmit(e)} >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />

                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required />

                <label htmlFor="secretCode">Secet Code <span>(optional)</span></label>
                <input type="password" id="secretCode" name="secretCode" />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Signup;