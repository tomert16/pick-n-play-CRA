import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FieldCard from './FieldCard';


function FieldList({ individualLocation}) {
    const navigate = useNavigate();
   

    // const handleSelectedField = (fields) => {
        
    //     navigate('/fieldinfo')
    // }

  return (
      <Container>
        <h1 className='home-prompt'>Pick A Field</h1>
        <div className='fields-list'>
        {individualLocation.fields.map((field) => (
            <FieldCard 
                key={field.id}
                field={field}
            />
        ))}
        </div>
      </Container>
  )
}

const Container = styled.div`
  .fields-list {
    display: flex;
    flex-wrap: wrap; 
    margin: -6rem;
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

export default FieldList;