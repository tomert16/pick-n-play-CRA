import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function FieldCard({ field }) {
    const [mouseOverImage, setMouseOverImage] = useState(1)
    const [mouseOverInfo, setMouseOverInfo] = useState(0)
    const { field_name, img_url  } = field;
    const navigate = useNavigate();


  return (
    <Container 
      onMouseOver={()=>(
        setMouseOverImage(.3),
        setMouseOverInfo(1)
    )}
      onMouseLeave={()=>(
        setMouseOverImage(1),
        setMouseOverInfo(0)
      )}
    >
        <h3 style={{opacity: mouseOverInfo}}>{field_name}</h3>
        <img 
          className="field-image" 
          src={img_url} alt={field_name} 
          style={{opacity: mouseOverImage}}
          onClick={() => navigate(`/fields/${field.id}`)}  
         
        />
    </Container>
  )
}

const Container = styled.div`
  justify-content: center;
  border-style: solid;
  border-radius: 3px;
  border-color: transparent;
  text-align: center;
  cursor: pointer;
  h3 {
    position: relative;
    top: 15rem;
    font-size: 2rem;
    font-family:"Ultra", serif;
    height: 3em;
    color: rgb(0, 0, 0);
  }
  img {
    height: 18rem;
    width: 20rem;
    border-style: solid;
    border-radius: .5rem;
    border-color: rgb(255, 205, 98);
    background-color: transparent;
  }
`;

export default FieldCard;