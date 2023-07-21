import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import pnplogo from '../pnplogo.png';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';


function NavBar({ loggedInPlayer, setLoggedInPlayer, individualLocation, locations, setSportFieldToggle }) {
    const navigate = useNavigate();
    const [iconToggle, setIconToggle] = useState(false);
    const [locationFilter, setLocationFilter] = useState();

    
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
                    <img className="header-logo" src={pnplogo} alt='logo' onClick={() => navigate(-1)}/>
                </div>
                <ul className="links flex">
                    {links.map(({name, value}) =>{
                        return (
                            <li key={name}>
                                <h4 onClick={() => setSportFieldToggle(value)}>{name}</h4>
                            </li>
                        )
                    })}
                </ul>
            </div>
        {/* <FormControl sx={{ m: 1, minWidth: 80 }} className="location-filter">
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
                {locations && locations.map(location => (
                    <MenuItem value={location.id}>{location.state}</MenuItem>
                ))}
            </Select>
        </FormControl> */}
            <div className="right flex a-center">
                <h4>Welcome, {loggedInPlayer.first_name}</h4>
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
                                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                                <MenuItem type="button" onClick={handleLogout}>Logout</MenuItem>
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
        }
    }
`

export default NavBar;