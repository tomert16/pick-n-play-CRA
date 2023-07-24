import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

function LocationCard({ location }){
    const navigate = useNavigate();
    const [mouseOverImage, setMouseOverImage] = useState(1);
    const [mouseOverInfo, setMouseOverInfo] = useState(0);

  return (
    <Container>
        <div className="location-card flex j-center j-between" onClick={() => navigate(`/locations/${location.id}`)}>
            <h3 style={{opacity: mouseOverInfo}}>{location.state}</h3>
            <img 
              src={location.img_url} 
              alt={location.state} 
              style={{opacity: mouseOverImage}}
              onMouseOver={() => (
                setMouseOverImage(0.3),
                setMouseOverInfo(1)
              )}
              onMouseLeave={() => (
                setMouseOverImage(1),
                setMouseOverInfo(0)
              )}
            />
        </div>
       
    </Container>
  )
}

const Container = styled.div`
  .location-card {
    border-radius: 10px;
    border-style: solid;
    border-color: black;
    border-width: 3.5px;
    width: 20rem;
    height: 15rem;
    img {
      width: 100vw;
      border-radius: 10px;
    }
    h3 {
      position: absolute;
      font-size: 1.7rem;
      text-align: center;
      width: 12rem;
      margin-top: 3%;
    }
  }
`;

export default LocationCard