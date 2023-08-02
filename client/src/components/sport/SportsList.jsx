import { useState } from 'react';
import styled from 'styled-components';

import SportCard from './SportCard';

function SportsList({  handleSelectedSport, individualLocation }) {

      
  return (
      <Container>
        <h1 className='home-prompt'>Pick A Sport</h1>
        <div className='sports-list' >
        { individualLocation.sports.map((sport) => (
            <SportCard 
                key={sport.id} 
                sport={sport} 
                handleSelectedSport={handleSelectedSport}
            />
      ))}
        </div>
      </Container>
  )
}

const Container = styled.div`
  .sports-list { 
    display: flex; 
    /* grid-template-columns: 15rem 15rem;
    grid-gap: 14rem;
    grid-row-gap: 1rem; */
    margin: -8rem;
    justify-content: center;
    gap: 1.5rem;
 } 
 .home-prompt {
  font-size: 60px;
  color: rgb(12, 12, 12);
  text-align: center;
  font-size: 5pc;
  font-family: "Ultra", serif;
  background-color: transparent;
  text-shadow: 2px 2px 3px rgb(255, 205, 98);
}
`;

export default SportsList