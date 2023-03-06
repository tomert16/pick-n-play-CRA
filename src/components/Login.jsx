import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";

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
        <div>
            <img class="first-background" src="https://thevarsity.ca/wp-content/uploads/2017/08/SPORTS_Open_Sports_App-STEVEN_LEETHE_VARSITY-DSC_5860-Alicia_playing_1080by720.jpg" />
            <h2 class="motto">Play Your Favorite Sport</h2>
        </div>
        <div class="title-div">
            <h1 class="title" >Pick n' Play</h1>
            <button type="button" class="home-button" onClick={handleLoginToggle}>Get Started</button>
        </div>
        <div>
            <img class="second-background" src="https://t4.ftcdn.net/jpg/04/61/28/99/360_F_461289911_zoKtHAQB1w3fGRwxwLZxY4M60T4AkWPm.jpg"/>
            <h2 class="motto2">Meet New People</h2>
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