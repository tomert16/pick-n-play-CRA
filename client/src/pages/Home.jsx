import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux' 
import Login from './Login'
import SportsList from '../components/sport/SportsList';
import FieldList from '../components/field/FieldList';
import NavBar from '../components/NavBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
    
    <div>
      <NavBar loggedInPlayer={loggedInPlayer} individualLocation={individualLocation} setSportFieldToggle={setSportFieldToggle}/>
    {/* <h1 className="location-name">{individualLocation.state}</h1> */}
      {sportFieldToggle ? <SportsList 
        sports={sports}
        individualLocation={individualLocation}  
      />
      :
      <FieldList 
        fields={fields} 
        individualLocation={individualLocation}
        // selectedField={selectedField} 
        // setSelectedField={setSelectedField}
      />}
    </div>
  )
};

export default Home