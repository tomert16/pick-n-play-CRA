import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";
import pnplogo from '../pnplogo.png';

function Login({ loggedInPlayer, setLoggedInPlayer }) {
    const [loginToggle, setLoginToggle] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    function handleLogin(){
        fetch('/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { "email": emailInput, "password": passwordInput } )
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setLoggedInPlayer(user))
                navigate('/home')
            }
        })
    }

    const handleLoginToggle= () => {
        setLoginToggle(!loginToggle);
    };

  return (
    <div>
        <div class="title-div">
            <img class="title" src={pnplogo}/>
            <button type="button" class="home-button" onClick={handleLoginToggle}>Get Started</button>
        </div>
        {loginToggle ? <div className="form-popup">
                    <div className="login-box">
                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }}>
                        <p>Please Login</p> 
                        <Form.Input fluid 
                            placeholder="Email" 
                            value={emailInput} 
                            autoComplete="off"
                            className="user-box"
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <Form.Input fluid 
                            className="user-box"
                            type="password" 
                            placeholder="Password" 
                            value={passwordInput} 
                            autoComplete="current-password"
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        {/* <a href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </a> */}
                        <Form.Button className="login-btn" type="submit">Login</Form.Button>
                        <br/>
                        {/* <p>Don't have an account? <a href="" class="a2">Sign up!</a></p> */}
                        <p className="su-text">Don't have an account?   <button className="signup-btn" type="button" onClick={() => navigate('/signup')}> Signup </button></p>
                        <br/>
                        {/* <button type="button" onClick={() => handleGuestLogin()}> Continue as Guest</button> */}
                        <br/>
                        {/* <button className="exit-form" onClick={handleToggle}>End Your Journey</button>
                        {errors ? <div>{errors}</div>:null} */}
                        </Form> 
                    </div>
        </div> : null}
    </div>
  )
}

export default Login;