import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login'
import SportsList from './SportsList';

function Home({ sports, setSports, selectedSport, setSelectedSport, loggedInPlayer, setLoggedInPlayer }) {
  const navigate = useNavigate()
    

    // fetch all sports 
    function fetchSports() {
        fetch('/sports')
        .then ((r) => r.json())
        .then((data) => setSports(data))
    };

    useEffect(() => {
        fetchSports();
    },[]);

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


    
  return (
    <div>
        <button type="button" onClick={handleLogout}>Logout</button>
       <h3>Welcome, {loggedInPlayer?.first_name}</h3>
        <SportsList sports={sports} setSports={setSports} selectedSport={selectedSport} setSelectedSport={setSelectedSport}/>
    </div>
  )
};

export default Home