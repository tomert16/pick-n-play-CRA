import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import pnplogo from '../pnplogo.png';
import FieldDropDownFilter from './FieldDropDownFilter';
function NavBar({ loggedInPlayer, setLoggedInPlayer, individualLocation }) {
    const navigate = useNavigate();
    const [iconToggle, setIconToggle] = useState(false);

    const handleProfileMenuOpen = () => {
        setIconToggle(!iconToggle);
      };

     // Logout function 
     function handleLogout(){
        fetch ('/logout',{
            method: "DELETE"
        }).then((r) => {
            if (r.ok){
                navigate('/')
                setLoggedInPlayer(null)
            }
        })
    }
    console.log(individualLocation)
  return (
    <div className="nav-bar">
        <img className="header-logo" src={pnplogo} onClick={() => navigate(`/locations/${individualLocation.id}`)}/>
        <div className='profile-nav'>
            <h3>Welcome, {loggedInPlayer?.first_name}</h3>
            <div className='profile-icon'>
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
                            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                            <MenuItem type="button" onClick={handleLogout}>Logout</MenuItem>
                        </div>: null}
                    </IconButton>
                </MenuItem>
            </div>

        </div>
    </div>
  )
}

export default NavBar;