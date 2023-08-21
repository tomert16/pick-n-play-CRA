import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import sportsbg from '../assets/sportsbg.jpeg';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInPlayer } from '../redux/players/playersSlice';

function Landing() {
    const navigate = useNavigate();
    const loggedInPlayer = useSelector(selectLoggedInPlayer);

    useEffect(() => {
        if (loggedInPlayer) {
            navigate('/welcome');
        }
    },[loggedInPlayer, navigate])

  return (
    <Container>
        <div className="bg-image" style={{backgroundImage: `url(${sportsbg})`, backgroundSize: 'cover'}}>
            <div className="content">
                <Header login/>
                <div className="landing-text">
                    <div className="motto">
                        <h1>Play Whenever, Wherever</h1>
                        <h3>Find a Game. Meet People.</h3>
                        <h5>Ready to Play? Click below and Get Started!</h5>
                    </div>
                    <button class="cssbuttons-io-button" onClick={() => navigate('/signup')}> Get started
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                        </div>
                    </button>
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
    .landing-text {
        color: rgb(255, 205, 98);
        font-size: 2.5rem;
        position: absolute;
        bottom: 15%;
        left: 10%;
    }
    .cssbuttons-io-button {
        background: #724f72;
        color: white;
        font-family: inherit;
        padding: 0.35em;
        padding-left: 1.2em;
        font-size: 17px;
        font-weight: 500;
        border-radius: 0.9em;
        border: none;
        letter-spacing: 0.05em;
        display: flex;
        align-items: center;
        box-shadow: inset 0 0 1.6em -0.6em #714da6;
        overflow: hidden;
        position: relative;
        height: 2.8em;
        padding-right: 3.3em;
    }

    .cssbuttons-io-button .icon {
        background: white;
        margin-left: 1em;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.2em;
        width: 2.2em;
        border-radius: 0.7em;
        box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
        right: 0.3em;
        transition: all 0.3s;
    }

    .cssbuttons-io-button:hover .icon {
        width: calc(100% - 0.6em);
    }

    .cssbuttons-io-button .icon svg {
        width: 1.1em;
        transition: transform 0.3s;
        color: #7b52b9;
    }

    .cssbuttons-io-button:hover .icon svg {
        transform: translateX(0.1em);
    }

    .cssbuttons-io-button:active .icon {
        transform: scale(0.95);
    }
`;

export default Landing;