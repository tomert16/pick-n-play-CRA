import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import pnplogo from '../assets/pnplogo.png';
import styled from 'styled-components';
import { logOut } from '../redux/players/playersSlice';


function NavBar({ setSportFieldToggle }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [iconToggle, setIconToggle] = useState(false);


    
    const handleProfileMenuOpen = () => {
        setIconToggle(!iconToggle);
      };

     // Logout function 
     function handleLogout(){
        dispatch(logOut());
        navigate('/');
    }

    //nav bar links
    const links = [
        {name: 'Sports', value: true},
        {name: 'Fields', value: false},
    ]
    
  return (
    <Container>
        <nav className="flex j-between">
            <div className="left flex a-center">
                <div className="brand flex a-center j-center">
                    <img className="header-logo" src={pnplogo} alt='logo' />
                </div>
                <ul className="links flex">
                    {links.map(({name, value, link}) =>{
                        return (
                            <li onClick={() => setSportFieldToggle(value)} key={name}>
                                <h4 to={link} >{name}</h4>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="right flex a-center">
                <button className="request" onClick={() => navigate('/requests')}>
                    <span>Request Sport or Field</span>
                </button>
                <div className="account-icon">
                    <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                        <AccountCircle />
                            {iconToggle ? <div>
                                <MenuItem onClick={() => {
                                    navigate('/profile')
                                    window.location.reload()
                                }}>Profile</MenuItem>
                                <MenuItem type="button" onClick={() => handleLogout()}>Logout</MenuItem>
                            </div>: null}
                        </IconButton>
                    </MenuItem>
                </div>
            </div>
        </nav>
    </Container>
  )
}


const Container = styled.div`
    nav {
        background-color: white;
        top: 0;
        position: sticky;
        height: 6.5rem;
        width: 100%;
        /* justify-content: space-between; */
        /* position: fixed; */
        top: 0;
        z-index: 2;
        padding: 0 -6rem;
        align-items: center;
        transition: 0.3s ease-in-out;
        .left {
            position: relative;
            right: 4rem;
            .brand {
                img {
                    bottom: 0.3rem;
                    height: 5rem;
                    width: 15rem;
                }
            }
            .links {
                cursor: pointer;
                list-style-type: none;
                gap: 2rem;
                li {
                    a {
                        color: black;
                        text-decoration: none;
                    }
                }
            }
        }
        .right {
            .account-icon {
                padding-right: 2rem;
            }
            .request {
                display: inline-block;
                border-radius: 4px;
                background-color: #3d405b;
                border: none;
                color: #FFFFFF;
                text-align: center;
                font-size: 17px;
                padding: 16px;
                width: 15rem;
                transition: all 0.5s;
                cursor: pointer;
                margin: 5px;
                }

            .request span {
                cursor: pointer;
                display: inline-block;
                position: relative;
                transition: 0.5s;
            }

            .request span:after {
                content: '»';
                position: absolute;
                opacity: 0;
                top: 0;
                right: -15px;
                transition: 0.5s;
            }

            .request:hover span {
                padding-right: 15px;
            }

            .request:hover span:after {
                opacity: 1;
                right: 0;
            }
        }
    }
`

export default NavBar;