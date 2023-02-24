import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";

function Login({ loggedInPlayer, setLoggedInPlayer }) {
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
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
  return (
    <div className="form-popup">
                    <div className="form-div">
                        <Form className="login-form" onSubmit={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }}>
                        <h3>Please Login</h3> 
                        <Form.Input fluid 
                            placeholder="Email" 
                            value={emailInput} 
                            autoComplete="off"
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <Form.Input fluid 
                            type="password" 
                            placeholder="Password" 
                            value={passwordInput} 
                            autoComplete="current-password"
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        <Form.Button type="submit">Login</Form.Button>
                        <br/>
                        <button type="button" onClick={() => navigate('/signup')}> Signup </button>
                        <br/>
                        {/* <button type="button" onClick={() => handleGuestLogin()}> Continue as Guest</button> */}
                        <br/>
                        {/* <button className="exit-form" onClick={handleToggle}>End Your Journey</button>
                        {errors ? <div>{errors}</div>:null} */}
                        </Form> 
                    </div>
                </div>
  )
}

export default Login;