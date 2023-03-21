import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import pnplogo from '../pnplogo.png';
import FieldDropDownFilter from './FieldDropDownFilter';
function NavBar({ loggedInPlayer, setLoggedInPlayer, individualLocation, locations }) {
    const navigate = useNavigate();
    const [iconToggle, setIconToggle] = useState(false);
    const [locationFilter, setLocationFilter] = useState("change");
    
    const handleLocationFilter = (e) => {
        setLocationFilter(e.target.value)
    }
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
    console.log(locationFilter)
  return (
    <div className="nav-bar">
        <img className="header-logo" src={pnplogo} onClick={() => navigate(-1)}/>
        <select name="location-filter" value={locationFilter} onChange={(e) => {
            handleLocationFilter(e)
            navigate(`/locations/${e.target.value}`)
            window.location.reload()
        }}>
            <option value="change">Change Location</option>
            <option value={locations[0].id}>{locations[0].state}</option>
            <option value={locations[1].id}>{locations[1].state}</option>
            <option value={locations[2].id}>{locations[2].state}</option>
        </select>
        <div className='profile-nav'>
            <h3>Welcome, {loggedInPlayer.first_name}</h3>
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