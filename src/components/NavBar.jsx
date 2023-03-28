import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import pnplogo from '../pnplogo.png';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


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
      <FormControl sx={{ m: 1, minWidth: 80 }} className="location-filter">
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={locationFilter}
            label="Location"
            onChange={(e) => {
                handleLocationFilter(e)
                navigate(`/locations/${e.target.value}`)
                window.location.reload()
            }}
        >
            <MenuItem value={locations[0].id}>{locations[0].state}</MenuItem>
            <MenuItem value={locations[1].id}>{locations[1].state}</MenuItem>
            <MenuItem value={locations[2].id}>{locations[2].state}</MenuItem>
        </Select>
      </FormControl>
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