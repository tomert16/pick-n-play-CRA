import { useState, useEffect } from 'react';
//import SportInfo from './SportInfo';

function SportCard({ sport, handleSelectedSport }) {
    const {sport_type, img_url} = sport
    const [mouseOverImage, setMouseOverImage] = useState(1)
    const [mouseOverInfo, setMouseOverInfo] = useState(0)

    
  return (
    <div className="sport-card"  
      onMouseOver={()=>(
        setMouseOverImage(.3),
        setMouseOverInfo(1)
      )}
      onMouseLeave={()=>(
        setMouseOverImage(1),
        setMouseOverInfo(0)
      )} onClick={() => handleSelectedSport(sport)}
    >
        <h3 style={{opacity: mouseOverInfo}} >{sport_type}</h3>
        <img className="sport-image" src={img_url} alt={sport_type} style={{opacity: mouseOverImage}}/>
        
    </div>
  )
}

export default SportCard