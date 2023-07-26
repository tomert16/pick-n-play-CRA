import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header';
import sportsbg from '../assets/sportsbg.jpeg';
import { createNewPlayer } from '../redux/players/playersSlice';


function Signup({ setLoggedInPlayer }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        const newPlayer = {
            first_name: firstNameInput,
            last_name: lastNameInput,
            email: emailInput,
            password: passwordInput,
            passwordConfirmation: passwordConfirmationInput
        };

        // fetch ('/signup',{
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(newPlayer)
        // })
        // .then((r) => {
        //     if (r.ok) {
        //         r.json().then((player) => setLoggedInPlayer(player));
        //         navigate('/');
        //     }
        // });
        dispatch(createNewPlayer(newPlayer));
        navigate('/welcome');
    }

  return (
    <Container>
        <div className="bg-image" style={{backgroundImage: `url(${sportsbg})`, backgroundSize: 'cover'}}>
            <div className="content">
                <Header login/>
                <div class="card">
                    <a class="signup">Sign Up</a>
                    <form onClick={() => handleSignup()}>
                        <div class="inputBox1">
                            <input type="text" required="required" alue={firstNameInput} 
                            onChange={(e) => setFirstNameInput(e.target.value)} />
                            <span class="user">First Name</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="text" required="required" value={lastNameInput} 
                            onChange={(e) => setLastNameInput(e.target.value)} />
                            <span>Last Name</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="email" required="required" value={emailInput} 
                            onChange={(e) => setEmailInput(e.target.value)} />
                            <span>Email</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="password" required="required" value={passwordInput} 
                            onChange={(e) => setPasswordInput(e.target.value)} />
                            <span>Password</span>
                        </div><br></br><br></br>

                        <div class="inputBox">
                            <input type="password" required="required" value={passwordConfirmationInput} 
                            onChange={(e) => setPasswordConfirmationInput(e.target.value)} />
                            <span>Confirm Password</span>
                        </div><br></br><br></br>

                        <button class="enter" onClick={handleSignup}>Enter</button>
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


export default Signup