import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signup({ setLoggedInPlayer }) {
    const navigate = useNavigate();

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

        fetch ('/signup',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPlayer)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((player) => setLoggedInPlayer(player));
                navigate('/');
            }
        });

    }

  return (
    <div>
        <form className="signup-form" onClick={handleSignup}>
            <input 
                type="text" 
                placeholder="First Name" 
                value={firstNameInput} 
                onChange={(e) => setFirstNameInput(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Last Name" 
                value={lastNameInput} 
                onChange={(e) => setLastNameInput(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="email" 
                value={emailInput} 
                onChange={(e) => setEmailInput(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password Confirmation" 
                value={passwordConfirmationInput} 
                onChange={(e) => setPasswordConfirmationInput(e.target.value)} 
            />
            <input 
                type="button" 
                value="Create Account" 
            />
        </form>
    </div>
  )
}

export default Signup