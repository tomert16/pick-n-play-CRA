import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux' 
import  styled  from 'styled-components';
import SportsList from '../components/sport/SportsList';
import FieldList from '../components/field/FieldList';
import NavBar from '../components/NavBar';
import { fetchAllSports, selectAllSports } from '../redux/sports/sportsSlice';
import { selectLocationById, fetchLocationById } from '../redux/locations/locationsSlice';
import { fetchAllFields, selectAllFields } from '../redux/fields/fieldsSlice';

function Home({ loggedInPlayer }) {
  const [sportFieldToggle, setSportFieldToggle] = useState(true);
  
  // const [individualLocation, setIndividualLocation] = useState();
  const {id} = useParams(); 
  const dispatch = useDispatch();
  // fetch sports
  const sports = useSelector(selectAllSports);
  useEffect(() => {
    dispatch(fetchAllSports())
  },[dispatch]);
  // fetch all fields
  const fields = useSelector(selectAllFields);
  useEffect(() => {
    dispatch(fetchAllFields())
  },[dispatch]);
  //fetch individual state
  const individualLocation = useSelector(selectLocationById);
  useEffect(() => {
    dispatch(fetchLocationById(id));
  },[dispatch])

   if (individualLocation == undefined){
     return null;
   }
   

  return (
    
    <Container>
      <NavBar loggedInPlayer={loggedInPlayer} individualLocation={individualLocation} setSportFieldToggle={setSportFieldToggle}/>
      {sportFieldToggle ? <SportsList 
        // sports={sports}
        individualLocation={individualLocation}  
      />
      :
      <FieldList 
        fields={fields} 
        individualLocation={individualLocation}
      />}
    </Container>
  )
};

const Container = styled.div`
  
`;

export default Home;