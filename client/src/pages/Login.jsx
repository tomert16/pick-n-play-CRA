import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import sportsbg from '../assets/sportsbg.jpeg';
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectLoggedInPlayer, stayLoggedIn } from '../redux/players/playersSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const loggedInPlayer = useSelector(selectLoggedInPlayer)

    function handleLogin(){
        const data = { email, password };
        dispatch(logIn(data))
    }

  return (
    <Container>
        <div className="bg-image" style={{backgroundImage: `url(${sportsbg})`, backgroundSize: 'cover'}}>
            <div className="content">
                <Header />
                <div class="card">
                    <a class="signup">Login</a>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handleLogin()
                        navigate(`/welcome`)
                    }}>
                        <div class="inputBox1">
                            <input type="email" required="required" value={email} 
                            onChange={(e) => setEmail(e.target.value)} />
                            <span class="user">Email</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="password" required="required" value={password} 
                            onChange={(e) => setPassword(e.target.value)} />
                            <span>Password</span>
                        </div><br></br><br></br>
                        <button class="enter">Enter</button>
                    </form>
                </div>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .content {
            position: absolute;
            top: 0;
            bottom: 0;
            height: 100vh;
            width: 100vw;
            background-color: #0000007f
    }
    .card {
        position: relative;
        bottom: -2rem;
        left: 30rem;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 20rem;
        width: 30rem;
        flex-direction: column;
        gap: 2rem;
        background: #e3e3e3;
        box-shadow: 16px 16px 32px #c8c8c8,
                -16px -16px 32px #fefefe;
        border-radius: 8px; 
        @media (max-width: 1024px) {
            /* Adjust the left position for medium-sized screens */
            left: 40rem;
        }

        @media (min-width: 1200px) {
            /* Adjust the left position for larger screens */
            left: 45rem;
            top: 5rem;
        }   
        @media (max-width: 768px) {
            /* Adjust the left position for smaller screens */
            left: 2rem;
            /* Adjust the width for smaller screens */
            width: calc(100% - 4rem);
        }

        @media (max-width: 480px) {
            /* Adjust the bottom position for even smaller screens */
            bottom: -1rem;
            /* Adjust the min-height for even smaller screens */
            min-height: 15rem;
        }
    }
        .signup {
            color: #000;
            text-transform: uppercase;
            letter-spacing: 2px;
            display: block;
            font-weight: bold;
            font-size: x-large;
            margin-top: 1.5em;
        }
`;
export default Login;