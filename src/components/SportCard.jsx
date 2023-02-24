import { useState, useEffect } from 'react';
//import SportInfo from './SportInfo';

function SportCard({ sport, selectedSport, setSelectedSport, handleSelectedSport }) {
    // const {sport_type, img_url} = sport
    

    
  return (
    <div onClick={() => handleSelectedSport(sport)}>
        <h3>{sport.sport_type}</h3>
        <img src={sport.img_url} alt={sport.sport_type} />
        
    </div>
  )
}

export default SportCard