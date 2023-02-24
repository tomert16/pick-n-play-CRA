//import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SportCard from './SportCard';

function SportsList({ sports, setSports, selectedSport, setSelectedSport}) {
    const navigate = useNavigate()


    function handleSelectedSport(sports) {
        setSelectedSport(sports)
        navigate('/sportinfo')
        console.log(sports)
    }
    
   
  return (
    <div>
        { sports.map((sport) => (
            <SportCard 
                key={sport.id} 
                sport={sport} 
                selectedSport={selectedSport} 
                setSelectedSport={setSelectedSport} 
                handleSelectedSport={handleSelectedSport}
            />
        ))}
    </div>
  )
}

export default SportsList