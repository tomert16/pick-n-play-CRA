import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import SportInfo from './SportInfo';

function SportCard({ sport }) {
    const {sport_type, img_url} = sport
    const [mouseOverImage, setMouseOverImage] = useState(1)
    const [mouseOverInfo, setMouseOverInfo] = useState(0)
    const navigate = useNavigate()


  return (
      <div className="sport-card" >
          <h3 style={{opacity: mouseOverInfo}}>{sport_type}</h3>
            <img className="sport-image" 
              src={img_url} 
              alt={sport_type} 
              style={{opacity: mouseOverImage}}
              onClick={() =>{ 
                navigate(`/sports/${sport.id}`)
              }}
              onMouseOver={()=>(
                setMouseOverImage(.3),
                setMouseOverInfo(1)
              )}
              onMouseLeave={()=>(
                setMouseOverImage(1),
                setMouseOverInfo(0)
              )} 
            />
      </div>
  )
}




export default SportCard;