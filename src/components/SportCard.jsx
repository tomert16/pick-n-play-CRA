import { useState, useEffect } from 'react';
//import SportInfo from './SportInfo';

function SportCard({ sport, handleSelectedSport }) {
    const {sport_type, img_url} = sport
    

    
  return (
    <div onClick={() => handleSelectedSport(sport)}>
        <h3>{sport_type}</h3>
        <img src={img_url} alt={sport_type} />
        
    </div>
  )
}

export default SportCard