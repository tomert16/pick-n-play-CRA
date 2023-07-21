import { useState } from 'react';

import SportCard from './SportCard';

function SportsList({  handleSelectedSport, individualLocation }) {

      
  return (
      <div>
        <h1 className='home-prompt'>Pick Your Sport</h1>
        <div className='sports-list' >
        { individualLocation.sports.map((sport) => (
            <SportCard 
                key={sport.id} 
                sport={sport} 
                handleSelectedSport={handleSelectedSport}
            />
        ))}
        </div>
      </div>
  )
}

export default SportsList