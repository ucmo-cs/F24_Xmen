import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8081/user/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.text();
            setLoginStatus(result);
            if (result === "Login Successful") {
                window.location.href = "/loan";
            }
        } catch (error) {
            console.error("Error:", error);
            setLoginStatus("An error occurred. Please try again.");
        }
    };

    return(
        <div >
            <Form onSubmit={handleLogin}>
                <h1 id="login-div">Login Portal</h1>
                <h5 id="text-align-left">Username</h5>
                <Form.Control
                    id = "floating-box"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h5 id="text-align-left">Password</h5>
                <Form.Control
                    id = "floating-box"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text id="text-align-left" muted>
                    Your password must be at least 8 characters long with
                    one special character and one number.
                </Form.Text>
                <Button variant="success"  size="lg" id="login-button" type="submit">
                    Login
                </Button>
                {loginStatus && <p id="text-align-left">{loginStatus}</p>}
            </Form>
        </div>
    );
}

export default Login;
