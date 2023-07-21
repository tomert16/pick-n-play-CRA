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
    // <div className="container">
    //     <div>
    //         <a className="card">Sign Up</a>
    //     </div>
    //     <form className="inputBox1" onClick={handleSignup}>
    //         <input 
    //             className='inputBox'
    //             type="text" 
    //             placeholder="First Name" 
    //             value={firstNameInput} 
    //             onChange={(e) => setFirstNameInput(e.target.value)} 
    //         />
    //         <input 
    //             className='inputBox'
    //             type="text" 
    //             placeholder="Last Name" 
    //             value={lastNameInput} 
    //             onChange={(e) => setLastNameInput(e.target.value)} 
    //         />
    //         <input 
    //             className='inputBox'
    //             type="email" 
    //             placeholder="email" 
    //             value={emailInput} 
    //             onChange={(e) => setEmailInput(e.target.value)} 
    //         />
    //         <input 
    //             className='inputBox'
    //             type="password" 
    //             placeholder="Password" 
    //             value={passwordInput} 
    //             onChange={(e) => setPasswordInput(e.target.value)} 
    //         />
    //         <input 
    //             className='inputBox'
    //             type="password" 
    //             placeholder="Password Confirmation" 
    //             value={passwordConfirmationInput} 
    //             onChange={(e) => setPasswordConfirmationInput(e.target.value)} 
    //         />
    //         <input 
    //             type="button" 
    //             value="Create Account" 
    //         />
    //     </form>
    // </div>
    <div class="container">
        <div class="card">
            <a class="singup">Sign Up</a>
            <form onClick={handleSignup}>
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
  )
}

export default Signup