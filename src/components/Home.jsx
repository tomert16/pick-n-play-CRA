import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Login from './Login'
import SportsList from './SportsList';
import FieldList from './FieldList';
import NavBar from './NavBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Home({ sports, setSports, loggedInPlayer, fields, setFields, locations, individualLocation, setIndividualLocation}) {
  const [sportFieldToggle, setSportFieldToggle] = useState(true);
  // const [individualLocation, setIndividualLocation] = useState();
  const {id} = useParams(); 
  
  console.log(locations)

   //fetch individual state
   useEffect(() => {
     async function fetchIndiviualLocation() {
       const req = fetch(`/locations/${id}`);
       const resp = await req;
       const parsed = await resp.json();
       setIndividualLocation(parsed);
     }
     fetchIndiviualLocation();
   },[])

   if (individualLocation == undefined){
     return null;
   }
   
console.log(individualLocation)

    
  return (
    
    <div>
      <NavBar loggedInPlayer={loggedInPlayer} individualLocation={individualLocation} locations={locations}/>
      <div >
      <ToggleButtonGroup
        color="primary"
        value={sportFieldToggle}
        exclusive
        aria-label="Large sizes"
    >
      <ToggleButton value="sport" onClick={() => setSportFieldToggle(true)}>Sports</ToggleButton>
      <ToggleButton value="field" onClick={() => setSportFieldToggle(false)}>Fields</ToggleButton>
    </ToggleButtonGroup>
    </div>
    <h1 className="location-name">{individualLocation.state}</h1>
      {sportFieldToggle ? <SportsList 
        sports={sports} 
        setSports={setSports} 
        individualLocation={individualLocation}
      />
      :
      <FieldList 
        fields={fields} 
        setFields={setFields} 
        individualLocation={individualLocation}
        // selectedField={selectedField} 
        // setSelectedField={setSelectedField}
      />}
    </div>
  )
};

export default Home