import React from "react";
import {Form} from "react-bootstrap";
import FormText from 'react-bootstrap/FormText'
import Button from 'react-bootstrap/Button';
import {FloatingLabel} from "react-bootstrap";
import "./Login.css";
function Login(){

    return(
        <div >
            <h1 id = "login-div">Login Portal</h1>
            <h5 id="text-align-left">Username</h5>
            <Form.Control
                id="floating-box"
            />
            <h5 id="text-align-left">Password</h5>
            <Form.Control
                id="floating-box"
            />
            <Form.Text id="text-align-left" muted>
                Your password must be at least 8 characters long with
                one special character and one number.
            </Form.Text>
            <Button variant="success"  size="lg" id="login-button" href="/loan">
                Login
            </Button>


        </div>


    );
}

export default Login